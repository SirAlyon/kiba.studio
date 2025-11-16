<template>
  <!--
    KibaSPAServices.vue
    Sezione Servizi con accordion animato GSAP
    6 servizi con espansione/collasso fluido
  -->
  <div class="kiba-services-spa">
    <div class="container">
      <div class="text-center mb-5">
        <div class="kiba-section-label gsap-animate">I Nostri Servizi</div>
        <h2 class="kiba-section-title gsap-animate">
          Soluzioni digitali<br />
          <span class="kiba-text-gradient">complete</span>
        </h2>
        <p class="kiba-section-subtitle gsap-animate">
          Dalla progettazione al deployment, costruiamo software etico e scalabile
        </p>
      </div>

      <!-- Accordion Services -->
      <div class="kiba-services-accordion">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="kiba-service-item gsap-animate"
          :class="{ 'is-open': openService === index }"
        >
          <button
            class="kiba-service-header"
            @click="toggleService(index)"
            :aria-expanded="openService === index"
          >
            <div class="kiba-service-header-content">
              <div class="kiba-service-icon">
                <i :class="service.icon"></i>
              </div>
              <div class="kiba-service-title-wrapper">
                <h3 class="kiba-service-title">{{ service.title }}</h3>
                <span class="kiba-service-subtitle">{{ service.subtitle }}</span>
              </div>
            </div>
            <div class="kiba-service-toggle">
              <i class="fas fa-plus"></i>
            </div>
          </button>

          <div
            ref="contentRefs"
            class="kiba-service-content"
            :data-index="index"
          >
            <div class="kiba-service-content-inner">
              <p class="kiba-service-description">{{ service.description }}</p>
              <ul class="kiba-service-features">
                <li v-for="feature in service.features" :key="feature">
                  <i class="fas fa-check"></i>
                  {{ feature }}
                </li>
              </ul>
              <div class="kiba-service-tech">
                <span class="kiba-tech-label">Stack:</span>
                <div class="kiba-tech-tags">
                  <span
                    v-for="tech in service.technologies"
                    :key="tech"
                    class="kiba-tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useGSAP } from '@/composables/useGSAP';

// GSAP
const { loadGSAP, animateAccordion } = useGSAP();
let gsapInstance = null;

// State
const openService = ref(null);
const contentRefs = ref([]);

// Services data
const services = [
  {
    id: 'frontend',
    icon: 'fas fa-palette',
    title: 'Frontend Development',
    subtitle: 'Interfacce moderne e performanti',
    description:
      'Creiamo interfacce utente reattive e accessibili con Vue.js 3, React e Nuxt. Design responsive, animazioni fluide, performance ottimizzate per ogni device.',
    features: [
      'Single Page Applications (SPA)',
      'Progressive Web Apps (PWA)',
      'Design responsive mobile-first',
      'Accessibilità WCAG 2.1',
      'Animazioni GSAP professionali'
    ],
    technologies: ['Vue.js 3', 'Nuxt 3', 'React', 'TailwindCSS', 'GSAP']
  },
  {
    id: 'backend',
    icon: 'fas fa-server',
    title: 'Backend Development',
    subtitle: 'API robuste e sicure',
    description:
      'Sviluppiamo backend scalabili con Laravel e Node.js. API RESTful, autenticazione sicura, gestione database ottimizzata, architettura pulita e testata.',
    features: [
      'API RESTful documentate',
      'Autenticazione JWT/OAuth',
      'Database optimization',
      'Caching e performance',
      'Testing automatizzato'
    ],
    technologies: ['Laravel', 'Node.js', 'Python', 'PostgreSQL', 'Redis']
  },
  {
    id: 'fullstack',
    icon: 'fas fa-layer-group',
    title: 'Applicazioni Full-Stack',
    subtitle: 'Soluzioni end-to-end',
    description:
      'Progettiamo e sviluppiamo applicazioni web complete, dal database all\'interfaccia utente. Architettura modulare, codice manutenibile, deployment automatizzato.',
    features: [
      'Architettura MVC/MVVM',
      'CI/CD pipelines',
      'Monitoraggio e logging',
      'Backup automatici',
      'Documentazione completa'
    ],
    technologies: ['Laravel + Vue.js', 'TALL Stack', 'Docker', 'GitHub Actions']
  },
  {
    id: 'server',
    icon: 'fas fa-cloud',
    title: 'Server & DevOps',
    subtitle: 'Infrastruttura affidabile',
    description:
      'Configuriamo e gestiamo server Linux, containerizzazione Docker, orchestrazione con Kubernetes. Monitoring, sicurezza, scalabilità automatica.',
    features: [
      'Server Linux administration',
      'Docker containerization',
      'Nginx/Apache configuration',
      'SSL/TLS certificates',
      'Firewall e sicurezza'
    ],
    technologies: ['Ubuntu', 'Docker', 'Nginx', 'Let\'s Encrypt', 'Fail2ban']
  },
  {
    id: 'automation',
    icon: 'fas fa-robot',
    title: 'Automazione & Script',
    subtitle: 'Efficienza operativa',
    description:
      'Automatizziamo processi ripetitivi con Python e Bash. Scraping etico, data processing, task scheduling, integrazione API di terze parti.',
    features: [
      'Web scraping etico',
      'Data processing pipelines',
      'Task automation',
      'API integrations',
      'Report automatici'
    ],
    technologies: ['Python', 'Bash', 'Selenium', 'Pandas', 'Cron']
  },
  {
    id: 'consulting',
    icon: 'fas fa-comments',
    title: 'Consulenza Tecnica',
    subtitle: 'Strategia e architettura',
    description:
      'Offriamo consulenza su architettura software, scelta tecnologica, code review, refactoring. Aiutiamo team interni a migliorare qualità e processi.',
    features: [
      'Architettura software',
      'Code review approfondite',
      'Refactoring legacy code',
      'Best practices training',
      'Sicurezza applicativa'
    ],
    technologies: ['Clean Code', 'SOLID', 'Design Patterns', 'Security Audit']
  }
];

