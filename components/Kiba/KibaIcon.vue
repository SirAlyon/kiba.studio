<template>
  <!--
    KibaIcon.vue
    Icona Kiba.Studio - Testa di Akita stilizzata

    Design: Forma geometrica che richiama la testa di un Akita visto di fronte
    - Orecchie triangolari appuntite (protezione, vigilanza)
    - Muso geometrico (precisione, struttura)
    - Forma a scudo (sicurezza, protezione)

    Ispirazione:
    - Silhouette Akita giapponese
    - Geometrie giapponesi moderne (tipo kamon)
    - Senso di protezione e lealtà
  -->
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['kiba-icon', { 'kiba-icon-animated': animated }]"
  >
    <!-- Testa principale - forma a scudo -->
    <path
      d="M50 10L20 35V65L50 90L80 65V35L50 10Z"
      :fill="fillColor"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      class="kiba-icon-head"
    />

    <!-- Orecchio sinistro -->
    <path
      d="M20 35L10 15L30 25L20 35Z"
      :fill="accentColor"
      class="kiba-icon-ear kiba-icon-ear-left"
    />

    <!-- Orecchio destro -->
    <path
      d="M80 35L90 15L70 25L80 35Z"
      :fill="accentColor"
      class="kiba-icon-ear kiba-icon-ear-right"
    />

    <!-- Maschera facciale (pattern Akita) -->
    <path
      d="M50 30L35 45V60L50 70L65 60V45L50 30Z"
      :fill="maskColor"
      class="kiba-icon-mask"
    />

    <!-- Occhi -->
    <circle cx="40" cy="48" r="4" :fill="eyeColor" class="kiba-icon-eye kiba-icon-eye-left" />
    <circle cx="60" cy="48" r="4" :fill="eyeColor" class="kiba-icon-eye kiba-icon-eye-right" />

    <!-- Naso - triangolo invertito -->
    <path
      d="M50 58L46 65H54L50 58Z"
      :fill="noseColor"
      class="kiba-icon-nose"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: [Number, String],
    default: 40
  },
  variant: {
    type: String,
    default: 'default', // 'default', 'mono', 'light'
    validator: (v) => ['default', 'mono', 'light'].includes(v)
  },
  animated: {
    type: Boolean,
    default: false
  }
});

// Colori basati sulla variante
const fillColor = computed(() => {
  switch (props.variant) {
    case 'mono':
      return 'currentColor';
    case 'light':
      return '#f0f0f0';
    default:
      return 'var(--kiba-primary, #c94c4c)';
  }
});

const strokeColor = computed(() => {
  switch (props.variant) {
    case 'mono':
      return 'none';
    case 'light':
      return 'none';
    default:
      return 'none';
  }
});

const strokeWidth = computed(() => '0');

const accentColor = computed(() => {
  switch (props.variant) {
    case 'mono':
      return 'currentColor';
    case 'light':
      return '#e8e8e8';
    default:
      return 'var(--kiba-primary-light, #e06666)';
  }
});

const maskColor = computed(() => {
  switch (props.variant) {
    case 'mono':
      return 'rgba(255,255,255,0.3)';
    case 'light':
      return '#ffffff';
    default:
      return 'var(--kiba-secondary, #f5e6d3)';
  }
});

const eyeColor = computed(() => {
  switch (props.variant) {
    case 'mono':
      return 'currentColor';
    case 'light':
      return '#1a1a1a';
    default:
      return 'var(--kiba-bg-dark, #1a1a1a)';
  }
});

const noseColor = computed(() => {
  switch (props.variant) {
    case 'mono':
      return 'currentColor';
    case 'light':
      return '#1a1a1a';
    default:
      return 'var(--kiba-bg-dark, #1a1a1a)';
  }
});
</script>

<style scoped>
.kiba-icon {
  display: inline-block;
  vertical-align: middle;
}

.kiba-icon-animated .kiba-icon-ear {
  transform-origin: center bottom;
  animation: earTwitch 4s ease-in-out infinite;
}

.kiba-icon-animated .kiba-icon-ear-left {
  animation-delay: 0s;
}

.kiba-icon-animated .kiba-icon-ear-right {
  animation-delay: 0.2s;
}

@keyframes earTwitch {
  0%,
  90%,
  100% {
    transform: rotate(0deg);
  }
  92% {
    transform: rotate(-3deg);
  }
  94% {
    transform: rotate(0deg);
  }
  96% {
    transform: rotate(-2deg);
  }
  98% {
    transform: rotate(0deg);
  }
}

.kiba-icon-animated .kiba-icon-eye {
  animation: blink 5s ease-in-out infinite;
}

@keyframes blink {
  0%,
  96%,
  100% {
    transform: scaleY(1);
  }
  98% {
    transform: scaleY(0.1);
  }
}
</style>
