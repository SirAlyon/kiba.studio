<template>
  <!--
    KibaLoaderGSAP.vue
    Loader animato con GSAP
    Sequenza: logo fade-in, progress bar, scale out
  -->
  <div ref="loaderRef" class="kiba-loader-gsap">
    <div class="kiba-loader-content">
      <!-- Logo/Icon - Akita stilizzato -->
      <div ref="logoRef" class="kiba-loader-logo">
        <KibaIcon :size="60" variant="light" :animated="false" />
      </div>

      <!-- Brand name -->
      <div ref="brandRef" class="kiba-loader-brand">
        <span class="kiba-loader-text">Kiba</span>
        <span class="kiba-loader-dot">.</span>
        <span class="kiba-loader-text">Studio</span>
      </div>

      <!-- Progress bar -->
      <div class="kiba-loader-progress">
        <div ref="progressBarRef" class="kiba-loader-progress-fill"></div>
      </div>

      <!-- Loading text -->
      <div ref="statusRef" class="kiba-loader-status">
        Caricamento...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGSAP } from '@/composables/useGSAP';
import KibaIcon from './KibaIcon.vue';

const emit = defineEmits(['complete']);

// Refs
const loaderRef = ref(null);
const logoRef = ref(null);
const brandRef = ref(null);
const progressBarRef = ref(null);
const statusRef = ref(null);

// GSAP composable
const { loadGSAP } = useGSAP();

onMounted(async () => {
  const gsapModules = await loadGSAP();

  if (!gsapModules) {
    // Fallback senza GSAP
    setTimeout(() => emit('complete'), 1500);
    return;
  }

  const { gsap } = gsapModules;
  runLoaderAnimation(gsap);
});

/**
 * Esegue la sequenza di animazione del loader
 */
const runLoaderAnimation = (gsap) => {
  const tl = gsap.timeline({
    onComplete: () => {
      emit('complete');
    }
  });

  // 1. Logo fade in e scale
  tl.fromTo(
    logoRef.value,
    { scale: 0, opacity: 0, rotation: -180 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }
  );

  // 2. Brand text reveal (stagger)
  tl.fromTo(
    brandRef.value.children,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    },
    '-=0.3'
  );

  // 3. Progress bar fill
  tl.to(
    progressBarRef.value,
    {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut'
    },
    '-=0.2'
  );

  // 4. Status text fade
  tl.to(
    statusRef.value,
    {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    },
    '-=0.3'
  );

  // 5. Loader scale out
  tl.to(loaderRef.value, {
    scale: 1.1,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.in'
  });
};
</script>

<style scoped>
.kiba-loader-gsap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--kiba-bg-dark, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.kiba-loader-content {
  text-align: center;
}

.kiba-loader-logo {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border-radius: 50%;
  margin: 0 auto 24px;
  font-size: 2.5rem;
  color: #ffffff;
  opacity: 0;
}

.kiba-loader-brand {
  margin-bottom: 32px;
}

.kiba-loader-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--kiba-text-main, #f0f0f0);
  opacity: 0;
  display: inline-block;
}

.kiba-loader-dot {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--kiba-primary, #c94c4c);
  opacity: 0;
  display: inline-block;
}

.kiba-loader-progress {
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin: 0 auto 16px;
  overflow: hidden;
}

.kiba-loader-progress-fill {
  width: 0;
  height: 100%;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  border-radius: 3px;
}

.kiba-loader-status {
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

@media (max-width: 767px) {
  .kiba-loader-logo {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .kiba-loader-text,
  .kiba-loader-dot {
    font-size: 2rem;
  }

  .kiba-loader-progress {
    width: 160px;
  }
}
</style>
