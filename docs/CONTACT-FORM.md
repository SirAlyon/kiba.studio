# Form di contatto — come funziona e come attivarlo

Il form della sezione Contatti invia una email reale tramite un endpoint server Nuxt
(`server/api/contact.post.ts`), che gira come serverless function su Vercel.

## Flusso

1. `KibaSPAContact.vue` raccoglie i dati e fa `POST /api/contact`.
2. L'endpoint valida, applica le difese anti-spam e invia la mail via SMTP.
3. Il visitatore vede un messaggio di successo o di errore.

## Variabili d'ambiente (Vercel → Settings → Environment Variables)

| Variabile      | Esempio                  | Note |
|----------------|--------------------------|------|
| `SMTP_HOST`    | `smtp.gmail.com`         | Host SMTP del provider |
| `SMTP_PORT`    | `587`                    | 587 (STARTTLS) o 465 (SSL) |
| `SMTP_SECURE`  | `false`                  | `true` solo per la porta 465 |
| `SMTP_USER`    | `tuo@gmail.com`          | Utente SMTP |
| `SMTP_PASS`    | `app-password`           | Gmail: **App Password** (richiede 2FA), non la password normale |
| `CONTACT_TO`   | `alessiosada04@gmail.com`| Destinatario (default già impostato su questo) |
| `CONTACT_FROM` | `tuo@gmail.com`          | Mittente; deve coincidere con l'account autenticato o un suo alias |

Dopo aver impostato le variabili, fai un nuovo deploy (o "Redeploy") perché Vercel le inietti.

### Passaggio a kiba.studio

Quando avrai la casella del dominio, basta cambiare `SMTP_HOST/USER/PASS/FROM`
(e `CONTACT_TO` se vuoi ricevere su kiba.studio). Nessuna modifica al codice.
Consigliato configurare anche **SPF/DKIM** sul dominio per la deliverability.

## Sicurezza implementata

- **Honeypot** (`website`): campo invisibile; se compilato, la richiesta viene scartata silenziosamente.
- **Timing check**: invii in meno di 3 secondi dal caricamento vengono scartati (bot).
- **Rate limit** best-effort per IP (5 richieste/minuto per istanza serverless calda).
- **Anti header-injection**: rimozione di CR/LF dai campi a riga singola (nome, email, oggetto).
- **Validazione** rigorosa lato server di ogni campo (l'autorità è il server, non il client).
- **Escaping HTML** del contenuto nel corpo email.
- Il mittente è fisso e il `Reply-To` è l'email del visitatore: niente spoofing, niente problemi SPF.

## Sviluppo locale

Copia `.env.example` in `.env`, riempi i valori e avvia `npm run dev`.
Senza SMTP configurato, l'endpoint risponde `503` e il form mostra un errore.
