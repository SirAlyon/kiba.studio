<template>
  <div class="kiba-hero-spa">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <!-- Colonna Sinistra: contenuto editoriale -->
        <div class="col-lg-7">
          <div class="kiba-hero-content">
            <!-- Status pill: indicatore disponibilità -->
            <div class="kiba-hero-status gsap-animate">
              <span class="kiba-hero-status-dot" aria-hidden="true"></span>
              {{ $t('hero.status_label') }}
            </div>

            <!-- Eyebrow: posizionamento + sede -->
            <div class="kiba-hero-eyebrow gsap-animate">
              <span class="kiba-hero-eyebrow-line" aria-hidden="true"></span>
              <span>{{ $t('hero.eyebrow') }}</span>
            </div>

            <!-- Headline principale con highlight gradient -->
            <h1 class="kiba-hero-title gsap-animate">
              {{ $t('hero.headline_1') }}
              <span class="kiba-hero-highlight">{{ $t('hero.headline_highlight') }}</span>
            </h1>

            <!-- Lede / subtitle -->
            <p class="kiba-hero-lede gsap-animate">
              {{ $t('hero.lede') }}
            </p>

            <!-- 3 promesse verificabili -->
            <ul class="kiba-hero-proofs gsap-animate" aria-label="$t('hero.proofs_label')">
              <li v-for="proof in proofs" :key="proof.key">
                <span class="kiba-hero-proof-icon" aria-hidden="true">
                  <i :class="proof.icon"></i>
                </span>
                <span>{{ $t(`hero.${proof.key}`) }}</span>
              </li>
            </ul>

            <!-- CTA dual -->
            <div class="kiba-hero-cta gsap-animate">
              <button class="kiba-btn kiba-btn-primary" @click="scrollToContact">
                {{ $t('hero.cta_primary') }}
                <i class="fas fa-arrow-right ms-2"></i>
              </button>
              <button class="kiba-btn kiba-btn-ghost" @click="scrollToServices">
                {{ $t('hero.cta_secondary') }}
              </button>
            </div>

            <!-- Signature line (sotto i CTA, tono confidenziale) -->
            <p class="kiba-hero-signature gsap-animate">
              <i class="fas fa-circle-info"></i>
              {{ $t('hero.signature') }}
            </p>
          </div>
        </div>

        <!-- Colonna Destra: visual sigillo -->
        <div class="col-lg-5 d-none d-lg-block">
          <div class="kiba-hero-visual">
            <KibaHeroSigil />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="kiba-hero-scroll gsap-animate">
      <span>{{ $t('hero.scroll_indicator') }}</span>
      <i class="fas fa-chevron-down"></i>
    </div>
  </div>
</template>

<script setup>
import KibaHeroSigil from './KibaHeroSigil.vue';

const emit = defineEmits(['navigate']);

const proofs = [
  { key: 'proof_1', icon: 'fas fa-key' },
  { key: 'proof_2', icon: 'fas fa-globe' },
  { key: 'proof_3', icon: 'fas fa-clock' }
];

const scrollToContact = () => {
  emit('navigate', { index: 6, sectionId: 'contatti' });
};

const scrollToServices = () => {
  emit('navigate', { index: 2, sectionId: 'servizi' });
};
</script>

<style scoped>
.kiba-hero-spa {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.kiba-hero-content {
  padding-right: 40px;
  max-width: 720px;
}

/* Status pill -------------------------------------------------------- */
.kiba-hero-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 12px;
  background: rgba(46, 160, 92, 0.1);
  border: 1px solid rgba(46, 160, 92, 0.25);
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #5dc78a;
  letter-spacing: 0.01em;
  margin-bottom: 28px;
}

.kiba-hero-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5dc78a;
  position: relative;
}

.kiba-hero-status-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: #5dc78a;
  opacity: 0.4;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(0.8); opacity: 0.4; }
  50% { transform: scale(1.6); opacity: 0; }
}

/* Eyebrow ------------------------------------------------------------ */
.kiba-hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--kiba-primary, #c94c4c);
  margin-bottom: 24px;
}

.kiba-hero-eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: var(--kiba-primary, #c94c4c);
}

