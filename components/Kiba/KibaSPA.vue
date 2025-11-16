<template>
  <!--
    KibaSPA.vue
    Componente principale Single Page Application
    Gestisce scroll a blocchi, GSAP, Three.js e tutte le sezioni
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
      <section id="footer" class="kiba-spa-section">
        <KibaSPAFooter />
      </section>
    </main>

    <!-- Back to Top (uniformato) -->
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

// Track animated sections to prevent re-animation
const animatedSections = new Set();

let gsap = null;
let ScrollTrigger = null;

onMounted(async () => {
  // Carica GSAP
  const gsapModules = await loadGSAP();
  if (gsapModules) {
    gsap = gsapModules.gsap;
    ScrollTrigger = gsapModules.ScrollTrigger;

    // Carica plugin ScrollTo
    const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
    gsap.registerPlugin(ScrollToPlugin);
  }

  // Setup scroll listener on container
  await nextTick();
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll, { passive: true });
  }
});

onBeforeUnmount(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll);
  }
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
});

/**
 * Loader completato
 */
const onLoaderComplete = async () => {
  isLoaded.value = true;

  await nextTick();

  // Inizializza GSAP triggers per le sezioni
  if (ScrollTrigger) {
    initScrollTriggers();
  }

  // Anima hero con timeline consolidata
  if (gsap) {
    animateHeroOnLoad();
  }
};

/**
 * Animazione hero consolidata - una sola timeline pulita
 */
const animateHeroOnLoad = () => {
  const heroSection = document.querySelector('#hero');
  if (!heroSection) return;

  const elements = heroSection.querySelectorAll('.gsap-animate');
  if (elements.length === 0) return;

  // Marca la hero come già animata
  animatedSections.add('hero');

  // Timeline unica per hero
  const tl = gsap.timeline();

  tl.fromTo(
    elements,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'transform'
    }
  );
};

/**
 * Inizializza ScrollTrigger per ogni sezione
 */
const initScrollTriggers = () => {
  sectionIds.forEach((id, index) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        currentSectionIndex.value = index;
        animateSectionContent(id);
      },
      onEnterBack: () => {
        currentSectionIndex.value = index;
      }
    });
  });
};

/**
 * Anima contenuto sezione quando entra in view
 * Evita re-animazione di sezioni già animate
 */
const animateSectionContent = (sectionId) => {
  if (!gsap) return;

  // Skip se già animata
  if (animatedSections.has(sectionId)) return;

  const section = document.querySelector(`#${sectionId}`);
  if (!section) return;

  const elements = section.querySelectorAll('.gsap-animate');
  if (elements.length === 0) return;

  // Marca come animata
  animatedSections.add(sectionId);

  // Per le sezioni post-hero, animiamo da una posizione leggermente spostata
  // ma con opacity già a 1, poiché sono già visibili
  gsap.from(
    elements,
    {
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    }
  );
};

/**
 * Gestisce navigazione da sidebar e child components
 */
const handleNavigation = ({ index, sectionId }) => {
  if (!containerRef.value) return;

  const section = document.querySelector(`#${sectionId}`);
  if (!section) return;

  if (!gsap) {
    // Fallback senza GSAP
    section.scrollIntoView({ behavior: 'smooth' });
    currentSectionIndex.value = index;
    return;
  }

  // Scroll del container, non della window
  gsap.to(containerRef.value, {
    duration: 1,
    scrollTo: { y: section, offsetY: 0 },
    ease: 'power3.inOut'
  });

  currentSectionIndex.value = index;
};

/**
 * Gestisce scroll per back-to-top e indicatore sezione
 */
const handleScroll = () => {
  if (!containerRef.value) return;

  const scrollY = containerRef.value.scrollTop;
  showBackToTop.value = scrollY > window.innerHeight * 0.5;

  // Aggiorna sezione corrente basata su scroll position
  const viewportHeight = window.innerHeight;
  const newIndex = Math.round(scrollY / viewportHeight);
  if (newIndex !== currentSectionIndex.value && newIndex < sectionIds.length) {
    currentSectionIndex.value = newIndex;
  }
};

/**
 * Torna in alto
 */
const scrollToTop = () => {
  if (!containerRef.value) return;

  if (gsap) {
    gsap.to(containerRef.value, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power3.inOut'
    });
  } else {
    containerRef.value.scrollTo({ top: 0, behavior: 'smooth' });
  }
  currentSectionIndex.value = 0;
};
</script>

<style scoped>
.kiba-spa-wrapper {
  background: var(--kiba-bg-dark, #1a1a1a);
  min-height: 100vh;
}

.kiba-spa-container {
  margin-left: 70px; /* Spazio per navbar laterale */
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
  scroll-behavior: smooth;
}

.kiba-spa-section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Alternanza colori sfondo */
.kiba-spa-section:nth-child(odd) {
  background: var(--kiba-bg-dark, #1a1a1a);
}

.kiba-spa-section:nth-child(even) {
  background: var(--kiba-bg-surface, #2d2d2d);
}

/* GSAP animated elements - only hide hero initially to prevent flash */
.kiba-spa-section#hero :deep(.gsap-animate) {
  opacity: 0;
}

/* Back to Top Button - Uniformato */
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
  opacity: 0;
  transform: translateY(20px);
  animation: kibaFadeInUp 0.5s forwards;
}

.kiba-back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(201, 76, 76, 0.5);
}

.kiba-back-to-top:active {
  transform: translateY(-2px);
}

@keyframes kibaFadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 991px) {
  .kiba-spa-container {
    margin-left: 60px;
  }
}

@media (max-width: 767px) {
  .kiba-spa-container {
    margin-left: 0;
    padding-top: 60px; /* Spazio per header mobile */
  }

  .kiba-back-to-top {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
}
</style>
