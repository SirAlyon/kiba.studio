<template>
  <!--
    KibaMobileNav.vue
    Navbar mobile con logo sempre visibile e menu overlay
  -->
  <div class="kiba-mobile-nav">
    <!-- Header mobile fisso -->
    <div class="kiba-mobile-header">
      <!-- Logo -->
      <div class="kiba-mobile-logo">
        <KibaIcon :size="28" variant="default" :animated="false" />
        <span class="kiba-mobile-brand">Kiba.Studio</span>
      </div>

      <!-- Menu toggle -->
      <button
        class="kiba-mobile-menu-toggle"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle menu"
      >
        <span class="kiba-menu-bar"></span>
        <span class="kiba-menu-bar"></span>
        <span class="kiba-menu-bar"></span>
      </button>
    </div>

    <!-- Menu overlay -->
    <transition name="menu-slide">
      <div v-if="isMenuOpen" class="kiba-mobile-overlay">
        <div class="kiba-mobile-menu">
          <!-- Close button -->
          <button
            class="kiba-mobile-close"
            @click="closeMenu"
            aria-label="Close menu"
          >
            <i class="fas fa-times"></i>
          </button>

          <!-- Menu items -->
          <nav class="kiba-mobile-menu-items">
            <button
              v-for="(section, index) in sections"
              :key="section.id"
              class="kiba-mobile-menu-item"
              :class="{ active: currentSection === index }"
              @click="navigateToSection(index, section.id)"
            >
              <span class="kiba-mobile-menu-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="kiba-mobile-menu-label">
                {{ section.label }}
              </span>
            </button>
          </nav>

          <!-- Footer info in menu -->
          <div class="kiba-mobile-menu-footer">
            <p class="kiba-mobile-tagline">Software etico e sicuro</p>
            <div class="kiba-mobile-contact">
              <a href="mailto:info@kiba.studio">info@kiba.studio</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import KibaIcon from './KibaIcon.vue';

const props = defineProps({
  currentSection: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['navigate']);

const isMenuOpen = ref(false);

const sections = ref([
  { id: 'hero', label: 'Home' },
  { id: 'manifesto', label: 'Chi Siamo' },
  { id: 'servizi', label: 'Servizi' },
  { id: 'processo', label: 'Processo' },
  { id: 'stack', label: 'Stack' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contatti', label: 'Contatti' }
]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Blocca scroll body quando menu è aperto
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const navigateToSection = (index, sectionId) => {
  emit('navigate', { index, sectionId });
  closeMenu();
};

// Chiudi menu su resize se diventa desktop
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth > 767 && isMenuOpen.value) {
      closeMenu();
    }
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.kiba-mobile-nav {
  display: none;
}

@media (max-width: 767px) {
  .kiba-mobile-nav {
    display: block;
  }

  .kiba-mobile-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 1001;
  }

  .kiba-mobile-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .kiba-mobile-brand {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--kiba-text-main, #f0f0f0);
  }

  /* Menu Toggle Button */
  .kiba-mobile-menu-toggle {
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .kiba-menu-bar {
    width: 24px;
    height: 2px;
    background: var(--kiba-text-main, #f0f0f0);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .kiba-mobile-menu-toggle:active .kiba-menu-bar {
    background: var(--kiba-primary, #c94c4c);
  }

  /* Menu Overlay */
  .kiba-mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1002;
  }

  .kiba-mobile-menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 320px;
    height: 100%;
    background: var(--kiba-bg-surface, #2d2d2d);
    padding: 30px;
    overflow-y: auto;
  }

  .kiba-mobile-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    color: var(--kiba-text-main, #f0f0f0);
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  .kiba-mobile-close:active {
    color: var(--kiba-primary, #c94c4c);
  }

  .kiba-mobile-menu-items {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .kiba-mobile-menu-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: var(--kiba-text-secondary, #b0b0b0);
    text-align: left;
    transition: all 0.3s ease;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .kiba-mobile-menu-item:active,
  .kiba-mobile-menu-item.active {
    background: rgba(201, 76, 76, 0.15);
    border-color: var(--kiba-primary, #c94c4c);
    color: var(--kiba-text-main, #f0f0f0);
  }

  .kiba-mobile-menu-number {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--kiba-primary, #c94c4c);
  }

  .kiba-mobile-menu-label {
    font-size: 1rem;
    font-weight: 500;
  }

  .kiba-mobile-menu-footer {
    position: absolute;
    bottom: 30px;
    left: 30px;
    right: 30px;
  }

  .kiba-mobile-tagline {
    font-size: 0.875rem;
    color: var(--kiba-text-muted, #888);
    margin-bottom: 12px;
  }

  .kiba-mobile-contact a {
    color: var(--kiba-primary, #c94c4c);
    text-decoration: none;
    font-size: 0.875rem;
  }

  /* Transitions */
  .menu-slide-enter-active,
  .menu-slide-leave-active {
    transition: opacity 0.3s ease;
  }

  .menu-slide-enter-active .kiba-mobile-menu,
  .menu-slide-leave-active .kiba-mobile-menu {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-slide-enter-from {
    opacity: 0;
  }

  .menu-slide-enter-from .kiba-mobile-menu {
    transform: translateX(100%);
  }

  .menu-slide-leave-to {
    opacity: 0;
  }

  .menu-slide-leave-to .kiba-mobile-menu {
    transform: translateX(100%);
  }
}
</style>