/**
 * useScrollAnimations.js
 * Composable Vue per gestire animazioni basate su scroll
 * Utilizza Intersection Observer per performance ottimali
 *
 * Più performante di WOW.js/AOS perché:
 * - Non usa polling
 * - Osserva solo elementi visibili
 * - Supporta prefers-reduced-motion
 */

import { onMounted, onBeforeUnmount } from 'vue';

export function useScrollAnimations(options = {}) {
  const {
    threshold = 0.15, // Percentuale di visibilità per attivare
    rootMargin = '0px 0px -50px 0px', // Margine per anticipare attivazione
    once = true // Anima solo una volta
  } = options;

  let observer = null;

  onMounted(() => {
    // Rispetta preferenze utente per animazioni ridotte
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Mostra tutti gli elementi senza animazioni
      document.querySelectorAll('.kiba-observe, .kiba-observe-fade, .kiba-observe-scale')
        .forEach(el => el.classList.add('kiba-visible'));
      return;
    }

    // Crea Intersection Observer
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Aggiunge classe per attivare transizione CSS
            entry.target.classList.add('kiba-visible');

            // Se once=true, smette di osservare dopo prima attivazione
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Rimuove classe se once=false (animazione reversibile)
            entry.target.classList.remove('kiba-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    // Osserva tutti gli elementi con classi di animazione
    const animatedElements = document.querySelectorAll(
      '.kiba-observe, .kiba-observe-fade, .kiba-observe-scale'
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    observer
  };
}

/**
 * Helper per aggiungere stagger delay agli elementi
 * @param {string} selector - Selettore CSS degli elementi
 * @param {number} baseDelay - Delay base in secondi
 * @param {number} increment - Incremento per ogni elemento
 */
export function addStaggerDelay(selector, baseDelay = 0.1, increment = 0.1) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    const delay = baseDelay + index * increment;
    el.style.transitionDelay = `${delay}s`;
  });
}
