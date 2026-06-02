<template>
  <div class="kiba-spa-wrapper">
    <KibaLoaderGSAP v-if="!isLoaded" @complete="onLoaderComplete" />

    <KibaSideNav
      :current-section="currentSectionIndex"
      @navigate="handleNavigation"
    />

    <KibaMobileNav
      :current-section="currentSectionIndex"
      @navigate="handleNavigation"
    />

    <main class="kiba-spa-container" ref="containerRef">
      <section id="hero" class="kiba-spa-section">
        <KibaSPAHero ref="heroRef" @navigate="handleNavigation" />
      </section>

      <section id="manifesto" class="kiba-spa-section">
        <KibaSPAManifesto />
      </section>

      <section id="servizi" class="kiba-spa-section">
        <KibaSPAServices />
      </section>

      <section id="processo" class="kiba-spa-section">
        <KibaSPAProcess @navigate="handleNavigation" />
      </section>

      <section id="stack" class="kiba-spa-section">
        <KibaSPAStack />
      </section>

      <section id="portfolio" class="kiba-spa-section">
        <KibaSPAPortfolio />
      </section>

      <section id="contatti" class="kiba-spa-section">
        <KibaSPAContact />
      </section>

      <section id="footer" class="kiba-spa-section kiba-spa-section--footer">
        <KibaSPAFooter />
      </section>
    </main>

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

const containerRef = ref(null);
const heroRef = ref(null);
const isLoaded = ref(false);
const currentSectionIndex = ref(0);
const showBackToTop = ref(false);

const { loadGSAP } = useGSAP();

// Le sezioni "trackable" dal sidenav. Footer escluso: quando il footer entra in vista
// `contatti` resta attivo (è la voce 7 del sidenav).
const trackedSectionIds = [
  'hero',
  'manifesto',
  'servizi',
  'processo',
  'stack',
  'portfolio',
  'contatti'
];

let gsap = null;
let ScrollTrigger = null;
let scrollTriggers = [];
// Quando l'utente clicca sulla nav, lo smooth scroll attraversa più sezioni:
// blocchiamo gli aggiornamenti del trigger per evitare che il bottone "salti"
// di sezione mentre lo scroll è in corso.
let navigationLockTimer = null;
let isNavigating = false;

onMounted(async () => {
  const gsapModules = await loadGSAP();
  if (gsapModules) {
    gsap = gsapModules.gsap;
    ScrollTrigger = gsapModules.ScrollTrigger;
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (navigationLockTimer) clearTimeout(navigationLockTimer);
  scrollTriggers.forEach((t) => t.kill());
  scrollTriggers = [];
});

const onLoaderComplete = async () => {
  // Garantiamo che GSAP sia pronto prima di rivelare la pagina: l'hero ha
  // .gsap-animate con opacity:0 hard via CSS, senza animazione resta invisibile.
  if (!gsap || !ScrollTrigger) {
    const gsapModules = await loadGSAP();
    if (gsapModules) {
      gsap = gsapModules.gsap;
      ScrollTrigger = gsapModules.ScrollTrigger;
    }
  }
  isLoaded.value = true;
  await nextTick();
  if (gsap && ScrollTrigger) {
    initAnimations();
    initSectionTracking();
  } else {
    // Fallback offline / GSAP CDN bloccato: forziamo la visibilit
    // così il sito resta leggibile anche senza animazioni.
    document.querySelectorAll('#hero .gsap-animate').forEach((el) => {
      el.style.opacity = '1';
    });
  }
};

const initAnimations = () => {
  animateHero();

  trackedSectionIds.forEach((id) => {
    if (id === 'hero') return;
    const section = document.querySelector(`#${id}`);
    if (!section) return;
    const elements = section.querySelectorAll('.gsap-animate');
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
};

/**
 * Tracking della sezione attiva per il sidenav.
 * Trigger separati dalle animazioni (più stabili e includono anche la hero,
 * altrimenti tornando indietro alla home l'indice resta sulla sezione precedente).
 *
 * Strategia: usiamo il punto medio del viewport. Una sezione è "attiva"
 * quando il suo bordo superiore passa il 50% del viewport, e resta attiva
 * finché il suo bordo inferiore non supera anch'esso il 50%.
 */
const initSectionTracking = () => {
  trackedSectionIds.forEach((id, index) => {
    const section = document.querySelector(`#${id}`);
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setActiveIndex(index),
      onEnterBack: () => setActiveIndex(index)
    });
    scrollTriggers.push(trigger);
  });
};

const setActiveIndex = (index) => {
  if (isNavigating) return;
  currentSectionIndex.value = index;
};

const animateHero = () => {
  const heroSection = document.querySelector('#hero');
  if (!heroSection) return;
  const elements = heroSection.querySelectorAll('.gsap-animate');
  if (elements.length === 0) return;
  gsap.fromTo(
    elements,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
  );
};

/**
 * Navigazione: aggiorna immediatamente l'indice e blocca il tracking
 * per il tempo necessario allo smooth scroll. Senza questo lock, lo
 * scroll attraversa altre sezioni e i loro trigger sovrascrivono l'indice
 * corretto.
 */
const handleNavigation = ({ index, sectionId }) => {
  const section = document.querySelector(`#${sectionId}`);
  if (!section) return;

  if (typeof index === 'number') {
    currentSectionIndex.value = index;
  }

  isNavigating = true;
  if (navigationLockTimer) clearTimeout(navigationLockTimer);

  const offsetTop = section.offsetTop - (window.innerWidth <= 767 ? 60 : 0);

  window.scrollTo({ top: offsetTop, behavior: 'smooth' });

  // Sblocchiamo dopo che lo smooth scroll dovrebbe essersi assestato.
  // Il valore è generoso per coprire scroll lunghi (hero ↔ contatti).
  navigationLockTimer = setTimeout(() => {
    isNavigating = false;
  }, 900);
};

const handleScroll = () => {
  showBackToTop.value = window.scrollY > window.innerHeight * 0.5;
};

const scrollToTop = () => {
  handleNavigation({ index: 0, sectionId: 'hero' });
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

.kiba-spa-section#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.kiba-spa-section:nth-child(odd) {
  background: var(--kiba-bg-dark, #1a1a1a);
}

.kiba-spa-section:nth-child(even) {
  background: var(--kiba-bg-surface, #2d2d2d);
}

.kiba-spa-section--footer {
  min-height: auto;
}

.kiba-spa-section#hero :deep(.gsap-animate) {
  opacity: 0;
}

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

@media (max-width: 991px) {
  .kiba-spa-container {
    margin-left: 60px;
  }
  .kiba-spa-section {
    padding: 50px 20px;
  }
}

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
