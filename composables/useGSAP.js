/**
 * useGSAP.js
 * Composable per gestire GSAP e ScrollTrigger in modo centralizzato
 *
 * Sostituisce completamente:
 * - WOW.js
 * - AOS
 * - Animazioni CSS del template
 */

import { onMounted, onBeforeUnmount, ref } from 'vue';

let gsapInstance = null;
let ScrollTriggerInstance = null;

export function useGSAP() {
  const isLoaded = ref(false);
  const currentSection = ref(0);
  const totalSections = ref(7);

  // Carica GSAP dinamicamente
  const loadGSAP = async () => {
    if (gsapInstance) {
      isLoaded.value = true;
      return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
    }

    try {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');

      gsapInstance = gsapModule.gsap;
      ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;

      // Registra plugin
      gsapInstance.registerPlugin(ScrollTriggerInstance);

      // Configurazione globale GSAP
      gsapInstance.defaults({
        ease: 'power3.out',
        duration: 0.8
      });

      isLoaded.value = true;

      return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
    } catch (error) {
      console.error('Errore caricamento GSAP:', error);
      return null;
    }
  };

  /**
   * Crea animazione di entrata per una sezione
   * @param {string} sectionId - ID della sezione
   * @param {object} options - Opzioni animazione
   */
  const animateSectionIn = (sectionId, options = {}) => {
    if (!gsapInstance) return;

    const {
      duration = 0.8,
      stagger = 0.1,
      y = 40,
      opacity = 0
    } = options;

    const section = document.querySelector(`#${sectionId}`);
    if (!section) return;

    const elements = section.querySelectorAll('.gsap-animate');

    gsapInstance.fromTo(
      elements,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out'
      }
    );
  };

  /**
   * Crea timeline per scroll a blocchi
   * @param {Array} sections - Array di ID sezioni
   */
  const createScrollSnapTimeline = (sections) => {
    if (!gsapInstance || !ScrollTriggerInstance) return;

    sections.forEach((sectionId, index) => {
      ScrollTriggerInstance.create({
        trigger: `#${sectionId}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          currentSection.value = index;
          animateSectionIn(sectionId);
        },
        onEnterBack: () => {
          currentSection.value = index;
        }
      });
    });
  };

  /**
   * Naviga a una sezione specifica con animazione
   * @param {number} index - Indice sezione
   * @param {string} sectionId - ID sezione
   */
  const navigateToSection = (index, sectionId) => {
    if (!gsapInstance) return;

    const section = document.querySelector(`#${sectionId}`);
    if (!section) return;

    gsapInstance.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 0 },
      ease: 'power3.inOut'
    });

    currentSection.value = index;
  };

  /**
   * Anima accordion (apertura/chiusura)
   * @param {HTMLElement} element - Elemento accordion
   * @param {boolean} isOpen - Stato apertura
   */
  const animateAccordion = (element, isOpen) => {
    if (!gsapInstance) return;

    if (isOpen) {
      gsapInstance.fromTo(
        element,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    } else {
      gsapInstance.to(element, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  };

  /**
   * Crea animazione per modello 3D basata su scroll
   * @param {object} model - Riferimento al modello Three.js
   * @param {object} camera - Riferimento alla camera Three.js
   */
  const createModel3DScrollAnimation = (model, camera) => {
    if (!gsapInstance || !ScrollTriggerInstance || !model) return;

    // Timeline per il modello 3D
    const tl = gsapInstance.timeline({
      scrollTrigger: {
        trigger: '.kiba-spa-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1 // Sincronizza con scroll
      }
    });

    // Rotazioni progressive del modello
    tl.to(model.rotation, {
      y: Math.PI * 0.5, // 90°
      x: 0.2, // Leggera inclinazione
      duration: 1
    });

    // Zoom camera
    if (camera) {
      tl.to(
        camera.position,
        {
          z: 7,
          duration: 1
        },
        0
      ); // Parte insieme
    }

    return tl;
  };

  /**
   * Animazione loader iniziale
   * @param {Function} onComplete - Callback al completamento
   */
  const animateLoader = (onComplete) => {
    if (!gsapInstance) {
      onComplete?.();
      return;
    }

    const tl = gsapInstance.timeline({
      onComplete
    });

    tl.to('.kiba-loader-progress', {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    })
      .to('.kiba-loader-content', {
        opacity: 0,
        y: -20,
        duration: 0.4
      })
      .to('.kiba-loader', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          const loader = document.querySelector('.kiba-loader');
          if (loader) loader.style.display = 'none';
        }
      });

    return tl;
  };

  /**
   * Animazione reveal hero
   */
  const animateHeroReveal = () => {
    if (!gsapInstance) return;

    const tl = gsapInstance.timeline();

    tl.from('.kiba-hero-content > *', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }).from(
      '.kiba-hero-model',
      {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
      },
      '-=0.5'
    );

    return tl;
  };

  // Cleanup
  onBeforeUnmount(() => {
    if (ScrollTriggerInstance) {
      ScrollTriggerInstance.getAll().forEach((trigger) => trigger.kill());
    }
  });

  return {
    loadGSAP,
    isLoaded,
    currentSection,
    totalSections,
    animateSectionIn,
    createScrollSnapTimeline,
    navigateToSection,
    animateAccordion,
    createModel3DScrollAnimation,
    animateLoader,
    animateHeroReveal,
    gsap: () => gsapInstance,
    ScrollTrigger: () => ScrollTriggerInstance
  };
}
