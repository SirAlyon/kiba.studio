<template>
  <!--
    KibaSPAProcess.vue
    Sezione di punta: ogni fase è una "scena" con illustrazione SVG dedicata,
    numero gigante decorativo, attivit pill (niente check-list ripetitive).
    Tutto il copy resta in i18n IT/EN.
  -->
  <div class="kiba-process-spa" ref="sectionRef">
    <div class="container">
      <header class="kiba-process-header">
        <div class="kiba-section-label gsap-animate">{{ $t('process.label') }}</div>
        <h2 class="kiba-section-title gsap-animate">{{ $t('process.title') }}</h2>
      </header>

      <!-- Phase pills navigation -->
      <nav class="kiba-process-pills gsap-animate" aria-label="Fasi del processo">
        <button
          v-for="(step, index) in steps"
          :key="step.id"
          type="button"
          class="kiba-process-pill"
          :class="{ 'is-active': index === activeStepIndex }"
          :aria-current="index === activeStepIndex ? 'step' : undefined"
          @click="goToStep(index)"
        >
          <span class="kiba-process-pill-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="kiba-process-pill-label">{{ step.label }}</span>
        </button>
      </nav>

      <!-- Scene -->
      <div class="kiba-process-scene" ref="contentRef">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="kiba-process-stage"
          :class="{ 'is-active': index === activeStepIndex }"
          role="tabpanel"
          :aria-hidden="index !== activeStepIndex"
        >
          <!-- Numero gigante decorativo -->
          <div class="kiba-process-ghost-num" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <div class="kiba-process-stage-grid">
            <!-- Text side -->
            <div class="kiba-process-stage-text">
              <div class="kiba-process-stage-eyebrow">
                <span class="kiba-process-stage-step">{{ $t('process.step_progress', { current: index + 1, total: steps.length }) }}</span>
                <span class="kiba-process-stage-dot">•</span>
                <span>{{ step.label }}</span>
              </div>
              <h3 class="kiba-process-stage-title">{{ step.title }}</h3>
              <p class="kiba-process-stage-description">{{ step.description }}</p>

              <ul v-if="step.highlights.length" class="kiba-process-stage-pills" aria-label="Attività della fase">
                <li v-for="(highlight, hIndex) in step.highlights" :key="hIndex">
                  <span class="kiba-process-stage-pills-bar" aria-hidden="true"></span>
                  <span>{{ highlight }}</span>
                </li>
              </ul>

              <div class="kiba-process-stage-duration">
                <i class="far fa-clock" aria-hidden="true"></i>
                <span>{{ step.duration }}</span>
              </div>
            </div>

            <!-- Illustration side -->
            <div class="kiba-process-stage-art">
              <div class="kiba-process-stage-art-card">
                <component :is="step.scene" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom controls -->
      <div class="kiba-process-controls gsap-animate">
        <button
          type="button"
          class="kiba-process-arrow"
          :disabled="activeStepIndex === 0"
          :aria-label="$t('process.step_aria_prev')"
          @click="previousStep"
        >
          <i class="fas fa-arrow-left" aria-hidden="true"></i>
        </button>

        <div class="kiba-process-progress" aria-hidden="true">
          <div
            class="kiba-process-progress-fill"
            :style="{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }"
          ></div>
        </div>

        <button
          type="button"
          class="kiba-process-arrow"
          :disabled="activeStepIndex === steps.length - 1"
          :aria-label="$t('process.step_aria_next')"
          @click="nextStep"
        >
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useGSAP } from '@/composables/useGSAP';
import { useI18n } from 'vue-i18n';

const { t, tm, rt } = useI18n();
const { loadGSAP } = useGSAP();

const sectionRef = ref(null);
const contentRef = ref(null);
const activeStepIndex = ref(0);

let gsap = null;
let isAnimating = false;

const readHighlights = (key) => {
  const list = tm(key);
  if (!Array.isArray(list)) return [];
  return list.map((item) => rt(item));
};

/**
 * Illustrazioni SVG inline, una per fase. Geometriche, palette dark/red,
 * coerenti con lo stile dell'icona Akita (forme angolari, accenti rosso).
 */
