<template>
  <div>
    <KibaPageHero
      eyebrow="Privacy Policy"
      title="Come trattiamo i tuoi dati."
      subtitle="In linguaggio leggibile, senza giri di parole. Ai sensi del Regolamento UE 2016/679 (GDPR)."
    />

    <KibaPageSection>
      <KibaLegalLanguageNotice />
      <KibaLegalContent>
        <p class="last-update">Ultimo aggiornamento: 25 aprile 2026</p>

        <h2>1. Titolare del trattamento</h2>
        <p>Il titolare del trattamento dei dati personali è <strong>Alessio Sada</strong>, ditta individuale con sede in Milano (MI), 20155, Italia. Partita IVA: <strong>IT14548540963</strong>. Per qualunque richiesta puoi scriverci a <a href="mailto:hello@kiba.studio">hello@kiba.studio</a>.</p>

        <h2>2. Quali dati raccoglie questo sito</h2>
        <p>Questo sito è progettato per raccogliere il minimo indispensabile.</p>
        <h3>Cookie e tracker</h3>
        <p>Utilizziamo un solo cookie tecnico, <code>kiba_locale</code>, per ricordare la lingua scelta. Non utilizziamo Google Analytics, pixel di tracciamento, advertising di terze parti o profilazione. Per i dettagli vedi la <NuxtLink to="/cookie">Cookie Policy</NuxtLink>.</p>

        <h3>Dati di navigazione (log server)</h3>
        <p>Il nostro hosting registra log tecnici minimi (indirizzo IP, user agent, pagine richieste) per finalità di sicurezza e diagnostica. Questi log vengono conservati per non oltre 30 giorni e non vengono utilizzati per profilarti.</p>

        <h3>Dati che ci invii volontariamente</h3>
        <p>Quando ci scrivi via email a <a href="mailto:hello@kiba.studio">hello@kiba.studio</a>, raccogliamo i dati che ci comunichi (nome, email, contenuto del messaggio, eventuali allegati). Quando il form di contatto sul sito sarà attivo, raccoglieremo gli stessi dati.</p>

        <h2>3. Perché trattiamo i tuoi dati (basi giuridiche)</h2>
        <ul>
          <li><strong>Per rispondere alle tue richieste</strong>: base giuridica art. 6.1.b GDPR (esecuzione di misure precontrattuali su tua richiesta).</li>
          <li><strong>Per gestire i contratti firmati</strong>: art. 6.1.b GDPR (esecuzione del contratto).</li>
          <li><strong>Per adempiere a obblighi di legge</strong> (fiscali, contabili): art. 6.1.c GDPR.</li>
          <li><strong>Per la sicurezza del sito</strong> (log): art. 6.1.f GDPR (legittimo interesse alla protezione del servizio).</li>
        </ul>

        <h2>4. Per quanto tempo conserviamo i dati</h2>
        <ul>
          <li>Email di contatto e relativi allegati: 24 mesi dall'ultimo scambio, poi cancellate.</li>
          <li>Documenti contrattuali e fatture: per il tempo richiesto dalla normativa fiscale italiana (10 anni).</li>
          <li>Log di sicurezza: massimo 30 giorni.</li>
          <li>Cookie <code>kiba_locale</code>: 1 anno o fino a cancellazione manuale.</li>
        </ul>

        <h2>5. A chi comunichiamo i tuoi dati</h2>
        <p>I tuoi dati non vengono venduti né ceduti per finalità di marketing. Possono essere trattati da fornitori tecnici che usiamo come responsabili del trattamento, tutti con server in UE quando possibile:</p>
        <ul>
          <li><strong>Hosting</strong>: provider in EU (es. Hetzner, Germania).</li>
          <li><strong>Email</strong>: provider email professionale che useremo per <code>hello@kiba.studio</code>.</li>
          <li><strong>Consulenti</strong>: commercialista e altri consulenti per obblighi di legge, vincolati al segreto professionale.</li>
        </ul>
        <p>Non avviene alcun trasferimento di dati al di fuori dell'UE per finalità di marketing o profilazione.</p>

        <h2>6. I tuoi diritti</h2>
        <p>In qualunque momento puoi esercitare i diritti previsti dagli articoli 15-22 del GDPR:</p>
        <ul>
          <li>Accesso ai tuoi dati personali</li>
          <li>Rettifica di dati inesatti</li>
          <li>Cancellazione (diritto all'oblio)</li>
          <li>Limitazione del trattamento</li>
          <li>Portabilità dei dati in formato strutturato</li>
          <li>Opposizione al trattamento</li>
          <li>Reclamo all'autorità di controllo (Garante per la Protezione dei Dati Personali, <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">garanteprivacy.it</a>)</li>
        </ul>
        <p>Per esercitare questi diritti scrivi a <a href="mailto:hello@kiba.studio">hello@kiba.studio</a>. Risponderemo entro 30 giorni.</p>

        <h2>7. Sicurezza</h2>
        <p>Adottiamo misure tecniche e organizzative ragionevoli per proteggere i tuoi dati: trasmissione cifrata (HTTPS), accessi limitati al personale autorizzato, backup verificati. Nessun sistema può garantire sicurezza assoluta: in caso di violazione di dati che ti riguardano, e che possa comportare un rischio per i tuoi diritti, ti informeremo entro 72 ore secondo l'art. 33 GDPR.</p>

        <h2>8. Modifiche a questa policy</h2>
        <p>Quando aggiorniamo questa policy, modifichiamo la data in alto. Se l'aggiornamento ha impatto rilevante sui tuoi dati ti informeremo via email se possibile.</p>
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
const url = `${config.public.siteUrl}/privacy`;

useHead({
  title: 'Privacy Policy — Kiba.Studio',
  meta: [
    { hid: 'description', name: 'description', content: 'Come Kiba.Studio tratta i tuoi dati personali ai sensi del GDPR. In linguaggio chiaro, senza giri di parole.' },
    { hid: 'og:title', property: 'og:title', content: 'Privacy Policy — Kiba.Studio' },
    { hid: 'og:url', property: 'og:url', content: url },
    { name: 'robots', content: 'index,follow' }
  ],
  link: [{ rel: 'canonical', href: url }]
});
</script>
