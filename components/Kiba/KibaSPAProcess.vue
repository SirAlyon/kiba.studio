<template>
  <!--
    KibaSPAProcess.vue
    Sezione Processo - Layout 2 colonne con step singoli
    Contatore a sinistra, contenuto a destra, animazioni GSAP
  -->
  <div class="kiba-process-spa" ref="sectionRef">
    <div class="container-fluid h-100">
      <div class="row h-100 align-items-center">
        <!-- Colonna Sinistra: Contatore -->
        <div class="col-lg-4 col-md-4">
          <div class="kiba-process-counter">
            <div class="kiba-process-counter-label">Step</div>
            <div class="kiba-process-counter-number" ref="counterRef">
              {{ String(activeStepIndex + 1).padStart(2, '0') }}
            </div>
            <div class="kiba-process-counter-title" ref="counterTitleRef">
              {{ steps[activeStepIndex].title }}
            </div>
            <div class="kiba-process-counter-progress">
              <div
                class="kiba-process-counter-progress-fill"
                :style="{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }"
              ></div>
            </div>
            <div class="kiba-process-counter-nav">
              <span class="current">{{ activeStepIndex + 1 }}</span>
              <span class="separator">/</span>
              <span class="total">{{ steps.length }}</span>
            </div>
          </div>
        </div>

        <!-- Colonna Destra: Contenuto -->
        <div class="col-lg-8 col-md-8">
          <div class="kiba-process-content" ref="contentRef">
            <div
              v-for="(step, index) in steps"
              :key="step.id"
              class="kiba-process-step"
              :class="{ 'is-active': index === activeStepIndex }"
              :data-step-index="index"
            >
              <div class="kiba-process-step-icon" :style="{ color: step.accentColor }">
                <i :class="step.icon"></i>
              </div>
              <div class="kiba-process-step-label">{{ step.label }}</div>
              <h2 class="kiba-process-step-title">{{ step.title }}</h2>
              <p class="kiba-process-step-description">{{ step.description }}</p>

              <!-- Punti chiave opzionali -->
              <div v-if="step.highlights" class="kiba-process-step-highlights">
                <div
                  v-for="(highlight, hIndex) in step.highlights"
                  :key="hIndex"
                  class="kiba-process-highlight"
                >
                  <i class="fas fa-check-circle"></i>
                  <span>{{ highlight }}</span>
                </div>
              </div>

              <!-- Durata indicativa -->
              <div class="kiba-process-step-duration">
                <i class="fas fa-clock"></i>
                <span>{{ step.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicatore scroll per prossimo step -->
    <div
      v-if="activeStepIndex < steps.length - 1"
      class="kiba-process-scroll-hint"
    >
      <i class="fas fa-chevron-down"></i>
      <span>Prossimo step</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGSAP } from '@/composables/useGSAP';

const emit = defineEmits(['navigate']);

// Refs
const sectionRef = ref(null);
const contentRef = ref(null);
const counterRef = ref(null);
const counterTitleRef = ref(null);
const activeStepIndex = ref(0);

// GSAP
const { loadGSAP } = useGSAP();
let gsap = null;
let currentStepTimeline = null;

// Flag per gestione scroll
let isAnimating = false;
let canProceed = false;

// Steps del processo
const steps = [
  {
    id: 'discovery',
    label: 'Analisi',
    title: 'Discovery & Strategy',
    description: 'Iniziamo con un\'analisi approfondita delle tue esigenze di business, obiettivi e vincoli tecnici. Definiamo insieme la strategia migliore, lo scope del progetto, timeline realistica e budget sostenibile. Ogni dettaglio viene documentato per garantire trasparenza.',
    icon: 'fas fa-compass',
    accentColor: '#c94c4c',
    duration: '1-2 settimane',
    highlights: [
      'Workshop di scoperta con stakeholder',
      'Analisi competitors e mercato',
      'Definizione KPI e metriche di successo',
      'Documentazione requisiti completa'
    ]
  },
  {
    id: 'design',
    label: 'Progettazione',
    title: 'Design & Architecture',
    description: 'Creiamo wireframe dettagliati, mockup interattivi e definiamo l\'architettura tecnica scalabile. Il design non è solo estetica: è usabilità, accessibilità, performance. Validiamo ogni scelta con te prima di scrivere una singola riga di codice.',
    icon: 'fas fa-drafting-compass',
    accentColor: '#e06666',
    duration: '2-3 settimane',
    highlights: [
      'Wireframe e prototipi interattivi',
      'Design system componibile',
      'Architettura cloud-ready',
      'Review e approvazione iterativa'
    ]
  },
  {
    id: 'development',
    label: 'Sviluppo',
    title: 'Development Sprint',
    description: 'Sviluppiamo in sprint agili con demo settimanali. Codice pulito, testato, documentato. Utilizziamo Git per versionamento, CI/CD per deploy automatici, code review per qualità. Trasparenza totale: hai sempre accesso al repository e progress.',
    icon: 'fas fa-code',
    accentColor: '#d45555',
    duration: '4-12 settimane',
    highlights: [
      'Sprint settimanali con demo',
      'Test automatizzati (TDD)',
      'Code review sistematica',
      'Deploy continuo su staging'
    ]
  },
  {
    id: 'testing',
    label: 'Qualità',
    title: 'Testing & Security',
    description: 'Test funzionali, di performance, di sicurezza. Ogni feature viene validata su diversi dispositivi e browser. Security audit completo, penetration testing, OWASP compliance. Correggiamo bug e ottimizziamo prima del lancio.',
    icon: 'fas fa-shield-alt',
    accentColor: '#c94c4c',
    duration: '1-2 settimane',
    highlights: [
      'Test automatizzati end-to-end',
      'Security audit professionale',
      'Performance optimization',
      'Compatibilità cross-platform'
    ]
  },
  {
    id: 'deployment',
    label: 'Lancio',
    title: 'Deploy & Support',
    description: 'Deploy su infrastruttura sicura e scalabile. Configuriamo monitoring 24/7, backup automatici, disaster recovery. Il supporto post-lancio include manutenzione, aggiornamenti di sicurezza e assistenza continua. Il tuo successo è il nostro.',
    icon: 'fas fa-rocket',
    accentColor: '#e06666',
    duration: 'Ongoing',
    highlights: [
      'Deploy zero-downtime',
      'Monitoring e alerting 24/7',
      'Backup automatici giornalieri',
      'Supporto e manutenzione continua'
    ]
  }
];

onMounted(async () => {
  // Carica GSAP
  const gsapModules = await loadGSAP();
  if (gsapModules) {
    gsap = gsapModules.gsap;
  }

  // Setup scroll handler
  if (sectionRef.value) {
    sectionRef.value.addEventListener('wheel', handleWheel, { passive: false });
  }

  // Inizializza primo step
  initializeSteps();
});

onBeforeUnmount(() => {
  if (sectionRef.value) {
    sectionRef.value.removeEventListener('wheel', handleWheel);
  }
  if (currentStepTimeline) {
    currentStepTimeline.kill();
  }
});

/**
 * Inizializza la visualizzazione degli step
 */
const initializeSteps = () => {
  if (!contentRef.value || !gsap) return;

  // Nascondi tutti gli step tranne il primo
  const stepElements = contentRef.value.querySelectorAll('.kiba-process-step');
  stepElements.forEach((el, index) => {
    if (index !== 0) {
      gsap.set(el, {
        opacity: 0,
        y: 30,
        display: 'none'
      });
    } else {
      gsap.set(el, {
        opacity: 1,
        y: 0,
        display: 'block'
      });
    }
  });
};

/**
 * Gestisce lo scroll per cambiare step
 */
const handleWheel = (e) => {
  if (isAnimating) {
    e.preventDefault();
    return;
  }

  const isScrollingDown = e.deltaY > 0;
  const isScrollingUp = e.deltaY < 0;

  if (isScrollingDown) {
    if (activeStepIndex.value < steps.length - 1) {
      e.preventDefault();
      changeStep(activeStepIndex.value + 1);
    } else {
      // Ultimo step raggiunto, permetti scroll alla sezione successiva
      canProceed = true;
    }
  } else if (isScrollingUp) {
    if (activeStepIndex.value > 0) {
      e.preventDefault();
      changeStep(activeStepIndex.value - 1);
    } else {
      // Primo step, permetti scroll alla sezione precedente
      canProceed = true;
    }
  }
};

/**
 * Cambia step con animazione GSAP
 */
const changeStep = (newIndex) => {
  if (!gsap || isAnimating || newIndex === activeStepIndex.value) return;

  isAnimating = true;
  const oldIndex = activeStepIndex.value;

  // Kill timeline precedente se esiste
  if (currentStepTimeline) {
    currentStepTimeline.kill();
  }

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    }
  });

  const stepElements = contentRef.value.querySelectorAll('.kiba-process-step');
  const oldStep = stepElements[oldIndex];
  const newStep = stepElements[newIndex];

  // Animazione uscita step corrente
  tl.to(oldStep, {
    opacity: 0,
    y: newIndex > oldIndex ? -30 : 30,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: () => {
      gsap.set(oldStep, { display: 'none' });
    }
  });

  // Animazione contatore
  tl.to(counterRef.value, {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  }, '-=0.3');

  // Update contatore
  tl.call(() => {
    activeStepIndex.value = newIndex;
  });

  // Animazione nuovo contatore
  tl.to(counterRef.value, {
    scale: 1,
    opacity: 1,
    duration: 0.3,
    ease: 'back.out(1.4)'
  });

  // Animazione title contatore
  tl.fromTo(counterTitleRef.value,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
    '-=0.2'
  );

  // Prepara e anima entrata nuovo step
  tl.set(newStep, { display: 'block', opacity: 0, y: newIndex > oldIndex ? 30 : -30 });
  tl.to(newStep, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3');

  // Anima elementi interni del nuovo step
  const highlights = newStep.querySelectorAll('.kiba-process-highlight');
  if (highlights.length > 0) {
    tl.fromTo(highlights,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      },
      '-=0.2'
    );
  }

  currentStepTimeline = tl;
};
</script>

