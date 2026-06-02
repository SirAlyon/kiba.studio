<template>
  <!--
    KibaLoaderGSAP.vue
    Loader minimo: il sito è SSR-renderizzato, niente da aspettare davvero.
    Funzione: brand-stamp di ~700ms al primo accesso della sessione,
    poi salta direttamente nelle pagine successive (sessionStorage flag).
  -->
  <div ref="loaderRef" class="kiba-loader-gsap" :class="{ 'is-instant': skipAnimation }">
    <div class="kiba-loader-content">
      <div ref="logoRef" class="kiba-loader-logo">
        <KibaIcon :size="60" variant="light" :animated="false" />
      </div>

      <div ref="brandRef" class="kiba-loader-brand">
        <span class="kiba-loader-text">Kiba</span><span class="kiba-loader-dot">.</span><span class="kiba-loader-text">Studio</span>
      </div>

      <!-- Accent line con pulsazione, NON una progress bar fasulla -->
      <div ref="accentRef" class="kiba-loader-accent" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGSAP } from '@/composables/useGSAP';
import KibaIcon from './KibaIcon.vue';

const emit = defineEmits(['complete']);

const SESSION_KEY = 'kiba_loader_seen';

const loaderRef = ref(null);
const logoRef = ref(null);
const brandRef = ref(null);
const accentRef = ref(null);
const skipAnimation = ref(false);

const { loadGSAP } = useGSAP();

onMounted(async () => {
  // Skip su navigazioni successive nella stessa sessione: il brand-stamp basta una volta.
  const alreadySeen =
    typeof window !== 'undefined' && window.sessionStorage?.getItem(SESSION_KEY) === '1';

  if (alreadySeen) {
    skipAnimation.value = true;
    // Lasciamo un frame perché il root applichi `is-instant`, poi via.
    requestAnimationFrame(() => emit('complete'));
    return;
  }

  const gsapModules = await loadGSAP();
  if (!gsapModules) {
    // Fallback: 250ms e via.
    setTimeout(() => {
      markSeen();
      emit('complete');
    }, 250);
    return;
  }

  runLoaderAnimation(gsapModules.gsap);
});

const markSeen = () => {
  try {
    window.sessionStorage?.setItem(SESSION_KEY, '1');
  } catch {
    // Storage non disponibile (private mode strict, ecc.): ignoriamo.
  }
};

/**
 * Animazione: ~700ms totali. Niente progress bar finta — solo brand-stamp.
 * Sequenza: logo+brand entrano insieme, breve pausa, fade-out.
 */
const runLoaderAnimation = (gsap) => {
  const tl = gsap.timeline({
    onComplete: () => {
      markSeen();
      emit('complete');
    }
  });

  // Logo scale-in
  tl.fromTo(
    logoRef.value,
    { scale: 0.4, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.6)' }
  );

  // Brand stagger (Kiba — . — Studio)
  tl.fromTo(
    brandRef.value.children,
    { y: 16, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.28,
      stagger: 0.05,
      ease: 'power2.out'
    },
    '-=0.2'
  );

  // Accent line: cresce dal centro
  tl.fromTo(
    accentRef.value,
    { scaleX: 0, opacity: 0 },
    { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.out' },
    '-=0.15'
  );

  // Brevissima pausa di lettura
  tl.to({}, { duration: 0.1 });

  // Fade-out: il loader sparisce, il sito è già lì sotto pronto
  tl.to(loaderRef.value, {
    opacity: 0,
    duration: 0.32,
    ease: 'power2.in'
  });
};
</script>

<style scoped>
.kiba-loader-gsap {
  position: fixed;
  inset: 0;
  background: var(--kiba-bg-dark, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.kiba-loader-gsap.is-instant {
  /* Su navigazioni interne salta tutto: zero attesa. */
  display: none;
}

.kiba-loader-content {
  text-align: center;
}

.kiba-loader-logo {
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border-radius: 24px;
  margin: 0 auto 20px;
  box-shadow: 0 12px 40px rgba(201, 76, 76, 0.25);
  opacity: 0;
}

.kiba-loader-brand {
  margin-bottom: 16px;
  font-family: 'Manrope', system-ui, sans-serif;
}

.kiba-loader-text,
.kiba-loader-dot {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  display: inline-block;
  opacity: 0;
}

.kiba-loader-text {
  color: var(--kiba-text-main, #f0f0f0);
}

.kiba-loader-dot {
  color: var(--kiba-primary, #c94c4c);
}

.kiba-loader-accent {
  width: 80px;
  height: 2px;
  background: var(--kiba-gradient, linear-gradient(90deg, #c94c4c 0%, #e06666 100%));
  border-radius: 2px;
  margin: 0 auto;
  transform: scaleX(0);
  transform-origin: center;
  opacity: 0;
}

@media (max-width: 767px) {
  .kiba-loader-logo {
    width: 78px;
    height: 78px;
    border-radius: 20px;
  }

  .kiba-loader-text,
  .kiba-loader-dot {
    font-size: 1.875rem;
  }

  .kiba-loader-accent {
    width: 64px;
  }
}

@media (prefers-reduced-motion: reduce) {
  /* Niente animazioni residue se l'utente le ha disattivate. */
  .kiba-loader-gsap {
    transition: none;
  }
}
</style>
