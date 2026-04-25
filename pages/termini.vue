<template>
  <div>
    <KibaPageHero
      eyebrow="Termini di servizio"
      title="Termini e condizioni."
      subtitle="Le regole del gioco, scritte in modo che possano essere lette davvero."
    />

    <KibaPageSection>
      <KibaLegalLanguageNotice />
      <KibaLegalContent>
        <p class="last-update">Ultimo aggiornamento: 25 aprile 2026</p>

        <h2>1. Chi siamo</h2>
        <p>Questo sito è gestito da <strong>Alessio Sada</strong>, ditta individuale con sede in Milano (MI), 20155, Italia. P.IVA: <strong>IT14548540963</strong>. Email: <a href="mailto:hello@kiba.studio">hello@kiba.studio</a>. Operiamo con il marchio commerciale <strong>Kiba.Studio</strong>.</p>

        <h2>2. Oggetto</h2>
        <p>Questi termini regolano l'utilizzo del sito <a href="https://kiba.studio">kiba.studio</a> e i contenuti informativi qui pubblicati. Servizi professionali, contratti di sviluppo e consulenza sono regolati da contratti separati firmati con il singolo cliente.</p>

        <h2>3. Utilizzo del sito</h2>
        <p>Il sito è fornito a scopo informativo. Sei libero di:</p>
        <ul>
          <li>Consultare le pagine pubbliche.</li>
          <li>Citare brevi estratti dei contenuti, indicando la fonte.</li>
          <li>Contattarci attraverso i recapiti pubblicati.</li>
        </ul>
        <p>Non è consentito utilizzare il sito per finalità illecite, scraping massivo che comprometta la disponibilità del servizio, o tentativi di compromissione della sicurezza.</p>

        <h2>4. Proprietà intellettuale</h2>
        <p>Marchio, logo, testi, codice del sito, design e contenuti grafici sono di proprietà di Alessio Sada salvo dove diversamente indicato. I marchi di terze parti (Vue, Laravel, ecc.) appartengono ai rispettivi titolari e sono citati a fini descrittivi.</p>
        <p>I progetti realizzati per i clienti restano di proprietà del cliente secondo quanto stabilito nel singolo contratto.</p>

        <h2>5. Limitazione di responsabilità</h2>
        <p>I contenuti pubblicati hanno finalità informativa generale e non costituiscono consulenza professionale specifica. Per ricevere consulenza dedicata al tuo caso, contattaci direttamente.</p>
        <p>Ci impegniamo a mantenere il sito disponibile e aggiornato, ma non possiamo garantire continuità di servizio o assenza di errori. Eventuali link a siti di terze parti sono forniti per comodità: non rispondiamo dei loro contenuti.</p>

        <h2>6. Privacy e cookie</h2>
        <p>Il trattamento dei dati personali è disciplinato dalla nostra <NuxtLink to="/privacy">Privacy Policy</NuxtLink>. L'utilizzo di cookie è descritto nella <NuxtLink to="/cookie">Cookie Policy</NuxtLink>.</p>

        <h2>7. Servizi a pagamento</h2>
        <p>I servizi professionali offerti (sviluppo, consulenza, manutenzione) sono soggetti a contratto specifico. Il contratto definisce: oggetto del lavoro, tempi, costi, modalità di pagamento, garanzie, proprietà del codice prodotto, riservatezza, foro competente. Nessun ordine si intende perfezionato senza contratto firmato e accettazione di entrambe le parti.</p>

        <h2>8. Comunicazioni</h2>
        <p>Tutte le comunicazioni ufficiali avvengono via email all'indirizzo <a href="mailto:hello@kiba.studio">hello@kiba.studio</a> o tramite PEC indicata in fase contrattuale.</p>

        <h2>9. Legge applicabile e foro competente</h2>
        <p>Questi termini sono disciplinati dalla legge italiana. Per ogni controversia derivante dall'utilizzo del sito è competente il Foro di Milano, salvo diverse previsioni inderogabili a tutela del consumatore ai sensi del D.Lgs. 206/2005.</p>

        <h2>10. Modifiche</h2>
        <p>Possiamo aggiornare questi termini in qualsiasi momento. La data dell'ultima modifica è indicata in cima alla pagina. L'utilizzo continuato del sito dopo le modifiche costituisce accettazione delle stesse.</p>
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
const url = `${config.public.siteUrl}/termini`;

useHead({
  title: 'Termini di servizio — Kiba.Studio',
  meta: [
    { hid: 'description', name: 'description', content: 'Termini e condizioni di utilizzo del sito Kiba.Studio.' },
    { hid: 'og:title', property: 'og:title', content: 'Termini di servizio — Kiba.Studio' },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
});
</script>
