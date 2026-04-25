<template>
  <div>
    <KibaPageHero
      eyebrow="Cookie Policy"
      title="I cookie su questo sito."
      subtitle="Spoiler: praticamente nessuno. È una scelta voluta."
    />

    <KibaPageSection>
      <KibaLegalLanguageNotice />
      <KibaLegalContent>
        <p class="last-update">Ultimo aggiornamento: 25 aprile 2026</p>

        <h2>Cookie utilizzati</h2>
        <p>Questo sito utilizza un solo cookie tecnico. Nessun cookie di profilazione, nessun cookie di terze parti per finalità di marketing, nessun pixel di tracciamento.</p>

        <div class="cookie-table-wrap">
          <table class="cookie-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Finalità</th>
                <th>Durata</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>kiba_locale</code></td>
                <td>Memorizza la lingua scelta (italiano o inglese) per non doverla riselezionare a ogni visita.</td>
                <td>1 anno</td>
                <td>Tecnico, prima parte</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Perché non c'è il banner cookie</h2>
        <p>La normativa europea (Direttiva ePrivacy + GDPR) richiede consenso esplicito per cookie non strettamente necessari. Il cookie <code>kiba_locale</code> è di natura strettamente tecnica (memorizza una preferenza di servizio espressa attivamente dall'utente) e quindi rientra nelle eccezioni che <strong>non richiedono consenso preventivo</strong>.</p>
        <p>Mostrarti un banner per accettare un solo cookie tecnico sarebbe rumore visivo senza valore: ti facciamo perdere tempo per nulla.</p>

        <h2>Risorse esterne</h2>
        <p>Il sito carica risorse statiche da CDN pubbliche per font e icone. Queste risorse non installano cookie nel tuo browser e sono utilizzate per ridurre il peso e il tempo di caricamento delle pagine:</p>
        <ul>
          <li><strong>Google Fonts</strong> (fonts.googleapis.com, fonts.gstatic.com): per i font Manrope, Poppins e Montserrat Alternates.</li>
          <li><strong>Cloudflare CDN</strong> (cdnjs.cloudflare.com): per la libreria di icone Font Awesome.</li>
        </ul>
        <p>Stiamo valutando di self-hostare anche queste risorse per eliminare ogni dipendenza da terze parti. Quando lo faremo, lo aggiorneremo in questa pagina.</p>

        <h2>Come gestire o cancellare i cookie</h2>
        <p>Puoi cancellare il cookie <code>kiba_locale</code> dalle impostazioni del tuo browser in qualsiasi momento. La conseguenza sarà solo che la lingua tornerà a quella di default (italiano) o di rilevamento automatico al prossimo accesso.</p>

        <h2>Aggiornamenti</h2>
        <p>Se introdurremo nuovi cookie tecnici o di qualsiasi altro tipo, aggiorneremo questa pagina e — se richiesto dalla normativa — implementeremo un meccanismo di consenso adeguato.</p>
      </KibaLegalContent>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';
import KibaLegalContent from '~/components/Kiba/KibaLegalContent.vue';
import KibaLegalLanguageNotice from '~/components/Kiba/KibaLegalLanguageNotice.vue';

const config = useRuntimeConfig();
const url = `${config.public.siteUrl}/cookie`;

useHead({
  title: 'Cookie Policy — Kiba.Studio',
  meta: [
    { hid: 'description', name: 'description', content: 'Quali cookie utilizza il sito Kiba.Studio. Solo un cookie tecnico per la lingua, nessuna profilazione.' },
    { hid: 'og:title', property: 'og:title', content: 'Cookie Policy — Kiba.Studio' },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
});
</script>

<style scoped>
.cookie-table-wrap {
  margin: 16px 0 24px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  /* Bordo solo se la tabella overflow-a, segnala graficamente lo scroll */
  border-radius: 8px;
  background:
    linear-gradient(to right, rgba(26, 26, 26, 1) 30%, rgba(26, 26, 26, 0)),
    linear-gradient(to right, rgba(26, 26, 26, 0), rgba(26, 26, 26, 1) 70%) 100% 0,
    radial-gradient(farthest-side at 0 50%, rgba(201, 76, 76, 0.15), transparent),
    radial-gradient(farthest-side at 100% 50%, rgba(201, 76, 76, 0.15), transparent) 100% 0;
  background-repeat: no-repeat;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-attachment: local, local, scroll, scroll;
}

.cookie-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
  min-width: 520px; /* forza lo scroll orizzontale invece di comprimere */
}

@media (max-width: 600px) {
  .cookie-table {
    font-size: 0.875rem;
  }
  .cookie-table th,
  .cookie-table td {
    padding: 12px 12px !important;
  }
}

.cookie-table th,
.cookie-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--kiba-text-secondary, #b0b0b0);
}

.cookie-table th {
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--kiba-primary, #c94c4c);
  border-bottom-color: rgba(201, 76, 76, 0.3);
}

.cookie-table code {
  background: rgba(201, 76, 76, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--kiba-primary-light, #e06666);
}
</style>
