import nodemailer from 'nodemailer';

/**
 * Endpoint di contatto.
 *
 * Difese (tutte server-side, nessuna terza parte):
 *  - Honeypot: campo `website` invisibile agli umani; se valorizzato è un bot.
 *  - Timing: invii in meno di 3s dal render sono quasi sempre bot.
 *  - Rate limit best-effort per IP (per istanza serverless "calda").
 *  - Sanitizzazione anti header-injection (rimozione di CR/LF dai campi a riga singola).
 *  - Validazione rigorosa di ogni campo + escaping HTML nel corpo email.
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

// Rate limiter in memoria (best-effort: lo stato vive solo nell'istanza calda).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
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
  const body = await readBody<Record<string, unknown>>(event);

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
      data: { fields }
    });
  }

  // 5) Trasporto SMTP.
  const smtpHost = config.smtpHost as string;
  const smtpUser = config.smtpUser as string;
  const smtpPass = config.smtpPass as string;
  const smtpPort = Number(config.smtpPort) || 587;
  const secure = String(config.smtpSecure) === 'true' || smtpPort === 465;
  const to = (config.contactTo as string) || smtpUser;
  const from = (config.contactFrom as string) || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error(
      '[contact] SMTP non configurato: imposta SMTP_HOST, SMTP_USER, SMTP_PASS nelle env.'
    );
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
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html
    });
  } catch (err) {
    console.error('[contact] Invio email fallito:', err);
    throw createError({ statusCode: 502, statusMessage: 'Email delivery failed' });
  }

  return { ok: true };
});
