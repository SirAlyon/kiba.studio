<template>
  <header class="kiba-page-nav" :class="{ 'is-scrolled': isScrolled }">
    <div class="kiba-page-nav-inner">
      <NuxtLink to="/" class="kiba-page-nav-brand" :aria-label="$t('page_nav.home_aria')">
        <KibaIcon :size="36" variant="default" :animated="false" />
        <span class="kiba-page-nav-name">Kiba.Studio</span>
      </NuxtLink>

      <nav class="kiba-page-nav-links" :aria-label="$t('page_nav.primary_label')">
        <NuxtLink to="/servizi" class="kiba-page-nav-link" active-class="is-active">{{ $t('page_nav.services') }}</NuxtLink>
        <NuxtLink to="/case-study" class="kiba-page-nav-link" active-class="is-active">{{ $t('page_nav.case_study') }}</NuxtLink>
        <NuxtLink to="/about" class="kiba-page-nav-link" active-class="is-active">{{ $t('page_nav.about') }}</NuxtLink>
      </nav>

      <div class="kiba-page-nav-cta">
        <NuxtLink to="/contatti" class="kiba-page-nav-btn">
          {{ $t('page_nav.cta') }}
          <i class="fas fa-arrow-right"></i>
        </NuxtLink>
      </div>

      <button
        class="kiba-page-nav-toggle"
        :aria-expanded="mobileOpen"
        aria-controls="kiba-page-nav-mobile"
        :aria-label="$t('page_nav.open_menu')"
        @click="mobileOpen = !mobileOpen"
      >
        <i :class="mobileOpen ? 'fas fa-xmark' : 'fas fa-bars'"></i>
      </button>
    </div>

    <div
      v-show="mobileOpen"
      id="kiba-page-nav-mobile"
      class="kiba-page-nav-mobile"
    >
      <NuxtLink to="/servizi" class="kiba-page-nav-mobile-link" @click="mobileOpen = false">{{ $t('page_nav.services') }}</NuxtLink>
      <NuxtLink to="/case-study" class="kiba-page-nav-mobile-link" @click="mobileOpen = false">{{ $t('page_nav.case_study') }}</NuxtLink>
      <NuxtLink to="/about" class="kiba-page-nav-mobile-link" @click="mobileOpen = false">{{ $t('page_nav.about') }}</NuxtLink>
      <NuxtLink to="/contatti" class="kiba-page-nav-mobile-link is-cta" @click="mobileOpen = false">
        {{ $t('page_nav.cta') }}
        <i class="fas fa-arrow-right ms-2"></i>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import KibaIcon from './KibaIcon.vue';

const isScrolled = ref(false);
const mobileOpen = ref(false);

const onScroll = () => {
  isScrolled.value = window.scrollY > 8;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.kiba-page-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: saturate(140%) blur(12px);
  -webkit-backdrop-filter: saturate(140%) blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.kiba-page-nav.is-scrolled {
  background: rgba(20, 20, 20, 0.92);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.kiba-page-nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.kiba-page-nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--kiba-text-main, #e8e8e8);
}

.kiba-page-nav-name {
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.kiba-page-nav-links {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.kiba-page-nav-link {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--kiba-text-secondary, #b0b0b0);
  transition: color 0.2s ease, background 0.2s ease;
}

.kiba-page-nav-link:hover {
  color: var(--kiba-text-main, #e8e8e8);
  background: rgba(255, 255, 255, 0.04);
}

.kiba-page-nav-link.is-active {
  color: var(--kiba-primary, #c94c4c);
}

.kiba-page-nav-cta {
  display: flex;
  align-items: center;
}

.kiba-page-nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #fff;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.kiba-page-nav-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(201, 76, 76, 0.35);
}

.kiba-page-nav-toggle {
  display: none;
  background: transparent;
  border: none;
  color: var(--kiba-text-main, #e8e8e8);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 8px;
}

.kiba-page-nav-mobile {
  display: none;
  padding: 12px 24px 20px;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.kiba-page-nav-mobile-link {
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 1rem;
  text-decoration: none;
  color: var(--kiba-text-main, #e8e8e8);
}

.kiba-page-nav-mobile-link:hover {
  background: rgba(255, 255, 255, 0.04);
}

.kiba-page-nav-mobile-link.is-cta {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #fff;
  font-weight: 600;
  margin-top: 6px;
  text-align: center;
}

@media (max-width: 768px) {
  .kiba-page-nav-links,
  .kiba-page-nav-cta {
    display: none;
  }
  .kiba-page-nav-toggle {
    display: inline-flex;
    margin-left: auto;
  }
  .kiba-page-nav-mobile {
    display: flex;
  }
}
</style>
