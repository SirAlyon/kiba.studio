<template>
  <div ref="rootRef" class="kiba-sigil" aria-hidden="true">
    <svg
      ref="svgRef"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      class="kiba-sigil-svg"
      role="presentation"
    >
      <defs>
        <radialGradient id="sigil-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#c94c4c" stop-opacity="0.4" />
          <stop offset="55%" stop-color="#c94c4c" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#c94c4c" stop-opacity="0" />
        </radialGradient>

        <linearGradient id="sigil-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e06666" />
          <stop offset="100%" stop-color="#c94c4c" />
        </linearGradient>

        <radialGradient id="sigil-mark-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#2a1f1f" />
          <stop offset="100%" stop-color="#1a1a1a" />
        </radialGradient>
      </defs>

      <!-- Aura di sfondo -->
      <circle cx="300" cy="300" r="280" fill="url(#sigil-glow)" class="kiba-sigil-bgglow" />

      <!-- Anello esterno: 24 raggi (suggeriscono protezione/vigilanza, come segni cardinali) -->
      <g class="kiba-sigil-rays" transform="translate(300 300)">
        <g v-for="i in 24" :key="`ray-${i}`" :transform="`rotate(${(i - 1) * 15})`">
          <line
            x1="0"
            :y1="i % 6 === 0 ? -250 : -260"
            x2="0"
            y2="-275"
            :stroke="i % 6 === 0 ? 'rgba(201,76,76,0.45)' : 'rgba(232,232,232,0.18)'"
            :stroke-width="i % 6 === 0 ? 1.5 : 1"
            stroke-linecap="round"
          />
        </g>
      </g>

      <!-- 3 anelli concentrici, ognuno con personalità diversa -->
      <g class="kiba-sigil-ring-outer">
        <circle cx="300" cy="300" r="240" fill="none" stroke="rgba(232,232,232,0.12)" stroke-width="1" />
      </g>

      <g class="kiba-sigil-ring-mid">
        <circle
          cx="300"
          cy="300"
          r="195"
          fill="none"
          stroke="rgba(201,76,76,0.4)"
          stroke-width="1.2"
          stroke-dasharray="3 8"
        />
      </g>

      <g class="kiba-sigil-ring-inner">
        <circle cx="300" cy="300" r="155" fill="none" stroke="rgba(232,232,232,0.18)" stroke-width="1" />
      </g>

      <!-- Esagono protettivo che incornicia il logo (kamon-style) -->
      <g class="kiba-sigil-hex" transform="translate(300 300)">
        <polygon
          points="0,-170 147.2,-85 147.2,85 0,170 -147.2,85 -147.2,-85"
          fill="none"
          stroke="url(#sigil-stroke)"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <polygon
          points="0,-130 112.6,-65 112.6,65 0,130 -112.6,65 -112.6,-65"
          fill="none"
          stroke="rgba(232,232,232,0.22)"
          stroke-width="1"
          stroke-linejoin="round"
          class="kiba-sigil-hex-inner"
        />
      </g>

      <!-- Punti orbitanti: 6 vertici dell'esagono -->
      <g class="kiba-sigil-orbits" transform="translate(300 300)">
        <circle
          v-for="(angle, i) in [0, 60, 120, 180, 240, 300]"
          :key="`dot-${i}`"
          :cx="195 * Math.cos(((angle - 90) * Math.PI) / 180)"
          :cy="195 * Math.sin(((angle - 90) * Math.PI) / 180)"
          r="4"
          fill="#c94c4c"
          class="kiba-sigil-dot"
        />
      </g>

      <!-- Cerchio di sfondo del mark centrale (lo "scudo" attorno all'Akita) -->
      <g class="kiba-sigil-mark-bg" transform="translate(300 300)">
        <!-- Halo esterno: pulsa lentamente come "battito" del logo -->
        <circle
          class="kiba-sigil-mark-halo"
          cx="0"
          cy="0"
          r="105"
          fill="none"
          stroke="rgba(201,76,76,0.35)"
          stroke-width="1.5"
        />
        <circle
          class="kiba-sigil-mark-ring"
          cx="0"
          cy="0"
          r="95"
          fill="url(#sigil-mark-bg)"
          stroke="rgba(201,76,76,0.5)"
          stroke-width="1.2"
        />
        <circle cx="0" cy="0" r="92" fill="none" stroke="rgba(232,232,232,0.05)" stroke-width="1" />
      </g>

      <!-- Logo Akita: incornicia il KibaIcon — 130x130, perfettamente centrato (300,300) -->
      <g
        ref="markRef"
        class="kiba-sigil-mark"
        transform="translate(235 235)"
      >
        <foreignObject x="0" y="0" width="130" height="130">
          <div xmlns="http://www.w3.org/1999/xhtml" class="kiba-sigil-mark-inner">
            <KibaIcon :size="130" variant="default" :animated="true" />
          </div>
        </foreignObject>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGSAP } from '@/composables/useGSAP';
