<template>
  <!--
    KibaLoading.vue
    Loader personalizzato con branding Kiba.Studio
    Utilizza palette brand: rosso ruggine + crema
  -->
  <div class="kiba-loader" :class="{ 'kiba-loader-hidden': isHidden }">
    <div class="kiba-loader-content">
      <!-- Logo animato -->
      <div class="kiba-loader-logo">
        <span class="kiba-loader-text">Kiba</span>
        <span class="kiba-loader-dot">.</span>
        <span class="kiba-loader-text">Studio</span>
      </div>

      <!-- Barra di progresso minimale -->
      <div class="kiba-loader-bar">
        <div class="kiba-loader-progress" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Slogan etico -->
      <p class="kiba-loader-slogan">{{ $t('footer.description') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const progress = ref(0);
const isHidden = ref(false);

onMounted(() => {
  // Simula caricamento progressivo
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 15;
      if (progress.value > 100) progress.value = 100;
    } else {
      clearInterval(interval);
      // Nascondi loader dopo completamento
      setTimeout(() => {
        isHidden.value = true;
      }, 300);
    }
  }, 100);

  // Fallback: nascondi dopo 3 secondi max
  setTimeout(() => {
    progress.value = 100;
    setTimeout(() => {
      isHidden.value = true;
    }, 300);
  }, 3000);
});
</script>

<style scoped>
.kiba-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--kiba-bg-dark, #1a1a1a);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              visibility 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.kiba-loader-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.kiba-loader-content {
  text-align: center;
}

.kiba-loader-logo {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  letter-spacing: -0.02em;
}

.kiba-loader-text {
  color: var(--kiba-text-main, #e8e8e8);
  display: inline-block;
  animation: kibaFadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.kiba-loader-text:first-child {
  animation-delay: 0.1s;
}

.kiba-loader-text:last-child {
  animation-delay: 0.3s;
}

.kiba-loader-dot {
  color: var(--kiba-primary, #c94c4c);
  display: inline-block;
  animation: kibaPulse 1.5s ease-in-out infinite;
}

.kiba-loader-bar {
  width: 200px;
  height: 3px;
  background: var(--kiba-bg-elevated, #3a3a3a);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto 20px;
}

.kiba-loader-progress {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--kiba-primary, #c94c4c) 0%,
    var(--kiba-primary-light, #e06666) 100%
  );
  border-radius: 2px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.kiba-loader-slogan {
  color: var(--kiba-text-muted, #888888);
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0;
  opacity: 0;
  animation: kibaFadeIn 0.8s ease-out 0.5s forwards;
}

@keyframes kibaFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes kibaPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}
</style>
