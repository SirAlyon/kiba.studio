<template>
  <!--
    KibaNavbar.vue
    Navbar personalizzata per Kiba.Studio
    Logo brandizzato + navigazione semplice
  -->
  <nav
    ref="navbarRef"
    class="navbar navbar-expand-lg kiba-navbar"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container">
      <!-- Logo -->
      <a href="#" class="kiba-logo">
        Kiba<span>.</span>Studio
      </a>

      <!-- Mobile Toggle -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Menu -->
      <div
        class="collapse navbar-collapse"
        :class="{ show: isMenuOpen }"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#chi-siamo" @click="closeMenu">
              {{ $t('nav.about') }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#servizi" @click="closeMenu">
              {{ $t('nav.services') }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#processo" @click="closeMenu">
              {{ $t('nav.process') }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#tecnologie" @click="closeMenu">
              {{ $t('nav.stack') }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#portfolio" @click="closeMenu">
              {{ $t('nav.portfolio') }}
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link kiba-nav-cta"
              href="#contatti"
              @click="closeMenu"
            >
              {{ $t('nav.contact') }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const navbarRef = ref(null);
const isScrolled = ref(false);
const isMenuOpen = ref(false);

// Gestione scroll per effetto navbar
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Toggle menu mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Chiudi menu quando si clicca su un link
const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.kiba-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: var(--kiba-transition);
}

.kiba-navbar.navbar-scrolled {
  padding: 12px 0;
  box-shadow: var(--kiba-shadow-md);
}

.kiba-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--kiba-text-main);
  text-decoration: none;
  transition: var(--kiba-transition);
}

.kiba-logo:hover {
  color: var(--kiba-text-main);
}

.kiba-logo span {
  color: var(--kiba-primary);
}

.navbar-toggler {
  border: none;
  background: none;
  color: var(--kiba-text-main);
  font-size: 1.25rem;
  padding: 8px;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.navbar-nav {
  gap: 8px;
}

.nav-link {
  color: var(--kiba-text-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
  padding: 8px 16px !important;
  transition: var(--kiba-transition);
  border-radius: var(--kiba-radius-sm);
}

.nav-link:hover,
.nav-link:focus {
  color: var(--kiba-text-main);
  background: rgba(255, 255, 255, 0.05);
}

.kiba-nav-cta {
  background: var(--kiba-primary) !important;
  color: #ffffff !important;
  border-radius: var(--kiba-radius-md);
}

.kiba-nav-cta:hover {
  background: var(--kiba-primary-hover) !important;
  color: #ffffff !important;
}

@media (max-width: 991px) {
  .navbar-collapse {
    background: var(--kiba-bg-surface);
    padding: 20px;
    border-radius: var(--kiba-radius-md);
    margin-top: 15px;
    box-shadow: var(--kiba-shadow-lg);
  }

  .navbar-nav {
    gap: 4px;
  }

  .nav-link {
    padding: 12px 16px !important;
  }
}
</style>