const DiscoveryScene = () =>
  h('svg', { viewBox: '0 0 480 320', class: 'kiba-process-svg', preserveAspectRatio: 'xMidYMid meet' }, [
    // sfondo griglia leggera
    h('defs', null, [
      h('pattern', { id: 'discoveryGrid', width: '40', height: '40', patternUnits: 'userSpaceOnUse' }, [
        h('path', { d: 'M 40 0 L 0 0 0 40', fill: 'none', stroke: 'rgba(255,255,255,0.025)', 'stroke-width': '1' })
      ])
    ]),
    h('rect', { width: '480', height: '320', fill: 'url(#discoveryGrid)' }),

    // 3 cerchi concentrici (radar)
    h('circle', { cx: '240', cy: '160', r: '120', stroke: 'rgba(201,76,76,0.18)', fill: 'none', 'stroke-width': '1' }),
    h('circle', { cx: '240', cy: '160', r: '80', stroke: 'rgba(201,76,76,0.32)', fill: 'none', 'stroke-width': '1', 'stroke-dasharray': '4 4' }),
    h('circle', { cx: '240', cy: '160', r: '40', stroke: 'rgba(224,102,102,0.65)', fill: 'rgba(201,76,76,0.08)', 'stroke-width': '1.2' }),

    // crosshair
    h('line', { x1: '110', y1: '160', x2: '170', y2: '160', stroke: 'rgba(201,76,76,0.35)', 'stroke-width': '1' }),
    h('line', { x1: '310', y1: '160', x2: '370', y2: '160', stroke: 'rgba(201,76,76,0.35)', 'stroke-width': '1' }),
    h('line', { x1: '240', y1: '40', x2: '240', y2: '110', stroke: 'rgba(201,76,76,0.35)', 'stroke-width': '1' }),
    h('line', { x1: '240', y1: '210', x2: '240', y2: '280', stroke: 'rgba(201,76,76,0.35)', 'stroke-width': '1' }),

    // 4 data-node diamonds + connessione tratteggiata
    ...[[140, 90], [340, 110], [360, 220], [120, 230]].flatMap(([x, y]) => [
      h('line', { x1: x, y1: y, x2: '240', y2: '160', stroke: 'rgba(255,255,255,0.12)', 'stroke-dasharray': '2 4', 'stroke-width': '1' }),
      h('rect', { x: x - 5, y: y - 5, width: '10', height: '10', fill: 'rgba(240,240,240,0.75)', transform: `rotate(45 ${x} ${y})` })
    ]),

    // centro
    h('circle', { cx: '240', cy: '160', r: '14', stroke: '#c94c4c', 'stroke-width': '1', fill: 'none', opacity: '0.5' }),
    h('circle', { cx: '240', cy: '160', r: '6', fill: '#c94c4c' })
  ]);

