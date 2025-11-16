<template>
  <!--
    KibaSPAPortfolio.vue
    Sezione Portfolio con progetti anonimizzati e modali dettagliate
    Focus sulla privacy dei clienti
  -->
  <div class="kiba-portfolio-spa">
    <div class="container">
      <!-- Header sezione -->
      <div class="kiba-portfolio-header">
        <div class="kiba-section-label gsap-animate">Portfolio</div>
        <h2 class="kiba-section-title gsap-animate">
          Esempi del nostro lavoro<br />
          <span class="kiba-text-gradient">Privacy dei clienti sempre rispettata</span>
        </h2>
        <p class="kiba-section-subtitle gsap-animate">
          I progetti sono presentati in forma anonima per tutelare la riservatezza dei nostri clienti.
          Nessun dato sensibile, solo la qualità del nostro lavoro.
        </p>
      </div>

      <!-- Griglia progetti -->
      <div class="kiba-portfolio-grid">
        <div
          v-for="project in projects"
          :key="project.id"
          class="kiba-portfolio-card gsap-animate"
          @click="openModal(project)"
        >
          <!-- Card header -->
          <div class="kiba-portfolio-card-header">
            <div class="kiba-portfolio-card-type">{{ project.type }}</div>
            <div class="kiba-portfolio-card-icon">
              <i :class="project.icon"></i>
            </div>
          </div>

          <!-- Card body -->
          <h3 class="kiba-portfolio-card-title">{{ project.title }}</h3>
          <p class="kiba-portfolio-card-description">{{ project.description }}</p>

          <!-- Card tags -->
          <div class="kiba-portfolio-card-tags">
            <span
              v-for="tag in project.mainTech.slice(0, 3)"
              :key="tag"
              class="kiba-portfolio-card-tag"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Card action -->
          <div class="kiba-portfolio-card-action">
            <span>Scopri di più</span>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <!-- Privacy note -->
      <div class="kiba-portfolio-note gsap-animate">
        <i class="fas fa-shield-alt"></i>
        <p>
          <strong>Privacy First:</strong> Tutti i dettagli sensibili sono stati rimossi.
          I progetti sono descritti preservando completamente l'anonimato dei clienti.
        </p>
      </div>
    </div>

    <!-- Modale dettagli progetto -->
    <KibaProjectModal
      :is-open="isModalOpen"
      :project="selectedProject"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import KibaProjectModal from './KibaProjectModal.vue';

const isModalOpen = ref(false);
const selectedProject = ref(null);