import KibaIcon from './KibaIcon.vue';

const rootRef = ref(null);
const svgRef = ref(null);
const markRef = ref(null);
let entranceTl = null;
let continuousTl = null;
let breathingTl = null;
let orbitTl = null;
let raysTl = null;

const { loadGSAP } = useGSAP();

onMounted(async () => {
  const mods = await loadGSAP();
  if (!mods || !svgRef.value) return;
  const { gsap } = mods;

  const reduced = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.set(svgRef.value, { transformOrigin: '50% 50%' });
  gsap.set('.kiba-sigil-mark', { transformOrigin: '50% 50%' });

  // Sequenza di entrata: dall'esterno verso l'interno
  entranceTl = gsap.timeline();
  entranceTl
    .from(svgRef.value, { opacity: 0, scale: 0.92, duration: 0.9, ease: 'power3.out' })
    .from('.kiba-sigil-rays line', {
      opacity: 0,
      stagger: { each: 0.012, from: 'random' },
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.6')
    .from('.kiba-sigil-ring-outer, .kiba-sigil-ring-mid, .kiba-sigil-ring-inner', {
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.kiba-sigil-hex polygon', {
      opacity: 0,
      scale: 0.92,
      transformOrigin: '50% 50%',
      stagger: 0.1,
      duration: 0.6
    }, '-=0.4')
    .from('.kiba-sigil-dot', {
      opacity: 0,
      scale: 0,
      transformOrigin: '50% 50%',
      stagger: 0.06,
      duration: 0.4,
      ease: 'back.out(2)'
    }, '-=0.3')
    .from('.kiba-sigil-mark-bg', {
      opacity: 0,
      scale: 0.7,
      transformOrigin: '50% 50%',
      duration: 0.5,
      ease: 'back.out(1.5)'
    }, '-=0.2')
    .from(markRef.value, {
      opacity: 0,
      scale: 0,
      rotation: -90,
      transformOrigin: '50% 50%',
      duration: 0.7,
      ease: 'back.out(1.7)'
    }, '-=0.3');

  if (!reduced) {
    // Anello "dashed" rosso ruota lentamente in un verso
    continuousTl = gsap.to('.kiba-sigil-ring-mid', {
      rotation: 360,
      transformOrigin: '50% 50%',
      duration: 70,
      ease: 'none',
      repeat: -1
    });

    // Raggi esterni ruotano nell'altro verso, ancora più lentamente
    raysTl = gsap.to('.kiba-sigil-rays', {
      rotation: -360,
      transformOrigin: '50% 50%',
      duration: 220,
      ease: 'none',
      repeat: -1
    });

    // Punti orbitanti pulsano
    orbitTl = gsap.to('.kiba-sigil-dot', {
      scale: 1.5,
      transformOrigin: '50% 50%',
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: { each: 0.2, from: 'random' }
    });

    // Aura "respira"
    breathingTl = gsap.to('.kiba-sigil-bgglow', {
      opacity: 0.65,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Animazioni secondarie sul logo: il logo resta fermo al centro,
    // ma l'halo rosso attorno "respira" e lo stroke del ring interno pulsa
    // leggermente. Le orecchie/occhi dell'Akita sono già animati via CSS
    // dentro KibaIcon (props animated).
    gsap.set('.kiba-sigil-mark-halo', { transformOrigin: '50% 50%' });
    gsap.to('.kiba-sigil-mark-halo', {
      scale: 1.08,
      opacity: 0.15,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
    gsap.fromTo(
      '.kiba-sigil-mark-ring',
      { strokeOpacity: 0.5 },
      {
        strokeOpacity: 0.85,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      }
    );
  }
});

onBeforeUnmount(() => {
  entranceTl?.kill();
  continuousTl?.kill();
  raysTl?.kill();
  orbitTl?.kill();
  breathingTl?.kill();
});
</script>

<style scoped>
.kiba-sigil {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.kiba-sigil-svg {
  width: 100%;
  height: auto;
  max-width: 540px;
  display: block;
  filter: drop-shadow(0 12px 50px rgba(201, 76, 76, 0.18));
}

.kiba-sigil-mark-inner {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kiba-sigil-mark-inner :deep(svg) {
  filter: drop-shadow(0 4px 12px rgba(201, 76, 76, 0.4));
}
</style>