const DesignScene = () =>
  h('svg', { viewBox: '0 0 480 320', class: 'kiba-process-svg', preserveAspectRatio: 'xMidYMid meet' }, [
    h('defs', null, [
      h('linearGradient', { id: 'designLayer', x1: '0%', y1: '0%', x2: '100%', y2: '100%' }, [
        h('stop', { offset: '0%', 'stop-color': 'rgba(201,76,76,0.18)' }),
        h('stop', { offset: '100%', 'stop-color': 'rgba(201,76,76,0.04)' })
      ])
    ]),

    // 3 layers isometrici (parallelogrammi)
    // top layer (UI)
    h('path', { d: 'M120 60 L380 60 L420 100 L160 100 Z', fill: 'url(#designLayer)', stroke: 'rgba(201,76,76,0.5)', 'stroke-width': '1' }),
    // middle (logic)
    h('path', { d: 'M100 140 L360 140 L400 180 L140 180 Z', fill: 'url(#designLayer)', stroke: 'rgba(201,76,76,0.4)', 'stroke-width': '1' }),
    // bottom (data)
    h('path', { d: 'M80 220 L340 220 L380 260 L120 260 Z', fill: 'url(#designLayer)', stroke: 'rgba(201,76,76,0.3)', 'stroke-width': '1' }),

    // labels (linee corte interne a ogni layer)
    h('line', { x1: '180', y1: '80', x2: '280', y2: '80', stroke: 'rgba(240,240,240,0.4)', 'stroke-width': '1' }),
    h('line', { x1: '160', y1: '160', x2: '260', y2: '160', stroke: 'rgba(240,240,240,0.3)', 'stroke-width': '1' }),
    h('line', { x1: '140', y1: '240', x2: '240', y2: '240', stroke: 'rgba(240,240,240,0.25)', 'stroke-width': '1' }),

    // guideline verticale che attraversa tutti
    h('line', { x1: '250', y1: '40', x2: '290', y2: '280', stroke: 'rgba(224,102,102,0.55)', 'stroke-width': '1.2', 'stroke-dasharray': '4 4' }),

    // connection points
    h('circle', { cx: '253', cy: '80', r: '4', fill: '#c94c4c' }),
    h('circle', { cx: '270', cy: '160', r: '4', fill: '#c94c4c' }),
    h('circle', { cx: '287', cy: '240', r: '4', fill: '#c94c4c' }),

    // top-right "lock/sign-off" mark
    h('circle', { cx: '420', cy: '60', r: '12', stroke: '#c94c4c', 'stroke-width': '1.2', fill: 'rgba(201,76,76,0.12)' }),
    h('path', { d: 'M415 60 L419 64 L426 56', stroke: '#e06666', 'stroke-width': '1.5', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]);

const DevelopmentScene = () =>
  h('svg', { viewBox: '0 0 480 320', class: 'kiba-process-svg', preserveAspectRatio: 'xMidYMid meet' }, [
    // main timeline
    h('line', { x1: '40', y1: '160', x2: '440', y2: '160', stroke: 'rgba(201,76,76,0.5)', 'stroke-width': '1.5' }),

    // branch up (feature)
    h('path', { d: 'M120 160 Q120 110 170 110 L290 110 Q340 110 340 160', stroke: 'rgba(255,255,255,0.25)', 'stroke-width': '1.2', fill: 'none', 'stroke-dasharray': '3 3' }),
    // branch down (hotfix)
    h('path', { d: 'M220 160 Q220 210 270 210 L320 210 Q370 210 370 160', stroke: 'rgba(255,255,255,0.15)', 'stroke-width': '1.2', fill: 'none', 'stroke-dasharray': '3 3' }),

    // main commits
    ...[60, 120, 180, 220, 280, 340, 400].map((x) =>
      h('circle', { cx: x, cy: '160', r: '5', fill: x === 280 ? '#c94c4c' : 'rgba(240,240,240,0.6)', stroke: x === 280 ? 'rgba(201,76,76,0.4)' : 'none', 'stroke-width': x === 280 ? '8' : '0' })
    ),
    // active commit ring (HEAD)
    h('circle', { cx: '280', cy: '160', r: '12', stroke: 'rgba(201,76,76,0.4)', 'stroke-width': '1', fill: 'none' }),

    // branch commits
    h('circle', { cx: '230', cy: '110', r: '4', fill: 'rgba(240,240,240,0.7)' }),
    h('circle', { cx: '280', cy: '210', r: '4', fill: 'rgba(240,240,240,0.5)' }),

    // tag/label rectangles above some commits
    h('g', { transform: 'translate(50, 116)' }, [
      h('rect', { width: '46', height: '20', rx: '4', fill: 'rgba(201,76,76,0.12)', stroke: 'rgba(201,76,76,0.35)' }),
      h('text', { x: '23', y: '14', 'text-anchor': 'middle', 'font-size': '10', 'font-weight': '600', fill: '#e06666' }, 'init')
    ]),
    h('g', { transform: 'translate(258, 116)' }, [
      h('rect', { width: '52', height: '20', rx: '4', fill: 'rgba(201,76,76,0.18)', stroke: 'rgba(201,76,76,0.55)' }),
      h('text', { x: '26', y: '14', 'text-anchor': 'middle', 'font-size': '10', 'font-weight': '600', fill: '#e06666' }, 'HEAD')
    ]),

    // staging box top right (padding sistemato: dot a sinistra, testo centrato verticalmente)
    h('g', { transform: 'translate(348, 56)' }, [
      h('rect', { width: '102', height: '28', rx: '6', fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.12)' }),
      h('circle', { cx: '14', cy: '14', r: '3.5', fill: '#4caf50' }),
      h('text', { x: '26', y: '18', 'font-size': '11', 'font-weight': '500', fill: 'rgba(240,240,240,0.78)' }, t('process.scene_staging_label'))
    ])
  ]);

const TestingScene = () =>
  h('svg', { viewBox: '0 0 480 320', class: 'kiba-process-svg', preserveAspectRatio: 'xMidYMid meet' }, [
    h('defs', null, [
      h('pattern', { id: 'shieldMesh', width: '12', height: '12', patternUnits: 'userSpaceOnUse' }, [
        h('path', { d: 'M0 12 L12 0', stroke: 'rgba(201,76,76,0.18)', 'stroke-width': '0.8' })
      ]),
      h('linearGradient', { id: 'shieldGrad', x1: '0%', y1: '0%', x2: '0%', y2: '100%' }, [
        h('stop', { offset: '0%', 'stop-color': 'rgba(201,76,76,0.22)' }),
        h('stop', { offset: '100%', 'stop-color': 'rgba(201,76,76,0.06)' })
      ])
    ]),

    // shield (kamon-inspired, angolare come l'icona Akita)
    h('path', {
      d: 'M240 50 L150 95 V175 L240 270 L330 175 V95 Z',
      fill: 'url(#shieldGrad)',
      stroke: 'rgba(224,102,102,0.7)',
      'stroke-width': '1.4'
    }),
    h('path', {
      d: 'M240 50 L150 95 V175 L240 270 L330 175 V95 Z',
      fill: 'url(#shieldMesh)',
      stroke: 'none'
    }),

    // arrows incoming (some pass, some bounce)
    // arrow 1 from left, si ferma 5px FUORI dal bordo dello scudo (a x=150),
    // poi check INTERNO. Coerente con arrow 3 (sotto).
    h('line', { x1: '40', y1: '120', x2: '145', y2: '120', stroke: 'rgba(240,240,240,0.5)', 'stroke-width': '1.2', 'marker-end': 'url(#arrowHead)' }),
    h('circle', { cx: '180', cy: '120', r: '8', stroke: '#4caf50', 'stroke-width': '1.2', fill: 'rgba(76,175,80,0.18)' }),
    h('path', { d: 'M175 120 L179 124 L186 116', stroke: '#4caf50', 'stroke-width': '1.4', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),

    // arrow 2 from right, bounces off (gi  a 5px dal bordo destro x=330)
    h('line', { x1: '440', y1: '150', x2: '335', y2: '150', stroke: 'rgba(240,240,240,0.35)', 'stroke-width': '1.2' }),
    h('line', { x1: '330', y1: '150', x2: '380', y2: '110', stroke: 'rgba(201,76,76,0.6)', 'stroke-width': '1.2', 'stroke-dasharray': '3 3' }),
    h('text', { x: '395', y: '105', 'font-size': '11', 'font-weight': '600', fill: '#e07a7a' }, '✕'),

    // arrow 3 from bottom, passes through (gi  a 5px dal bordo inferiore y=270)
    h('line', { x1: '240', y1: '290', x2: '240', y2: '275', stroke: 'rgba(240,240,240,0.4)', 'stroke-width': '1.2' }),
    h('circle', { cx: '240', cy: '230', r: '7', stroke: '#4caf50', 'stroke-width': '1.2', fill: 'rgba(76,175,80,0.18)' }),
    h('path', { d: 'M236 230 L239 233 L245 226', stroke: '#4caf50', 'stroke-width': '1.4', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),

    // center crest
    h('circle', { cx: '240', cy: '155', r: '20', fill: 'rgba(201,76,76,0.2)', stroke: 'rgba(224,102,102,0.6)', 'stroke-width': '1.2' }),
    h('path', { d: 'M232 155 L238 161 L249 148', stroke: '#e06666', 'stroke-width': '2', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]);

const HandoverScene = () =>
  h('svg', { viewBox: '0 0 480 320', class: 'kiba-process-svg', preserveAspectRatio: 'xMidYMid meet' }, [
    h('defs', null, [
      h('linearGradient', { id: 'packageGrad', x1: '0%', y1: '0%', x2: '0%', y2: '100%' }, [
        h('stop', { offset: '0%', 'stop-color': 'rgba(201,76,76,0.22)' }),
        h('stop', { offset: '100%', 'stop-color': 'rgba(201,76,76,0.06)' })
      ])
    ]),

    // Riposizionato pi  in alto per fare spazio al badge "in produzione" sotto
    // (prima si sovrapponeva alle frecce in basso).
    // Package corpo (rettangolo)
    h('rect', { x: '180', y: '100', width: '120', height: '110', rx: '6', fill: 'url(#packageGrad)', stroke: 'rgba(224,102,102,0.7)', 'stroke-width': '1.4' }),

    // Package flap aperto (sopra)
    h('path', {
      d: 'M180 100 L240 60 L300 100 Z',
      fill: 'rgba(201,76,76,0.08)',
      stroke: 'rgba(224,102,102,0.5)',
      'stroke-width': '1.2'
    }),

    // Contenuto: linee finte come "documento"
    h('rect', { x: '198', y: '125', width: '84', height: '8', rx: '2', fill: 'rgba(240,240,240,0.12)' }),
    h('rect', { x: '198', y: '140', width: '62', height: '6', rx: '2', fill: 'rgba(240,240,240,0.08)' }),

    // Sigillo centrale
    h('circle', { cx: '240', cy: '170', r: '18', fill: 'rgba(201,76,76,0.18)', stroke: 'rgba(224,102,102,0.7)', 'stroke-width': '1.2' }),
    h('path', { d: 'M232 170 L238 176 L249 163', stroke: '#e06666', 'stroke-width': '2', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),

    // ===== FRECCE + TARGET BADGES =====
    // Tutte e 4 le frecce partono dal pacco e arrivano a un badge con label,
    // niente badge vuoti.

    // Top-left: URL pubblico
    h('line', { x1: '188', y1: '108', x2: '110', y2: '70', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2' }),
    h('path', { d: 'M110 70 L120 70 M110 70 L114 78', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2', fill: 'none', 'stroke-linecap': 'round' }),
    h('g', { transform: 'translate(8, 50)' }, [
      h('rect', { width: '108', height: '26', rx: '5', fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.18)' }),
      h('circle', { cx: '14', cy: '13', r: '3.5', fill: '#4caf50' }),
      h('text', { x: '26', y: '17', 'font-size': '11', 'font-weight': '500', fill: 'rgba(240,240,240,0.85)' }, t('process.scene_target_url_label'))
    ]),

    // Top-right: Monitoring
    h('line', { x1: '292', y1: '108', x2: '370', y2: '70', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2' }),
    h('path', { d: 'M370 70 L360 70 M370 70 L366 78', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2', fill: 'none', 'stroke-linecap': 'round' }),
    h('g', { transform: 'translate(364, 50)' }, [
      h('rect', { width: '108', height: '26', rx: '5', fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.18)' }),
      h('path', { d: 'M10 17 L14 12 L18 15 L22 9 L26 14', stroke: '#e06666', 'stroke-width': '1.4', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
      h('text', { x: '34', y: '17', 'font-size': '11', 'font-weight': '500', fill: 'rgba(240,240,240,0.85)' }, t('process.scene_target_monitoring_label'))
    ]),

    // Bottom-left: Team cliente
    h('line', { x1: '188', y1: '200', x2: '110', y2: '240', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2' }),
    h('path', { d: 'M110 240 L120 240 M110 240 L114 232', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2', fill: 'none', 'stroke-linecap': 'round' }),
    h('g', { transform: 'translate(8, 246)' }, [
      h('rect', { width: '108', height: '26', rx: '5', fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.18)' }),
      // icona "team" semplice: 2 cerchietti sovrapposti
      h('circle', { cx: '13', cy: '13', r: '4', fill: 'none', stroke: 'rgba(224,102,102,0.8)', 'stroke-width': '1.4' }),
      h('circle', { cx: '20', cy: '13', r: '4', fill: 'none', stroke: 'rgba(224,102,102,0.6)', 'stroke-width': '1.4' }),
      h('text', { x: '32', y: '17', 'font-size': '11', 'font-weight': '500', fill: 'rgba(240,240,240,0.85)' }, t('process.scene_target_team_label'))
    ]),

    // Bottom-right: Documentazione
    h('line', { x1: '292', y1: '200', x2: '370', y2: '240', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2' }),
    h('path', { d: 'M370 240 L360 240 M370 240 L366 232', stroke: 'rgba(201,76,76,0.55)', 'stroke-width': '1.2', fill: 'none', 'stroke-linecap': 'round' }),
    h('g', { transform: 'translate(364, 246)' }, [
      h('rect', { width: '108', height: '26', rx: '5', fill: 'rgba(255,255,255,0.05)', stroke: 'rgba(255,255,255,0.18)' }),
      // icona "doc": rettangolino con linee
      h('rect', { x: '10', y: '8', width: '10', height: '12', rx: '1', fill: 'none', stroke: 'rgba(224,102,102,0.8)', 'stroke-width': '1.2' }),
      h('line', { x1: '13', y1: '12', x2: '17', y2: '12', stroke: 'rgba(224,102,102,0.8)', 'stroke-width': '1' }),
      h('line', { x1: '13', y1: '15', x2: '17', y2: '15', stroke: 'rgba(224,102,102,0.8)', 'stroke-width': '1' }),
      h('text', { x: '28', y: '17', 'font-size': '11', 'font-weight': '500', fill: 'rgba(240,240,240,0.85)' }, t('process.scene_target_docs_label'))
    ]),

    // Badge "in produzione" centrato sotto al pacco (padding sistemato)
    h('g', { transform: 'translate(190, 218)' }, [
      h('rect', { width: '100', height: '28', rx: '6', fill: 'rgba(76,175,80,0.15)', stroke: 'rgba(76,175,80,0.5)' }),
      h('circle', { cx: '14', cy: '14', r: '3.5', fill: '#4caf50' }),
      h('text', { x: '26', y: '18', 'font-size': '11', 'font-weight': '600', fill: '#4caf50' }, t('process.scene_deployed_label'))
    ])
  ]);

const steps = computed(() => [
  {
    id: 'discovery',
    label: t('process.step_1_label'),
    title: t('process.step_1_title'),
    description: t('process.step_1_description'),
    duration: t('process.step_1_duration'),
    highlights: readHighlights('process.step_1_highlights'),
    scene: DiscoveryScene
  },
  {
    id: 'design',
    label: t('process.step_2_label'),
    title: t('process.step_2_title'),
    description: t('process.step_2_description'),
    duration: t('process.step_2_duration'),
    highlights: readHighlights('process.step_2_highlights'),
    scene: DesignScene
  },
  {
    id: 'development',
    label: t('process.step_3_label'),
    title: t('process.step_3_title'),
    description: t('process.step_3_description'),
    duration: t('process.step_3_duration'),
    highlights: readHighlights('process.step_3_highlights'),
    scene: DevelopmentScene
  },
  {
    id: 'testing',
    label: t('process.step_4_label'),
    title: t('process.step_4_title'),
    description: t('process.step_4_description'),
    duration: t('process.step_4_duration'),
    highlights: readHighlights('process.step_4_highlights'),
    scene: TestingScene
  },
  {
    id: 'handover',
    label: t('process.step_5_label'),
    title: t('process.step_5_title'),
    description: t('process.step_5_description'),
    duration: t('process.step_5_duration'),
    highlights: readHighlights('process.step_5_highlights'),
    scene: HandoverScene
  }
]);

onMounted(async () => {
  const gsapModules = await loadGSAP();
  if (gsapModules) gsap = gsapModules.gsap;
  await nextTick();
  initializeStages();
});

onBeforeUnmount(() => {
  // Niente timer da pulire: nessun auto-play.
});

const initializeStages = () => {
  if (!contentRef.value || !gsap) return;
  const stages = contentRef.value.querySelectorAll('.kiba-process-stage');
  stages.forEach((el, idx) => {
    gsap.set(el, {
      opacity: idx === activeStepIndex.value ? 1 : 0,
      display: idx === activeStepIndex.value ? 'block' : 'none'
    });
  });
};

const goToStep = async (newIndex) => {
  if (
    newIndex < 0 ||
    newIndex >= steps.value.length ||
    newIndex === activeStepIndex.value ||
    isAnimating
  )
    return;

  const oldIndex = activeStepIndex.value;

  if (!gsap) {
    activeStepIndex.value = newIndex;
    return;
  }

  isAnimating = true;
  const stages = contentRef.value.querySelectorAll('.kiba-process-stage');
  const direction = newIndex > oldIndex ? 1 : -1;

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
    }
  });

  tl.to(stages[oldIndex], {
    opacity: 0,
    x: -16 * direction,
    duration: 0.26,
    ease: 'power2.in',
    onComplete: () => {
      gsap.set(stages[oldIndex], { display: 'none' });
    }
  });

  tl.call(() => {
    activeStepIndex.value = newIndex;
  });

  tl.set(stages[newIndex], { display: 'block', opacity: 0, x: 24 * direction });
  tl.to(stages[newIndex], {
    opacity: 1,
    x: 0,
    duration: 0.42,
    ease: 'power3.out'
  });

  // anima i pill e il numero ghost
  const pills = stages[newIndex].querySelectorAll('.kiba-process-stage-pills li');
  if (pills.length) {
    tl.fromTo(
      pills,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' },
      '-=0.25'
    );
  }

  const art = stages[newIndex].querySelector('.kiba-process-stage-art-card');
  if (art) {
    tl.fromTo(
      art,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.42, ease: 'power2.out' },
      '-=0.35'
    );
  }
};

const nextStep = () => goToStep(activeStepIndex.value + 1);
const previousStep = () => goToStep(activeStepIndex.value - 1);
</script>

<style scoped>
.kiba-process-spa {
  width: 100%;
  padding: 60px 0 80px;
  position: relative;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.kiba-process-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 40px;
}

.kiba-section-label {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--kiba-primary, #c94c4c);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 14px;
}

.kiba-section-title {
  font-size: clamp(2rem, 4vw, 2.875rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0;
}

/* Phase pills nav */
.kiba-process-pills {
  display: flex;
  gap: 8px;
  margin-bottom: 56px;
  overflow-x: auto;
  scrollbar-width: thin;
  scroll-snap-type: x mandatory;
  padding: 4px 0 12px;
  justify-content: flex-start;
}

@media (min-width: 992px) {
  .kiba-process-pills {
    justify-content: center;
    overflow: visible;
  }
}

.kiba-process-pills::-webkit-scrollbar {
  height: 3px;
}

.kiba-process-pills::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
}

.kiba-process-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 18px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  scroll-snap-align: start;
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.kiba-process-pill:hover {
  border-color: rgba(255, 255, 255, 0.18);
  color: var(--kiba-text-main, #f0f0f0);
}

.kiba-process-pill.is-active {
  background: linear-gradient(135deg, rgba(201, 76, 76, 0.16) 0%, rgba(201, 76, 76, 0.04) 100%);
  border-color: var(--kiba-primary, #c94c4c);
  color: var(--kiba-text-main, #f0f0f0);
  box-shadow: 0 8px 24px rgba(201, 76, 76, 0.15);
}

.kiba-process-pill-num {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--kiba-text-muted, #888);
  font-variant-numeric: tabular-nums;
}

.kiba-process-pill.is-active .kiba-process-pill-num {
  color: var(--kiba-primary, #c94c4c);
}

/* Scene */
.kiba-process-scene {
  position: relative;
  min-height: 480px;
}

.kiba-process-stage {
  position: relative;
  display: none;
}

.kiba-process-stage.is-active {
  display: block;
}

/* Numero ghost decorativo */
.kiba-process-ghost-num {
  position: absolute;
  top: -40px;
  left: -10px;
  font-size: clamp(10rem, 22vw, 18rem);
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(180deg, rgba(201, 76, 76, 0.06) 0%, rgba(201, 76, 76, 0) 70%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  letter-spacing: -0.02em;
}

.kiba-process-stage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Text side */
.kiba-process-stage-text {
  min-width: 0;
}

.kiba-process-stage-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--kiba-text-muted, #888);
  margin-bottom: 18px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
}

.kiba-process-stage-step {
  color: var(--kiba-primary, #c94c4c);
}

.kiba-process-stage-dot {
  color: rgba(255, 255, 255, 0.2);
}

.kiba-process-stage-title {
  font-size: clamp(1.875rem, 3.2vw, 2.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.015em;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0 0 18px;
}

.kiba-process-stage-description {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 28px;
  max-width: 540px;
}

/* Activity pills: NO check icons, NO bullet flags. Pill con barra accento. */
.kiba-process-stage-pills {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kiba-process-stage-pills li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 16px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  font-size: 0.9375rem;
  color: var(--kiba-text-main, #e8e8e8);
  line-height: 1.4;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.kiba-process-stage-pills li:hover {
  border-color: rgba(201, 76, 76, 0.3);
  background: rgba(201, 76, 76, 0.04);
}

.kiba-process-stage-pills-bar {
  width: 3px;
  height: 18px;
  background: var(--kiba-primary, #c94c4c);
  border-radius: 2px;
  flex-shrink: 0;
}

.kiba-process-stage-duration {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(201, 76, 76, 0.08);
  border: 1px solid rgba(201, 76, 76, 0.2);
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--kiba-primary, #c94c4c);
  font-weight: 600;
}

/* Illustration side */
.kiba-process-stage-art {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 360px;
}

.kiba-process-stage-art-card {
  width: 100%;
  aspect-ratio: 3 / 2;
  border-radius: 20px;
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    rgba(201, 76, 76, 0.05) 0%,
    rgba(255, 255, 255, 0.015) 50%,
    transparent 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.kiba-process-stage-art-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 0% 0%, rgba(201, 76, 76, 0.08), transparent 40%),
    radial-gradient(circle at 100% 100%, rgba(224, 102, 102, 0.06), transparent 40%);
  pointer-events: none;
}

.kiba-process-svg {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  z-index: 1;
}

/* Bottom controls */
.kiba-process-controls {
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.kiba-process-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(201, 76, 76, 0.3);
  background: rgba(201, 76, 76, 0.08);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.kiba-process-arrow:hover:not(:disabled) {
  background: var(--kiba-primary, #c94c4c);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(201, 76, 76, 0.3);
}

.kiba-process-arrow:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.kiba-process-progress {
  width: 160px;
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
}

.kiba-process-progress-fill {
  height: 100%;
  background: var(--kiba-gradient, linear-gradient(90deg, #c94c4c 0%, #e06666 100%));
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Tablet */
@media (max-width: 991px) {
  .kiba-process-spa {
    padding: 60px 0;
  }

  .kiba-process-stage-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .kiba-process-stage-art {
    order: -1;
    min-height: 280px;
  }

  .kiba-process-stage-art-card {
    max-width: 500px;
    margin: 0 auto;
  }

  .kiba-process-ghost-num {
    font-size: clamp(8rem, 20vw, 12rem);
    top: -20px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .kiba-process-spa {
    padding: 40px 0 60px;
  }

  .container {
    padding: 0 16px;
  }

  .kiba-process-header {
    margin-bottom: 28px;
  }

  .kiba-process-pills {
    margin-bottom: 32px;
  }

  .kiba-process-pill {
    padding: 9px 14px;
    font-size: 0.8125rem;
  }

  .kiba-process-stage-title {
    font-size: 1.625rem;
  }

  .kiba-process-stage-description {
    font-size: 0.9375rem;
  }

  .kiba-process-stage-pills li {
    font-size: 0.875rem;
    padding: 10px 14px;
  }

  .kiba-process-stage-art {
    min-height: 220px;
  }

  .kiba-process-ghost-num {
    font-size: 6rem;
    top: -10px;
  }

  .kiba-process-controls {
    margin-top: 32px;
    gap: 16px;
  }

  .kiba-process-arrow {
    width: 42px;
    height: 42px;
  }

  .kiba-process-progress {
    width: 100px;
  }
}
</style>