<style scoped>
.kiba-process-spa {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.container-fluid {
  padding: 0 60px;
}

/* Contatore Sinistra */
.kiba-process-counter {
  text-align: center;
  padding: 40px;
}

.kiba-process-counter-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--kiba-text-muted, #888);
  margin-bottom: 16px;
}

.kiba-process-counter-number {
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
  font-variant-numeric: tabular-nums;
}

.kiba-process-counter-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 24px;
}

.kiba-process-counter-progress {
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin: 0 auto 20px;
  overflow: hidden;
}

.kiba-process-counter-progress-fill {
  height: 100%;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.kiba-process-counter-nav {
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  font-weight: 500;
}

.kiba-process-counter-nav .current {
  color: var(--kiba-primary, #c94c4c);
  font-weight: 700;
}

.kiba-process-counter-nav .separator {
  margin: 0 8px;
}

/* Contenuto Destra */
.kiba-process-content {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
}

.kiba-process-step {
  position: absolute;
  width: 100%;
  padding-right: 60px;
}

.kiba-process-step-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.8;
}

.kiba-process-step-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--kiba-text-muted, #888);
  margin-bottom: 12px;
}

.kiba-process-step-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 20px;
  line-height: 1.2;
}

.kiba-process-step-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin-bottom: 32px;
}

