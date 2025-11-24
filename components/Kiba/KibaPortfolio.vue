<template>
  <!--
    KibaPortfolio.vue
    Sezione portfolio/progetti di Kiba.Studio
    Contiene progetti placeholder pronti per essere sostituiti con casi reali

    TODO: Sostituire i progetti placeholder con case study reali quando disponibili
  -->
  <section id="portfolio" class="kiba-section kiba-section-surface">
    <div class="container">
      <!-- Titolo sezione -->
      <div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s">
        <div class="kiba-label">{{ $t('portfolio.label') }}</div>
        <h2 class="kiba-heading-lg">
          {{ $t('portfolio.title') }}
        </h2>
        <p class="kiba-subtitle">
          {{ $t('portfolio.subtitle') }}
        </p>
      </div>

      <!-- Nota progetti esempio -->
      <div class="text-center mb-40 wow fadeInUp" data-wow-delay=".15s">
        <div class="kiba-portfolio-notice">
          <i class="fas fa-info-circle me-2"></i>
          <span>
            {{ $t('portfolio.privacy_note') }}
          </span>
        </div>
      </div>

      <!-- Grid progetti -->
      <div class="row">
        <!-- Progetto 1 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".2s">
            <div class="kiba-portfolio-image">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="kiba-portfolio-content">
              <span class="kiba-portfolio-tag">E-commerce</span>
              <h3 class="kiba-heading-sm">
                Piattaforma E-commerce B2B
              </h3>
              <p class="kiba-body mt-10">
                Sistema di vendita all'ingrosso con gestione inventario in
                tempo reale, integrazione ERP e dashboard analytics avanzata.
              </p>
              <div class="kiba-portfolio-tech mt-15">
                <span class="kiba-tech-tag">Vue.js</span>
                <span class="kiba-tech-tag">Node.js</span>
                <span class="kiba-tech-tag">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progetto 2 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".3s">
            <div class="kiba-portfolio-image">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="kiba-portfolio-content">
              <span class="kiba-portfolio-tag">PWA</span>
              <h3 class="kiba-heading-sm">
                App Gestione Prenotazioni
              </h3>
              <p class="kiba-body mt-10">
                Progressive Web App per la gestione di appuntamenti con
                notifiche push, sincronizzazione offline e pagamenti integrati.
              </p>
              <div class="kiba-portfolio-tech mt-15">
                <span class="kiba-tech-tag">React</span>
                <span class="kiba-tech-tag">Firebase</span>
                <span class="kiba-tech-tag">Stripe</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progetto 3 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".4s">
            <div class="kiba-portfolio-image">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="kiba-portfolio-content">
              <span class="kiba-portfolio-tag">Dashboard</span>
              <h3 class="kiba-heading-sm">
                Dashboard Analytics Real-time
              </h3>
              <p class="kiba-body mt-10">
                Piattaforma di monitoraggio dati con grafici interattivi,
                alert automatici e report personalizzabili esportabili in PDF.
              </p>
              <div class="kiba-portfolio-tech mt-15">
                <span class="kiba-tech-tag">Vue.js</span>
                <span class="kiba-tech-tag">D3.js</span>
                <span class="kiba-tech-tag">WebSocket</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progetto 4 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".5s">
            <div class="kiba-portfolio-image">
              <i class="fas fa-cogs"></i>
            </div>
            <div class="kiba-portfolio-content">
              <span class="kiba-portfolio-tag">Automazione</span>
              <h3 class="kiba-heading-sm">
                Sistema di Integrazione CRM
              </h3>
              <p class="kiba-body mt-10">
                Middleware custom per sincronizzare dati tra CRM, ERP e
                piattaforma marketing con trasformazioni dati automatiche.
              </p>
              <div class="kiba-portfolio-tech mt-15">
                <span class="kiba-tech-tag">Python</span>
                <span class="kiba-tech-tag">RabbitMQ</span>
                <span class="kiba-tech-tag">Docker</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progetto 5 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".6s">
            <div class="kiba-portfolio-image">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <div class="kiba-portfolio-content">
              <span class="kiba-portfolio-tag">Cloud Migration</span>
              <h3 class="kiba-heading-sm">
                Migrazione Infrastruttura AWS
              </h3>
              <p class="kiba-body mt-10">
                Migrazione completa di applicazione legacy su cloud AWS con
                containerizzazione, CI/CD pipeline e monitoring avanzato.
              </p>
              <div class="kiba-portfolio-tech mt-15">
                <span class="kiba-tech-tag">AWS</span>
                <span class="kiba-tech-tag">Docker</span>
                <span class="kiba-tech-tag">Terraform</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progetto 6 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".7s">
            <div class="kiba-portfolio-image">
              <i class="fas fa-users"></i>
            </div>
            <div class="kiba-portfolio-content">
              <span class="kiba-portfolio-tag">SaaS</span>
              <h3 class="kiba-heading-sm">
                Piattaforma HR Management
              </h3>
              <p class="kiba-body mt-10">
                Software SaaS per la gestione risorse umane con moduli per
                presenze, ferie, performance review e onboarding digitale.
              </p>
              <div class="kiba-portfolio-tech mt-15">
                <span class="kiba-tech-tag">Nuxt</span>
                <span class="kiba-tech-tag">NestJS</span>
                <span class="kiba-tech-tag">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Portfolio -->
      <div class="text-center mt-40 wow fadeInUp" data-wow-delay=".8s">
        <p class="kiba-body mb-20">
          {{ $t('contact.subtitle') }}
        </p>
        <a href="#contatti" class="kiba-btn kiba-btn-primary">
          {{ $t('portfolio.cta_button') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Nessuna logica specifica richiesta
</script>

<style scoped>
.kiba-portfolio-notice {
  display: inline-block;
  padding: 10px 20px;
  background: rgba(201, 76, 76, 0.1);
  border: 1px solid rgba(201, 76, 76, 0.3);
  border-radius: var(--kiba-radius-md);
  color: var(--kiba-secondary);
  font-size: 0.875rem;
}

.kiba-portfolio-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: var(--kiba-transition);
}

.kiba-portfolio-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--kiba-shadow-lg);
}

.kiba-portfolio-card:hover .kiba-portfolio-image {
  background: var(--kiba-bg-surface);
}

.kiba-portfolio-card:hover .kiba-portfolio-image i {
  transform: scale(1.1);
  color: var(--kiba-primary);
}

.kiba-portfolio-image i {
  transition: var(--kiba-transition);
}

.kiba-portfolio-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.kiba-portfolio-tech {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.kiba-portfolio-tech .kiba-tech-tag {
  font-size: 0.75rem;
  padding: 4px 10px;
}
</style>