// Progetti anonimizzati di esempio
const projects = ref([
  {
    id: 1,
    type: 'Web Application',
    icon: 'fas fa-globe',
    title: 'Pannello di controllo per marketplace B2B',
    description: 'Sistema completo di gestione ordini, inventario e logistica per un marketplace europeo con oltre 500 venditori attivi.',
    subtitle: 'Soluzione enterprise per e-commerce B2B',
    fullDescription: 'Abbiamo sviluppato un pannello di controllo completo per un marketplace B2B europeo che gestisce transazioni per oltre 10M€/anno. Il sistema permette la gestione completa di ordini, inventario, logistica e fatturazione, con particolare attenzione alla sicurezza dei dati e alla conformità GDPR. Ogni transazione è crittografata end-to-end e i dati sensibili sono segregati con accessi basati su ruoli granulari.',
    mainTech: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'Docker'],
    technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'Docker', 'Elasticsearch', 'RabbitMQ', 'Kubernetes'],
    challenges: [
      {
        title: 'Gestione di alto volume',
        solution: 'Architettura microservizi con caching distribuito per gestire oltre 10.000 richieste/minuto'
      },
      {
        title: 'Multi-tenancy sicuro',
        solution: 'Segregazione dati per tenant con crittografia a livello di database e audit log completo'
      },
      {
        title: 'Conformità GDPR',
        solution: 'Sistema di anonimizzazione dati, export GDPR automatico e diritto all\'oblio implementato'
      }
    ],
    privacyFeatures: [
      'Crittografia end-to-end per tutte le transazioni',
      'Audit log immutabile con blockchain privata',
      'Sistema di ruoli e permessi granulare',
      'Anonimizzazione automatica dati personali',
      'Export GDPR compliance in un click'
    ]
  },
  {
    id: 2,
    type: 'Intranet',
    icon: 'fas fa-building',
    title: 'Portale interno per studio legale',
    description: 'Sistema di gestione documentale e pratiche per uno studio legale con sedi multiple e requisiti di massima riservatezza.',
    subtitle: 'Gestione documentale sicura e conforme',
    fullDescription: 'Portale interno sviluppato per uno studio legale internazionale con 200+ professionisti. Il sistema gestisce documenti sensibili, pratiche legali, timesheet e fatturazione. Particolare focus sulla sicurezza: tutti i documenti sono crittografati a riposo e in transito, con sistema di versioning e audit trail completo. Accesso con autenticazione a due fattori e VPN dedicata.',
    mainTech: ['Next.js', 'Node.js', 'MongoDB', 'AWS S3'],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'AWS S3', 'Nginx', 'OpenVPN', 'Elastic Stack'],
    challenges: [
      {
        title: 'Sicurezza documentale',
        solution: 'Crittografia AES-256 per storage, firma digitale per integrità documenti'
      },
      {
        title: 'Ricerca full-text sicura',
        solution: 'Elasticsearch con indici crittografati e ricerca su dati sensibili mascherati'
      },
      {
        title: 'Compliance normativa',
        solution: 'Sistema conforme a normative professionali e conservazione a norma'
      }
    ],
    privacyFeatures: [
      'Crittografia AES-256 per tutti i documenti',
      'Autenticazione multi-fattore obbligatoria',
      'VPN dedicata per accesso remoto',
      'Watermark dinamici sui documenti',
      'Distruzione sicura documenti scaduti'
    ]
  },
  {
    id: 3,
    type: 'Dashboard SaaS',
    icon: 'fas fa-chart-line',
    title: 'Dashboard analytics privacy-first',
    description: 'Piattaforma di analytics che non traccia utenti individuali, completamente GDPR-compliant by design.',
    subtitle: 'Analytics etico senza cookie di tracciamento',
    fullDescription: 'Dashboard di analytics sviluppata per una startup SaaS che voleva un\'alternativa etica a Google Analytics. Il sistema raccoglie metriche aggregate senza mai tracciare singoli utenti. Non utilizza cookie, fingerprinting o altre tecniche invasive. Tutti i dati sono aggregati in tempo reale e le informazioni personali vengono automaticamente rimosse.',
    mainTech: ['React', 'Go', 'ClickHouse', 'TimescaleDB'],
    technologies: ['React', 'Go', 'ClickHouse', 'TimescaleDB', 'Kafka', 'Grafana', 'Prometheus'],
    challenges: [
      {
        title: 'Analytics senza tracking',
        solution: 'Aggregazione in tempo reale con hash one-way per sessioni anonime'
      },
      {
        title: 'Performance real-time',
        solution: 'Pipeline di streaming con Kafka e database time-series ottimizzati'
      },
      {
        title: 'Privacy by design',
        solution: 'Nessun dato personale salvato, solo metriche aggregate'
      }
    ],
    privacyFeatures: [
      'Zero cookie di tracciamento',
      'Nessun fingerprinting o tracking cross-site',
      'Dati aggregati in tempo reale',
      'IP anonimizzati automaticamente',
      'Conformità GDPR by design'
    ]
  },
  {
    id: 4,
    type: 'Mobile App',
    icon: 'fas fa-mobile-alt',
    title: 'App sanitaria con crittografia E2E',
    description: 'Applicazione mobile per gestione dati sanitari con crittografia end-to-end e zero-knowledge architecture.',
    subtitle: 'Telemedicina sicura e privata',
    fullDescription: 'App mobile sviluppata per una clinica privata che gestisce consultazioni remote e cartelle cliniche digitali. Implementa una zero-knowledge architecture dove nemmeno noi sviluppatori possiamo accedere ai dati dei pazienti. Ogni informazione è crittografata lato client prima di essere trasmessa. Sistema di backup sicuro con recovery key gestite dal paziente.',
    mainTech: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC'],
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'Signal Protocol', 'Jitsi Meet', 'MinIO'],
    challenges: [
      {
        title: 'Crittografia end-to-end',
        solution: 'Implementazione Signal Protocol per messaggistica e file sharing sicuri'
      },
      {
        title: 'Videochiamate sicure',
        solution: 'WebRTC con server STUN/TURN self-hosted e crittografia DTLS-SRTP'
      },
      {
        title: 'Compliance sanitaria',
        solution: 'Conformità HIPAA/GDPR con audit log e data retention policies'
      }
    ],
    privacyFeatures: [
      'Zero-knowledge architecture',
      'Crittografia E2E per tutti i dati',
      'Videochiamate P2P crittografate',
      'Backup con client-side encryption',
      'Cancellazione sicura dei dati'
    ]
  },
  {
    id: 5,
    type: 'E-commerce',
    icon: 'fas fa-shopping-cart',
    title: 'Piattaforma e-commerce privacy-conscious',
    description: 'Shop online che minimizza la raccolta dati e offre checkout anonimo con criptovalute.',
    subtitle: 'E-commerce che rispetta la privacy',
    fullDescription: 'Piattaforma e-commerce sviluppata per un brand che voleva offrire un\'esperienza di acquisto rispettosa della privacy. Il sistema permette acquisti anonimi, supporta pagamenti in criptovaluta, e minimizza la raccolta di dati personali. Analytics interno senza tracciamento, sistema di recensioni anonime verificate, e opzione di cancellazione completa account con un click.',
    mainTech: ['Nuxt.js', 'Strapi', 'PostgreSQL', 'BTCPay'],
    technologies: ['Nuxt.js', 'Strapi', 'PostgreSQL', 'BTCPay Server', 'IPFS', 'Tor', 'Monero'],
    challenges: [
      {
        title: 'Pagamenti anonimi',
        solution: 'Integrazione BTCPay Server per crypto e gift card anonime'
      },
      {
        title: 'Spedizioni private',
        solution: 'Sistema di drop-shipping con dati segregati e cancellati post-consegna'
      },
      {
        title: 'Anti-fraud senza tracking',
        solution: 'Sistema di reputazione basato su proof-of-purchase crittografici'
      }
    ],
    privacyFeatures: [
      'Checkout ospite senza registrazione',
      'Pagamenti in criptovaluta',
      'Dati di spedizione cancellati automaticamente',
      'No tracking o remarketing',
      'Accesso via Tor supportato'
    ]
  },
  {
    id: 6,
    type: 'API Platform',
    icon: 'fas fa-plug',
    title: 'Piattaforma API con data governance',
    description: 'Sistema di API management con controllo granulare su data access e privacy compliance automatica.',
    subtitle: 'API Gateway con privacy controls integrati',
    fullDescription: 'Piattaforma API sviluppata per un\'azienda che gestisce dati sensibili di terze parti. Il sistema implementa un API gateway intelligente con data masking automatico, rate limiting per prevenire data scraping, e audit log completo. Ogni richiesta API viene validata contro policy di privacy configurabili e i dati sensibili vengono automaticamente oscurati basandosi sul livello di autorizzazione del chiamante.',
    mainTech: ['Kong', 'FastAPI', 'Cassandra', 'Vault'],
    technologies: ['Kong Gateway', 'FastAPI', 'Cassandra', 'HashiCorp Vault', 'OPA', 'Jaeger', 'Prometheus'],
    challenges: [
      {
        title: 'Data masking dinamico',
        solution: 'Policy engine con OPA per mascheramento real-time basato su contesto'
      },
      {
        title: 'Secret management',
        solution: 'Vault per rotazione automatica credenziali e encryption keys'
      },
      {
        title: 'Compliance multi-tenant',
        solution: 'Policy di privacy per tenant con inheritance e override rules'
      }
    ],
    privacyFeatures: [
      'Data masking automatico per PII',
      'Audit log immutabile di tutti gli accessi',
      'Encryption at rest e in transit',
      'API key rotation automatica',
      'Rate limiting anti-scraping'
    ]
  }
]);

const openModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  // Delay reset per permettere animazione chiusura
  setTimeout(() => {
    selectedProject.value = null;
  }, 300);
};
</script>

<style scoped>
.kiba-portfolio-spa {
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  padding: 60px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Header */
.kiba-portfolio-header {
  text-align: center;
  margin-bottom: 60px;
}

.kiba-section-label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--kiba-primary, #c94c4c);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}

.kiba-section-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 20px;
}

.kiba-text-gradient {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.kiba-section-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--kiba-text-secondary, #b0b0b0);
  max-width: 600px;
  margin: 0 auto;
}

/* Grid */
.kiba-portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

/* Card */
.kiba-portfolio-card {
  background: var(--kiba-bg-dark, #1a1a1a);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.kiba-portfolio-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.kiba-portfolio-card:hover {
  border-color: rgba(201, 76, 76, 0.3);
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.kiba-portfolio-card:hover::before {
  transform: scaleX(1);
}

.kiba-portfolio-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.kiba-portfolio-card-type {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--kiba-primary, #c94c4c);
}

.kiba-portfolio-card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201, 76, 76, 0.1);
  border-radius: 8px;
  color: var(--kiba-primary, #c94c4c);
}

.kiba-portfolio-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 12px;
  line-height: 1.3;
}

.kiba-portfolio-card-description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 20px;
}

.kiba-portfolio-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.kiba-portfolio-card-tag {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  font-size: 0.75rem;
  color: var(--kiba-text-muted, #888);
}

.kiba-portfolio-card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--kiba-primary, #c94c4c);
  font-size: 0.875rem;
  font-weight: 500;
}

.kiba-portfolio-card-action i {
  transition: transform 0.3s ease;
}

.kiba-portfolio-card:hover .kiba-portfolio-card-action i {
  transform: translateX(5px);
}

/* Privacy Note */
.kiba-portfolio-note {
  background: rgba(201, 76, 76, 0.1);
  border-left: 3px solid var(--kiba-primary, #c94c4c);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
}

.kiba-portfolio-note i {
  font-size: 1.5rem;
  color: var(--kiba-primary, #c94c4c);
  flex-shrink: 0;
}

.kiba-portfolio-note p {
  margin: 0;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.kiba-portfolio-note strong {
  color: var(--kiba-text-main, #f0f0f0);
}

/* Responsive */
@media (max-width: 991px) {
  .kiba-portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 767px) {
  .kiba-portfolio-spa {
    padding: 40px 0;
  }

  .kiba-section-title {
    font-size: 2rem;
  }

  .kiba-portfolio-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .kiba-portfolio-card {
    padding: 24px;
  }
}
</style>