.kiba-process-step-highlights {
  margin-bottom: 32px;
}

.kiba-process-highlight {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.kiba-process-highlight i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 1rem;
  margin-top: 4px;
  flex-shrink: 0;
}

.kiba-process-highlight span {
  font-size: 0.9375rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.5;
}

.kiba-process-step-duration {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(201, 76, 76, 0.1);
  border-radius: 30px;
  font-size: 0.875rem;
  color: var(--kiba-primary, #c94c4c);
  font-weight: 500;
}

.kiba-process-step-duration i {
  font-size: 0.875rem;
}

/* Scroll Hint */
.kiba-process-scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--kiba-text-muted, #888);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: bounceHint 2s infinite;
}

@keyframes bounceHint {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(-50%) translateY(5px);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 991px) {
  .container-fluid {
    padding: 0 30px;
  }

  .kiba-process-counter-number {
    font-size: 4rem;
  }

  .kiba-process-counter-title {
    font-size: 1.25rem;
  }

  .kiba-process-step-title {
    font-size: 2rem;
  }

  .kiba-process-step-description {
    font-size: 1rem;
  }
}

@media (max-width: 767px) {
  .kiba-process-counter {
    padding: 20px;
  }

  .kiba-process-counter-number {
    font-size: 3rem;
  }

  .kiba-process-counter-title {
    font-size: 1rem;
  }

  .kiba-process-counter-progress {
    width: 150px;
  }

  .kiba-process-step {
    padding-right: 20px;
  }

  .kiba-process-step-icon {
    font-size: 2rem;
  }

  .kiba-process-step-title {
    font-size: 1.5rem;
  }

  .kiba-process-step-description {
    font-size: 0.9375rem;
  }

  .kiba-process-step-highlights {
    display: none; /* Nascondi su mobile per spazio */
  }
}
</style>