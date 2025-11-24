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
        <div class="kiba-label">{{ $t('services.label') }}</div>
        <h2 class="kiba-heading-lg">
          {{ $t('services.title') }}
        </h2>
        <p class="kiba-subtitle">
          {{ $t('services.subtitle') }}
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
            <h3 class="kiba-heading-sm">{{ $t('services.frontend_title') }}</h3>
            <p class="kiba-body mt-15">
              {{ $t('services.frontend_description') }}
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
            <h3 class="kiba-heading-sm">{{ $t('services.backend_title') }}</h3>
            <p class="kiba-body mt-15">
              {{ $t('services.backend_description') }}
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
            <h3 class="kiba-heading-sm">{{ $t('services.server_title') }}</h3>
            <p class="kiba-body mt-15">
              {{ $t('services.server_description') }}
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
            <h3 class="kiba-heading-sm">{{ $t('services.automation_title') }}</h3>
            <p class="kiba-body mt-15">
              {{ $t('services.automation_description') }}
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
            <h3 class="kiba-heading-sm">{{ $t('services.consulting_title') }}</h3>
            <p class="kiba-body mt-15">
              {{ $t('services.consulting_description') }}
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
