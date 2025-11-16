<template>
  <!--
    KibaSideNav.vue
    Navbar verticale sinistra con glassmorphism
    Per SPA monopagina Kiba.Studio
  -->
  <nav class="kiba-sidenav">
    <!-- Logo - Akita Icon -->
    <div class="kiba-sidenav-logo" ref="logoRef">
      <KibaIcon :size="32" variant="default" :animated="true" />
    </div>

    <!-- Navigation Icons -->
    <div class="kiba-sidenav-links">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        class="kiba-sidenav-item"
        :class="{ active: currentSection === index }"
        @click="navigateTo(index, section.id)"
        :title="section.label"
      >
        <i :class="section.icon"></i>
        <span class="kiba-sidenav-tooltip">{{ section.label }}</span>
      </button>
    </div>

    <!-- Section indicator -->
    <div class="kiba-sidenav-indicator">
      <span>{{ currentSection + 1 }}</span>
      <span class="separator">/</span>
      <span>{{ sections.length }}</span>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import KibaIcon from './KibaIcon.vue';
import { useGSAP } from '@/composables/useGSAP';

const props = defineProps({
  currentSection: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['navigate']);

const sections = ref([
  { id: 'hero', label: 'Home', icon: 'fas fa-home' },
  { id: 'manifesto', label: 'Chi Siamo', icon: 'fas fa-shield-alt' },
  { id: 'servizi', label: 'Servizi', icon: 'fas fa-code' },
  { id: 'processo', label: 'Processo', icon: 'fas fa-project-diagram' },
  { id: 'stack', label: 'Stack', icon: 'fas fa-layer-group' },
  { id: 'portfolio', label: 'Portfolio', icon: 'fas fa-briefcase' },
  { id: 'contatti', label: 'Contatti', icon: 'fas fa-envelope' }
]);

const navigateTo = (index, sectionId) => {
  emit('navigate', { index, sectionId });
};

// Refs per animazione
const logoRef = ref(null);
const { loadGSAP } = useGSAP();

// Micro-animazione logo all'avvio
onMounted(async () => {
  const gsapModules = await loadGSAP();
  if (gsapModules && logoRef.value) {
    const { gsap } = gsapModules;

    // Micro-animazione elegante: rotazione e scale
    gsap.fromTo(logoRef.value,
      {
        scale: 0,
        rotation: -90,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.7)'
      }
    );
  }
});
</script>

<style scoped>
.kiba-sidenav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 70px;
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  z-index: 1000;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
}

/* Logo */
.kiba-sidenav-logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--kiba-text-main, #e8e8e8);
  display: flex;
  align-items: center;
}

.logo-k {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-dot {
  color: var(--kiba-primary, #c94c4c);
}

/* Navigation Items */
.kiba-sidenav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kiba-sidenav-item {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: var(--kiba-text-muted, #888888);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  /* Effetto neomorfico leggero */
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.3),
    inset -1px -1px 3px rgba(255, 255, 255, 0.05);
}

.kiba-sidenav-item:hover {
  background: rgba(201, 76, 76, 0.15);
  border-color: rgba(201, 76, 76, 0.3);
  color: var(--kiba-text-main, #e8e8e8);
  transform: translateX(3px);
}

.kiba-sidenav-item.active {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border-color: transparent;
  color: #ffffff;
  box-shadow:
    0 4px 15px rgba(201, 76, 76, 0.4),
    inset 0 0 0 rgba(0, 0, 0, 0);
}

.kiba-sidenav-item.active:hover {
  transform: translateX(3px) scale(1.05);
}

/* Tooltip */
.kiba-sidenav-tooltip {
  position: absolute;
  left: calc(100% + 12px);
  background: var(--kiba-bg-surface, #2d2d2d);
  color: var(--kiba-text-main, #e8e8e8);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.kiba-sidenav-tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: var(--kiba-bg-surface, #2d2d2d);
}

.kiba-sidenav-item:hover .kiba-sidenav-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

/* Section Indicator */
.kiba-sidenav-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: var(--kiba-text-muted, #888888);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.kiba-sidenav-indicator .separator {
  color: var(--kiba-primary, #c94c4c);
  margin: 2px 0;
}

/* Responsive */
@media (max-width: 991px) {
  .kiba-sidenav {
    width: 60px;
    padding: 16px 0;
  }

  .kiba-sidenav-item {
    width: 40px;
    height: 40px;
    font-size: 0.875rem;
  }

  .kiba-sidenav-logo {
    font-size: 1.25rem;
  }
}

@media (max-width: 767px) {
  .kiba-sidenav {
    display: none;
  }
}
</style>
