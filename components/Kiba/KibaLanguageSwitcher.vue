<template>
  <div class="language-switcher-overlay">
    <!-- Main floating button -->
    <button
      class="lang-floating-btn"
      @click="toggleMenu"
      :aria-label="'Current language: ' + currentLocale.toUpperCase()"
      :aria-expanded="isMenuOpen"
    >
      <i class="fas fa-globe"></i>
      <span class="lang-code">{{ currentLocale.toUpperCase() }}</span>
    </button>

    <!-- Language options (shown on click) -->
    <transition name="lang-menu">
      <div v-if="isMenuOpen" class="lang-menu">
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          :class="['lang-option', { active: currentLocale === locale.code }]"
          :aria-label="`Switch to ${locale.name}`"
        >
          <span class="lang-flag">{{ getFlagEmoji(locale.code) }}</span>
          <span class="lang-name">{{ locale.name }}</span>
        </button>
      </div>
    </transition>

    <!-- Backdrop to close menu -->
    <div
      v-if="isMenuOpen"
      class="lang-backdrop"
      @click="closeMenu"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const { $i18n } = useNuxtApp();

const locale = computed(() => $i18n.locale.value);
const locales = computed(() => $i18n.locales.value);

const isMenuOpen = ref(false);

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => locales.value);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const switchLanguage = async (code) => {
  await $i18n.setLocale(code);
  closeMenu();
};

const getFlagEmoji = (code) => {
  const flags = {
    'it': '🇮🇹',
    'en': '🇬🇧'
  };
  return flags[code] || '🌍';
};
</script>

<style scoped>
/* Floating button fixed in bottom-left */
.language-switcher-overlay {
  position: fixed;
  bottom: 24px;
  left: 100px;
  z-index: 9999;
}

.lang-floating-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--kiba-bg-surface, #2d2d2d);
  border: 2px solid var(--kiba-primary, #c94c4c);
  border-radius: 50px;
  color: var(--kiba-text-main, #e8e8e8);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  font-family: 'Poppins', sans-serif;
}

.lang-floating-btn:hover {
  background: var(--kiba-primary, #c94c4c);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(201, 76, 76, 0.5);
}

.lang-floating-btn i {
  font-size: 1.125rem;
}

.lang-code {
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

/* Language menu */
.lang-menu {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 0;
  background: var(--kiba-bg-surface, #2d2d2d);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 180px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-family: 'Poppins', sans-serif;
}

.lang-option:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--kiba-text-main, #e8e8e8);
}

.lang-option.active {
  background: rgba(201, 76, 76, 0.15);
  color: var(--kiba-primary, #c94c4c);
  font-weight: 600;
}

.lang-flag {
  font-size: 1.25rem;
}

.lang-name {
  flex: 1;
}

/* Backdrop */
.lang-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: -1;
}

/* Transitions */
.lang-menu-enter-active,
.lang-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.lang-menu-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.lang-menu-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* Responsive */
@media (max-width: 767px) {
  .language-switcher-overlay {
    bottom: 16px;
    left: 16px;
  }

  .lang-floating-btn {
    padding: 0.625rem 0.875rem;
    font-size: 0.8125rem;
  }

  .lang-menu {
    min-width: 160px;
  }
}
</style>