onMounted(async () => {
  const modules = await loadGSAP();
  if (modules) {
    gsapInstance = modules.gsap;
  }
});

/**
 * Toggle accordion item
 */
const toggleService = async (index) => {
  await nextTick();

  const contentElements = document.querySelectorAll('.kiba-service-content');

  if (openService.value === index) {
    // Close current
    if (gsapInstance && contentElements[index]) {
      animateAccordion(contentElements[index], false);
    }
    openService.value = null;
  } else {
    // Close previous if open
    if (openService.value !== null && contentElements[openService.value]) {
      if (gsapInstance) {
        animateAccordion(contentElements[openService.value], false);
      }
    }

    // Open new
    openService.value = index;
    if (gsapInstance && contentElements[index]) {
      animateAccordion(contentElements[index], true);
    }
  }
};
</script>

<style scoped>
.kiba-services-spa {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 60px 0;
  overflow-y: auto;
}

.kiba-section-label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--kiba-primary, #c94c4c);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 16px;
}

.kiba-section-title {
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 16px;
}

.kiba-text-gradient {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.kiba-section-subtitle {
  font-size: 1.125rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  max-width: 600px;
  margin: 0 auto;
}

.kiba-services-accordion {
  max-width: 900px;
  margin: 0 auto;
}

.kiba-service-item {
  background: var(--kiba-bg-dark, #1a1a1a);
  border-radius: 12px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.kiba-service-item:hover {
  border-color: rgba(201, 76, 76, 0.3);
}

.kiba-service-item.is-open {
  border-color: var(--kiba-primary, #c94c4c);
}

.kiba-service-header {
  width: 100%;
  padding: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition: background 0.3s ease;
}

.kiba-service-header:hover {
  background: rgba(255, 255, 255, 0.02);
}

.kiba-service-header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.kiba-service-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201, 76, 76, 0.1);
  border-radius: 12px;
  color: var(--kiba-primary, #c94c4c);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.kiba-service-title-wrapper {
  display: flex;
  flex-direction: column;
}

.kiba-service-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0;
}

.kiba-service-subtitle {
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  margin-top: 4px;
}

.kiba-service-toggle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: var(--kiba-text-secondary, #b0b0b0);
  transition: all 0.3s ease;
}

.kiba-service-item.is-open .kiba-service-toggle {
  background: var(--kiba-primary, #c94c4c);
  color: #ffffff;
  transform: rotate(45deg);
}

.kiba-service-content {
  height: 0;
  overflow: hidden;
}

.kiba-service-content-inner {
  padding: 0 24px 24px;
}

.kiba-service-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 20px;
}

.kiba-service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.kiba-service-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.kiba-service-features i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 0.8rem;
}

.kiba-service-tech {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.kiba-tech-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--kiba-text-muted, #888);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kiba-tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.kiba-tech-tag {
  padding: 4px 12px;
  background: rgba(201, 76, 76, 0.1);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--kiba-primary, #c94c4c);
}

@media (max-width: 767px) {
  .kiba-section-title {
    font-size: 2rem;
  }

  .kiba-service-header {
    padding: 20px;
  }

  .kiba-service-features {
    grid-template-columns: 1fr;
  }

  .kiba-service-icon {
    width: 44px;
    height: 44px;
    font-size: 1.125rem;
  }

  .kiba-service-title {
    font-size: 1.125rem;
  }
}
</style>
