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
        <div class="kiba-section-label gsap-animate">{{ $t('portfolio.label') }}</div>
        <h2 class="kiba-section-title gsap-animate">
          {{ $t('portfolio.title') }}<br />
          <span class="kiba-text-gradient">{{ $t('portfolio.subtitle') }}</span>
        </h2>
        <p class="kiba-section-subtitle gsap-animate">
          {{ $t('portfolio.privacy_note') }}
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

          <!-- Status badge -->
          <span
            v-if="project.status"
            class="kiba-portfolio-card-status"
            :class="`is-${project.status.tone}`"
          >
            <span class="status-dot"></span>{{ project.status.label }}
          </span>

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
            <span>{{ $t('portfolio.discover_more') }}</span>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <!-- Privacy note -->
      <div class="kiba-portfolio-note gsap-animate">
        <i class="fas fa-shield-alt"></i>
        <p v-html="$t('portfolio.privacy_note')"></p>
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
import { ref, computed } from 'vue';
import KibaProjectModal from './KibaProjectModal.vue';

// Stesso pattern i18n usato nelle altre pagine (useI18n auto-importato da Nuxt).
const { t, tm, rt } = useI18n();

const isModalOpen = ref(false);
const selectedProject = ref(null);

// Metadati dei progetti reali. I testi vivono in i18n (portfolio.projects.<key>),
// così il portfolio funziona sia in italiano che in inglese.
const projectMeta = [
  { key: 'autoimporta', icon: 'fas fa-arrows-rotate', tone: 'live', isClient: true },
  { key: 'finance', icon: 'fas fa-chart-pie', tone: 'dev', isClient: false },
  { key: 'fetch', icon: 'fas fa-magnifying-glass-chart', tone: 'early', isClient: false },
  { key: 'invoicing', icon: 'fas fa-file-invoice', tone: 'live', isClient: true },
  { key: 'arkvel', icon: 'fas fa-hand-holding-heart', tone: 'early', isClient: false }
];

const toList = (key) => {
  const raw = tm(key);
  return Array.isArray(raw) ? raw : [];
};

const projects = computed(() =>
  projectMeta.map((m) => {
    const base = `portfolio.projects.${m.key}`;
    const tech = toList(`${base}.technologies`).map((x) => rt(x));
    const challenges = toList(`${base}.challenges`).map((c) => ({
      title: rt(c.title),
      solution: rt(c.solution)
    }));
    const privacyFeatures = toList(`${base}.privacyFeatures`).map((x) => rt(x));
    return {
      id: m.key,
      icon: m.icon,
      isClient: m.isClient,
      status: { label: t(`${base}.status`), tone: m.tone },
      type: t(`${base}.type`),
      title: t(`${base}.title`),
      subtitle: t(`${base}.subtitle`),
      description: t(`${base}.description`),
      fullDescription: t(`${base}.fullDescription`),
      mainTech: tech.slice(0, 3),
      technologies: tech,
      challenges,
      privacyFeatures
    };
  })
);

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
  display: flex;
  align-items: flex-start;
  padding: 40px 0;
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
  line-height: 1.3;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
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

.kiba-portfolio-card-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 14px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--kiba-text-secondary, #b0b0b0);
  background: rgba(255, 255, 255, 0.03);
}

.kiba-portfolio-card-status .status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.kiba-portfolio-card-status.is-live {
  color: #4caf6e;
  border-color: rgba(76, 175, 110, 0.35);
  background: rgba(76, 175, 110, 0.1);
}

.kiba-portfolio-card-status.is-dev {
  color: #d6a04c;
  border-color: rgba(214, 160, 76, 0.35);
  background: rgba(214, 160, 76, 0.1);
}

.kiba-portfolio-card-status.is-early {
  color: #8a8fa3;
  border-color: rgba(138, 143, 163, 0.3);
  background: rgba(138, 143, 163, 0.1);
}

.kiba-portfolio-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--kiba-text-main, #f0f0f0);
  margin-bottom: 12px;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
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
  .kiba-portfolio-spa {
    padding: 60px 0 40px;
  }

  .kiba-section-title {
    font-size: 2.25rem;
  }

  .kiba-portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 767px) {
  .kiba-portfolio-spa {
    /* RESET mobile - no flexbox centering */
    display: block;
    height: auto;
    min-height: auto;
    padding: 30px 0;
  }

  .container {
    padding: 0 16px;
  }

  .kiba-section-title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .kiba-section-subtitle {
    font-size: 0.9375rem;
  }

  .kiba-portfolio-header {
    margin-bottom: 30px;
  }

  .kiba-portfolio-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .kiba-portfolio-card {
    padding: 20px;
  }

  .kiba-portfolio-card-header {
    margin-bottom: 16px;
  }

  .kiba-portfolio-card-icon {
    width: 36px;
    height: 36px;
  }

  .kiba-portfolio-card-title {
    font-size: 1.0625rem;
    line-height: 1.3;
  }

  .kiba-portfolio-card-description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .kiba-portfolio-card-tags {
    margin-bottom: 16px;
  }

  .kiba-portfolio-card-tag {
    font-size: 0.6875rem;
  }

  .kiba-portfolio-card-action {
    font-size: 0.8125rem;
  }

  .kiba-portfolio-note {
    padding: 16px;
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .kiba-portfolio-note i {
    font-size: 1.25rem;
  }

  .kiba-portfolio-note p {
    font-size: 0.875rem;
  }
}
</style>