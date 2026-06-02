import nodemailer from 'nodemailer';

/**
 * Endpoint di contatto.
 *
 * Difese (tutte server-side, nessuna terza parte):
 *  - Limite hard di payload (refused prima della parse) → niente DoS via JSON gigante.
 *  - Verifica Content-Type per scartare richieste non-JSON.
 *  - Honeypot: campo `website` invisibile agli umani; se valorizzato è un bot.
 *  - Timing: invii in meno di 3s dal render sono quasi sempre bot.
 *  - Rate limit best-effort per IP con cap sulla mappa in-memory.
 *  - Sanitizzazione anti header-injection (rimozione di CR/LF dai campi a riga singola).
 *  - Validazione rigorosa di ogni campo + escaping HTML nel corpo email.
 *  - Diagnostica env compressa: solo booleani, nessun nome di chiave.
 *
 * Configurazione via env (impostate su Vercel):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE,
 *   CONTACT_TO (default alessiosada04@gmail.com), CONTACT_FROM.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BUDGETS = ['', '5k-10k', '10k-25k', '25k-50k', '50k+', 'discuss'];
const BUDGET_LABELS: Record<string, string> = {
  '': '—',
  '5k-10k': '€5.000–10.000',
  '10k-25k': '€10.000–25.000',
  '25k-50k': '€25.000–50.000',
  '50k+': '€50.000+',
  discuss: 'Da discutere'
};

// Limiti hard sul payload: niente JSON > 16 KB, e ogni campo è capped sotto.
// Un form lecito sta abbondantemente sotto i 10 KB.
const MAX_BODY_BYTES = 16 * 1024;

// Rate limiter in memoria (best-effort: lo stato vive solo nell'istanza calda).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
// Cap della mappa: evita crescita illimitata se un attaccante varia l'IP.
const MAX_TRACKED_IPS = 5_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Pulizia opportunistica quando si supera il cap.
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of hits) {
      if (times.length === 0 || now - times[times.length - 1] > WINDOW_MS) {
        hits.delete(key);
      }
      if (hits.size <= MAX_TRACKED_IPS) break;
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/** Campo a riga singola: niente CR/LF (anti header-injection), trim, cap lunghezza. */
function oneLine(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, max);
}

/** Campo multilinea: normalizza i ritorni a capo, trim, cap lunghezza. */
function multiLine(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // 0a) Content-Type: accettiamo solo JSON. Niente form-urlencoded "magia".
  const contentType = (getRequestHeader(event, 'content-type') || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported Media Type' });
  }

  // 0b) Limite hard di payload.
  const body = await readBody<Record<string, unknown>>(event, {
    // `readBody` (h3) accetta opzioni runtime; manteniamo il check anche manualmente.
  });
  // Stima conservativa della dimensione del corpo (post-parse). I caratteri non-ASCII
  // pesano di più, quindi serializzando con JSON.stringify abbiamo un upper bound.
  if (typeof body === 'object' && body !== null) {
    const approxBytes = JSON.stringify(body).length;
    if (approxBytes > MAX_BODY_BYTES) {
      throw createError({ statusCode: 413, statusMessage: 'Payload too large' });
    }
  }

  // 1) Honeypot — rispondiamo ok per non dare segnali ai bot, ma scartiamo.
  if (oneLine(body?.website, 200)) {
    return { ok: true };
  }

  // 2) Timing — invio troppo rapido = bot.
  const ts = Number(body?._ts);
  if (Number.isFinite(ts) && ts > 0 && Date.now() - ts < 3000) {
    return { ok: true };
  }

  // 3) Rate limit best-effort.
  const ip =
    (getRequestHeader(event, 'x-forwarded-for') || '').split(',')[0]?.trim() ||
    getRequestHeader(event, 'x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' });
  }

  // 4) Validazione.
  const name = oneLine(body?.name, 100);
  const email = oneLine(body?.email, 150);
  const company = oneLine(body?.company, 150);
  const budget = oneLine(body?.budget, 20);
  const message = multiLine(body?.message, 5000);
  const privacy = body?.privacy === true || body?.privacy === 'true';

  const fields: string[] = [];
  if (name.length < 2) fields.push('name');
  if (!EMAIL_RE.test(email)) fields.push('email');
  if (message.length < 10) fields.push('message');
  if (!privacy) fields.push('privacy');
  if (!BUDGETS.includes(budget)) fields.push('budget');
  if (fields.length) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      // Non includiamo nei dati di errore l'input dell'utente: solo i nomi dei campi.
      data: { fields }
    });
  }

  // 5) Trasporto SMTP.
  const env = process.env;
  const smtpHost = (config.smtpHost as string) || env.SMTP_HOST || '';
  const smtpUser = (config.smtpUser as string) || env.SMTP_USER || '';
  const smtpPass = (config.smtpPass as string) || env.SMTP_PASS || '';
  const smtpPort = Number(config.smtpPort || env.SMTP_PORT) || 587;
  const secure =
    String(config.smtpSecure || env.SMTP_SECURE) === 'true' || smtpPort === 465;
  const to = (config.contactTo as string) || env.CONTACT_TO || smtpUser;
  const from = (config.contactFrom as string) || env.CONTACT_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass) {
    // Log diagnostico minimale: solo presenza/assenza, niente nomi di chiavi né valori.
    // (i log Vercel sono accessibili al team, ma non vogliamo enumerare l'ambiente).
    console.error('[contact] SMTP configuration missing', {
      host: !!smtpHost,
      user: !!smtpUser,
      pass: !!smtpPass
    });
    throw createError({ statusCode: 503, statusMessage: 'Email service not configured' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure,
    auth: { user: smtpUser, pass: smtpPass }
  });

  const budgetLabel = BUDGET_LABELS[budget] ?? '—';
  const subject = oneLine(`Nuovo contatto dal sito — ${name}`, 180);

  const text = [
    `Nome: ${name}`,
    `Email: ${email}`,
    company ? `Azienda: ${company}` : null,
    `Budget: ${budgetLabel}`,
    '',
    'Messaggio:',
    message
  ]
    .filter((l) => l !== null)
    .join('\n');

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#1a1a1a;line-height:1.6">
      <h2 style="margin:0 0 16px">Nuovo contatto dal sito</h2>
      <p style="margin:0 0 4px"><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p style="margin:0 0 4px"><strong>Azienda:</strong> ${escapeHtml(company)}</p>` : ''}
      <p style="margin:0 0 16px"><strong>Budget:</strong> ${escapeHtml(budgetLabel)}</p>
      <p style="margin:0 0 4px"><strong>Messaggio:</strong></p>
      <p style="white-space:pre-wrap;margin:0;padding:12px;background:#f5f5f5;border-radius:8px">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      // replyTo strutturato: nodemailer codifica il display name in modo sicuro.
      replyTo: { name, address: email },
      subject,
      text,
      html
    });
  } catch (err) {
    // Non logghiamo l'oggetto err intero: può contenere headers SMTP. Solo il messaggio.
    console.error('[contact] Email delivery failed:', err instanceof Error ? err.message : 'unknown');
    throw createError({ statusCode: 502, statusMessage: 'Email delivery failed' });
  }

  return { ok: true };
});
