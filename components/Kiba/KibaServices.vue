<template>
  <!--
    KibaServices.vue
    Sezione servizi offerti da Kiba.Studio
    Card per ogni area di competenza
  -->
  <section id="servizi" class="kiba-section kiba-section-dark">
    <div class="container">
      <!-- Titolo sezione -->
      <div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s">
        <div class="kiba-label">I Nostri Servizi</div>
        <h2 class="kiba-heading-lg">
          Soluzioni digitali complete
        </h2>
        <p class="kiba-subtitle">
          Dal front-end all'infrastruttura, copriamo ogni aspetto dello sviluppo
          software moderno. Ecco come possiamo aiutarti.
        </p>
      </div>

      <!-- Grid servizi -->
      <div class="row">
        <!-- Servizio 1: Front-end -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-card wow fadeInUp" data-wow-delay=".2s">
            <div class="kiba-card-icon">
              <i class="fas fa-laptop-code"></i>
            </div>
            <h3 class="kiba-heading-sm">Sviluppo Front-end</h3>
            <p class="kiba-body mt-15">
              Interfacce moderne, reattive e performanti. Specializziamo in
              Vue.js, React e architetture SPA/PWA. Ogni componente è
              ottimizzato per velocità e accessibilità.
            </p>
            <ul class="kiba-service-list mt-15">
              <li>Single Page Applications (SPA)</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>UI/UX responsive e accessibile</li>
              <li>Ottimizzazione performance</li>
            </ul>
          </div>
        </div>

        <!-- Servizio 2: Back-end -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-card wow fadeInUp" data-wow-delay=".3s">
            <div class="kiba-card-icon">
              <i class="fas fa-server"></i>
            </div>
            <h3 class="kiba-heading-sm">Sviluppo Back-end</h3>
            <p class="kiba-body mt-15">
              API robuste e scalabili, architetture a microservizi e gestione
              database. Costruiamo il cuore tecnologico del tuo prodotto con
              sicurezza e performance.
            </p>
            <ul class="kiba-service-list mt-15">
              <li>API REST e GraphQL</li>
              <li>Microservizi e monoliti modulari</li>
              <li>Database SQL e NoSQL</li>
              <li>Autenticazione e sicurezza</li>
            </ul>
          </div>
        </div>

        <!-- Servizio 3: Infrastruttura -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-card wow fadeInUp" data-wow-delay=".4s">
            <div class="kiba-card-icon">
              <i class="fas fa-cloud"></i>
            </div>
            <h3 class="kiba-heading-sm">Gestione Server & Cloud</h3>
            <p class="kiba-body mt-15">
              Configurazione, deploy e monitoraggio di infrastrutture cloud.
              Dal singolo VPS alle architetture multi-cloud, gestiamo tutto
              il ciclo di vita del tuo ambiente.
            </p>
            <ul class="kiba-service-list mt-15">
              <li>Setup e configurazione server</li>
              <li>CI/CD e automazione deploy</li>
              <li>Monitoring e alerting</li>
              <li>Backup e disaster recovery</li>
            </ul>
          </div>
        </div>

        <!-- Servizio 4: Automazione -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-card wow fadeInUp" data-wow-delay=".5s">
            <div class="kiba-card-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h3 class="kiba-heading-sm">Automazione & Integrazioni</h3>
            <p class="kiba-body mt-15">
              Elimina le operazioni ripetitive e connetti i tuoi sistemi.
              Script personalizzati, workflow automatizzati e integrazioni
              tra piattaforme diverse.
            </p>
            <ul class="kiba-service-list mt-15">
              <li>Script e bot personalizzati</li>
              <li>Integrazione API terze parti</li>
              <li>Workflow automation</li>
              <li>Data sync e ETL</li>
            </ul>
          </div>
        </div>

        <!-- Servizio 5: Consulenza -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-card wow fadeInUp" data-wow-delay=".6s">
            <div class="kiba-card-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3 class="kiba-heading-sm">Consulenza Tecnica</h3>
            <p class="kiba-body mt-15">
              Hai bisogno di un parere esperto? Ti aiutiamo a scegliere le
              tecnologie giuste, valutare architetture e pianificare lo
              sviluppo del tuo prodotto digitale.
            </p>
            <ul class="kiba-service-list mt-15">
              <li>Analisi requisiti</li>
              <li>Scelta stack tecnologico</li>
              <li>Code review e refactoring</li>
              <li>Formazione team</li>
            </ul>
          </div>
        </div>

        <!-- Servizio 6: MCP -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-card wow fadeInUp" data-wow-delay=".7s">
            <div class="kiba-card-icon">
              <i class="fas fa-project-diagram"></i>
            </div>
            <h3 class="kiba-heading-sm">MCP & Architetture</h3>
            <p class="kiba-body mt-15">
              Progettazione e implementazione di architetture software
              complesse. Gestiamo la comunicazione tra servizi, orchestrazione
              e scalabilità del sistema.
            </p>
            <ul class="kiba-service-list mt-15">
              <li>Design architetturale</li>
              <li>Event-driven architecture</li>
              <li>Message queuing</li>
              <li>Service mesh</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Nessuna logica specifica richiesta
</script>

<style scoped>
.kiba-service-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.kiba-service-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  color: var(--kiba-text-secondary);
  font-size: 0.9375rem;
}

.kiba-service-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background: var(--kiba-primary);
  border-radius: 50%;
}
</style>