/* Headline ----------------------------------------------------------- */
.kiba-hero-title {
  font-size: clamp(2.5rem, 5.2vw, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--kiba-text-main, #f0f0f0);
  margin: 0 0 24px;
}

.kiba-hero-highlight {
  background: linear-gradient(135deg, #e06666 0%, #c94c4c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline;
}

/* Lede --------------------------------------------------------------- */
.kiba-hero-lede {
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.65;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 32px;
  max-width: 580px;
}

/* Proof points ------------------------------------------------------- */
.kiba-hero-proofs {
  list-style: none;
  padding: 0;
  margin: 0 0 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
}

.kiba-hero-proofs li {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  color: var(--kiba-text-main, #e8e8e8);
  font-weight: 500;
}

.kiba-hero-proof-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
}

/* CTA --------------------------------------------------------------- */
.kiba-hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 24px;
}

.kiba-btn {
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.kiba-btn:focus-visible {
  box-shadow: 0 0 0 3px rgba(201, 76, 76, 0.4);
}

.kiba-btn-primary {
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #ffffff;
  box-shadow: 0 6px 24px rgba(201, 76, 76, 0.3);
  position: relative;
  overflow: hidden;
}

.kiba-btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.kiba-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(201, 76, 76, 0.42);
}

.kiba-btn-primary:hover::after {
  opacity: 1;
}

.kiba-btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(201, 76, 76, 0.3);
}

.kiba-btn-ghost {
  background: transparent;
  color: var(--kiba-text-main, #f0f0f0);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.kiba-btn-ghost:hover {
  border-color: var(--kiba-primary, #c94c4c);
  color: var(--kiba-primary, #c94c4c);
  background: rgba(201, 76, 76, 0.05);
}

.kiba-btn-ghost:active {
  background: rgba(201, 76, 76, 0.12);
}

.kiba-btn-ghost:focus-visible {
  border-color: var(--kiba-primary, #c94c4c);
  box-shadow: 0 0 0 3px rgba(201, 76, 76, 0.2);
}

/* Signature --------------------------------------------------------- */
.kiba-hero-signature {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  margin: 0;
  font-style: italic;
}

.kiba-hero-signature i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 0.875rem;
  font-style: normal;
}

/* Visual ------------------------------------------------------------ */
.kiba-hero-visual {
  width: 100%;
  height: 540px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scroll indicator -------------------------------------------------- */
.kiba-hero-scroll {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--kiba-text-muted, #888);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

/* Responsive -------------------------------------------------------- */
@media (max-width: 1199px) {
  .kiba-hero-title {
    font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  }
}

@media (max-width: 991px) {
  .kiba-hero-content {
    text-align: center;
    padding-right: 0;
    margin: 0 auto;
  }

  .kiba-hero-eyebrow,
  .kiba-hero-status {
    margin-left: auto;
    margin-right: auto;
  }

  .kiba-hero-eyebrow {
    justify-content: center;
  }

  .kiba-hero-lede {
    margin-left: auto;
    margin-right: auto;
  }

  .kiba-hero-proofs {
    justify-content: center;
  }

  .kiba-hero-cta {
    justify-content: center;
  }

  .kiba-hero-signature {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .kiba-hero-spa {
    display: block;
    height: auto;
    min-height: auto;
    padding: 30px 0 40px;
  }

  .kiba-hero-content {
    padding-right: 0;
  }

  .kiba-hero-status {
    font-size: 0.75rem;
    margin-bottom: 22px;
  }

  .kiba-hero-eyebrow {
    font-size: 0.75rem;
    margin-bottom: 18px;
  }

  .kiba-hero-title {
    font-size: clamp(1.875rem, 8vw, 2.5rem);
    margin-bottom: 18px;
  }

  .kiba-hero-lede {
    font-size: 1rem;
    margin-bottom: 26px;
  }

  .kiba-hero-proofs {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
  }

  .kiba-hero-cta {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 18px;
  }

  .kiba-btn {
    padding: 13px 22px;
    font-size: 0.9375rem;
    width: 100%;
  }

  .kiba-hero-signature {
    font-size: 0.8125rem;
    text-align: center;
  }

  .kiba-hero-scroll {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .kiba-hero-scroll {
    animation: none;
  }
  .kiba-hero-status-dot::after {
    animation: none;
  }
}
</style>
