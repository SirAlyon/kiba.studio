<template>
  <!--
    KibaSPA.vue
    Componente principale Single Page Application
    Scroll naturale con animazioni GSAP ScrollTrigger
  -->
  <div class="kiba-spa-wrapper">
    <!-- Loader -->
    <KibaLoaderGSAP v-if="!isLoaded" @complete="onLoaderComplete" />

    <!-- Side Navigation - Desktop -->
    <KibaSideNav
      :current-section="currentSectionIndex"
      @navigate="handleNavigation"
    />

    <!-- Mobile Navigation -->
    <KibaMobileNav
      :current-section="currentSectionIndex"
      @navigate="handleNavigation"
    />

    <!-- Main Content Container -->
    <main class="kiba-spa-container" ref="containerRef">
      <!-- Section 1: Hero -->
      <section id="hero" class="kiba-spa-section">
        <KibaSPAHero ref="heroRef" @navigate="handleNavigation" />
      </section>

      <!-- Section 2: Manifesto -->
      <section id="manifesto" class="kiba-spa-section">
        <KibaSPAManifesto />
      </section>

      <!-- Section 3: Servizi -->
      <section id="servizi" class="kiba-spa-section">
        <KibaSPAServices />
      </section>

      <!-- Section 4: Processo -->
      <section id="processo" class="kiba-spa-section">
        <KibaSPAProcess @navigate="handleNavigation" />
      </section>

      <!-- Section 5: Stack -->
      <section id="stack" class="kiba-spa-section">
        <KibaSPAStack />
      </section>

      <!-- Section 6: Portfolio -->
      <section id="portfolio" class="kiba-spa-section">
        <KibaSPAPortfolio />
      </section>

      <!-- Section 7: Contatti -->
      <section id="contatti" class="kiba-spa-section">
        <KibaSPAContact />
      </section>

      <!-- Section 8: Footer -->
      <section id="footer" class="kiba-spa-section kiba-spa-section--footer">
        <KibaSPAFooter />
      </section>
    </main>

    <!-- Back to Top -->
    <button
      v-show="showBackToTop"
      class="kiba-back-to-top"
      @click="scrollToTop"
      aria-label="Torna in alto"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useGSAP } from '@/composables/useGSAP';

// Componenti
import KibaLoaderGSAP from './KibaLoaderGSAP.vue';
import KibaSideNav from './KibaSideNav.vue';
import KibaMobileNav from './KibaMobileNav.vue';
import KibaSPAHero from './KibaSPAHero.vue';
import KibaSPAManifesto from './KibaSPAManifesto.vue';
import KibaSPAServices from './KibaSPAServices.vue';
import KibaSPAProcess from './KibaSPAProcess.vue';
import KibaSPAStack from './KibaSPAStack.vue';
import KibaSPAPortfolio from './KibaSPAPortfolio.vue';
import KibaSPAContact from './KibaSPAContact.vue';
import KibaSPAFooter from './KibaSPAFooter.vue';

// Refs
const containerRef = ref(null);
const heroRef = ref(null);
const isLoaded = ref(false);
const currentSectionIndex = ref(0);
const showBackToTop = ref(false);

// GSAP composable
const { loadGSAP } = useGSAP();

// Sezioni IDs
const sectionIds = [
  'hero',
  'manifesto',
  'servizi',
  'processo',
  'stack',
  'portfolio',
  'contatti',
  'footer'
];

let gsap = null;
let ScrollTrigger = null;

onMounted(async () => {
  // Carica GSAP
  const gsapModules = await loadGSAP();
  if (gsapModules) {
    gsap = gsapModules.gsap;
    ScrollTrigger = gsapModules.ScrollTrigger;
  }

  // Setup scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
});

/**
 * Loader completato - inizializza animazioni
 */
const onLoaderComplete = async () => {
  isLoaded.value = true;
  await nextTick();

  if (gsap && ScrollTrigger) {
    initAnimations();
  }
};

/**
 * Inizializza tutte le animazioni GSAP con ScrollTrigger
 */
const initAnimations = () => {
  // Animazione Hero (immediata al caricamento)
  animateHero();

  // Animazioni per le altre sezioni (al scroll)
  sectionIds.forEach((id, index) => {
    if (id === 'hero') return; // Hero già animata

    const section = document.querySelector(`#${id}`);
    if (!section) return;

    const elements = section.querySelectorAll('.gsap-animate');
    if (elements.length === 0) return;

    // Animazione fade-in + slide-up quando la sezione entra in view
    gsap.fromTo(
      elements,
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
          onEnter: () => {
            currentSectionIndex.value = index;
          }
        }
      }
    );

    // ScrollTrigger per aggiornare l'indice della sezione corrente
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        currentSectionIndex.value = index;
      },
      onEnterBack: () => {
        currentSectionIndex.value = index;
      }
    });
  });
};

/**
 * Animazione Hero al caricamento
 */
const animateHero = () => {
  const heroSection = document.querySelector('#hero');
  if (!heroSection) return;

  const elements = heroSection.querySelectorAll('.gsap-animate');
  if (elements.length === 0) return;

  gsap.fromTo(
    elements,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.2
    }
  );
};

/**
 * Navigazione smooth scroll
 */
const handleNavigation = ({ sectionId }) => {
  const section = document.querySelector(`#${sectionId}`);
  if (!section) return;

  const offsetTop = section.offsetTop - (window.innerWidth <= 767 ? 60 : 0);

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
};

/**
 * Gestisce scroll per back-to-top e sezione corrente
 */
const handleScroll = () => {
  showBackToTop.value = window.scrollY > window.innerHeight * 0.5;
};

/**
 * Torna in alto
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  currentSectionIndex.value = 0;
};
</script>

<style scoped>
.kiba-spa-wrapper {
  background: var(--kiba-bg-dark, #1a1a1a);
}

.kiba-spa-container {
  margin-left: 70px;
}

.kiba-spa-section {
  position: relative;
  padding: 60px 20px;
}

/* Hero centrata verticalmente */
.kiba-spa-section#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Alternanza colori sfondo */
.kiba-spa-section:nth-child(odd) {
  background: var(--kiba-bg-dark, #1a1a1a);
}

.kiba-spa-section:nth-child(even) {
  background: var(--kiba-bg-surface, #2d2d2d);
}

/* Footer senza min-height */
.kiba-spa-section--footer {
  min-height: auto;
}

/* Elementi GSAP nascosti inizialmente solo nella Hero */
.kiba-spa-section#hero :deep(.gsap-animate) {
  opacity: 0;
}

/* Back to Top Button */
.kiba-back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(201, 76, 76, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.kiba-back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(201, 76, 76, 0.5);
}

/* Responsive - Tablet */
@media (max-width: 991px) {
  .kiba-spa-container {
    margin-left: 60px;
  }

  .kiba-spa-section {
    padding: 50px 20px;
  }
}

/* Responsive - Mobile */
@media (max-width: 767px) {
  .kiba-spa-container {
    margin-left: 0;
    padding-top: 60px;
  }

  .kiba-spa-section {
    padding: 40px 16px;
  }

  .kiba-spa-section#hero {
    min-height: calc(100vh - 60px);
  }

  .kiba-back-to-top {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
}
</style>
