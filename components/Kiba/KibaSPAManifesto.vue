<template>
  <div class="kiba-manifesto">
    <div class="kiba-manifesto-inner">
      <!-- Header -->
      <header class="kiba-manifesto-header">
        <div class="kiba-manifesto-eyebrow gsap-animate">
          <span class="kiba-manifesto-eyebrow-line"></span>
          <span>{{ $t('manifesto.label') }}</span>
        </div>
        <h2 class="kiba-manifesto-title gsap-animate">
          {{ $t('manifesto.title') }}
        </h2>
        <p class="kiba-manifesto-lede gsap-animate">
          {{ $t('manifesto.lede') }}
        </p>
      </header>

      <!-- Statement -->
      <section class="kiba-manifesto-statement">
        <div class="kiba-manifesto-statement-mark gsap-animate" aria-hidden="true">
          <KibaIcon :size="56" variant="default" :animated="false" />
        </div>
        <div class="kiba-manifesto-statement-text">
          <p class="gsap-animate">{{ $t('manifesto.statement_1') }}</p>
          <p class="gsap-animate">{{ $t('manifesto.statement_2') }}</p>
        </div>
      </section>

      <!-- Principi -->
      <section class="kiba-manifesto-principles" aria-labelledby="manifesto-principles-title">
        <h3 id="manifesto-principles-title" class="kiba-manifesto-section-label gsap-animate">
          {{ $t('manifesto.principles_label') }}
        </h3>
        <div class="kiba-manifesto-principles-grid">
          <article
            v-for="(principle, idx) in principles"
            :key="principle.key"
            class="kiba-manifesto-principle gsap-animate"
          >
            <div class="kiba-manifesto-principle-num">0{{ idx + 1 }}</div>
            <div class="kiba-manifesto-principle-icon">
              <i :class="principle.icon"></i>
            </div>
            <h4 class="kiba-manifesto-principle-title">
              {{ $t(`manifesto.principles.${principle.key}.title`) }}
            </h4>
            <p class="kiba-manifesto-principle-desc">
              {{ $t(`manifesto.principles.${principle.key}.description`) }}
            </p>
            <div class="kiba-manifesto-principle-proof">
              <i class="fas fa-check"></i>
              <span>{{ $t(`manifesto.principles.${principle.key}.proof`) }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Signature -->
      <footer class="kiba-manifesto-signature gsap-animate">
        <blockquote class="kiba-manifesto-quote">
          {{ $t('manifesto.quote') }}
        </blockquote>
        <div class="kiba-manifesto-signature-attribution">
          <span class="kiba-manifesto-signature-divider"></span>
          <span>{{ $t('manifesto.quote_attribution') }}</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import KibaIcon from './KibaIcon.vue';

const principles = [
  { key: 'ownership', icon: 'fas fa-key' },
  { key: 'privacy', icon: 'fas fa-shield-halved' },
  { key: 'honesty', icon: 'fas fa-handshake' },
  { key: 'transparency', icon: 'fas fa-eye' }
];
</script>

<style scoped>
.kiba-manifesto {
  width: 100%;
  padding: 20px 0;
}

.kiba-manifesto-inner {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header ---------------------------------------------------------------- */
.kiba-manifesto-header {
  max-width: 820px;
  margin-bottom: 80px;
}

.kiba-manifesto-eyebrow {
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

.kiba-manifesto-eyebrow-line {
  display: inline-block;
  width: 36px;
  height: 1px;
  background: var(--kiba-primary, #c94c4c);
}

.kiba-manifesto-title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--kiba-text-main, #e8e8e8);
  margin: 0 0 24px;
}

.kiba-manifesto-lede {
  font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
  line-height: 1.6;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0;
  max-width: 700px;
}

/* Statement ------------------------------------------------------------- */
.kiba-manifesto-statement {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 32px;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 80px;
}

.kiba-manifesto-statement-mark {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201, 76, 76, 0.08);
  border-radius: 16px;
  flex-shrink: 0;
}

.kiba-manifesto-statement-text {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.kiba-manifesto-statement-text p {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0;
}

.kiba-manifesto-statement-text p:first-child {
  font-size: 1.1875rem;
  color: var(--kiba-text-main, #e8e8e8);
  font-weight: 500;
}

/* Principi -------------------------------------------------------------- */
.kiba-manifesto-section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--kiba-text-muted, #888);
  margin: 0 0 32px;
}

.kiba-manifesto-principles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

.kiba-manifesto-principle {
  position: relative;
  padding: 36px 32px;
  background: var(--kiba-bg-dark, #1a1a1a);
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease;
}

.kiba-manifesto-principle:hover {
  background: rgba(201, 76, 76, 0.04);
}

.kiba-manifesto-principle-num {
  position: absolute;
  top: 24px;
  right: 28px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--kiba-text-muted, #666);
  letter-spacing: 0.1em;
  font-family: 'Manrope', monospace;
}

.kiba-manifesto-principle-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  margin-bottom: 20px;
}

.kiba-manifesto-principle-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--kiba-text-main, #e8e8e8);
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}

.kiba-manifesto-principle-desc {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 20px;
  flex: 1;
}

.kiba-manifesto-principle-proof {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--kiba-text-muted, #888);
}

.kiba-manifesto-principle-proof i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 0.6875rem;
  margin-top: 4px;
  flex-shrink: 0;
}

/* Signature ------------------------------------------------------------- */
.kiba-manifesto-signature {
  margin-top: 80px;
  padding: 48px 32px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.kiba-manifesto-quote {
  font-size: clamp(1.25rem, 2.4vw, 1.625rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.5;
  color: var(--kiba-text-main, #e8e8e8);
  margin: 0 auto 28px;
  max-width: 720px;
  letter-spacing: -0.01em;
}

.kiba-manifesto-quote::before {
  content: '\201C';
  display: block;
  font-size: 3.5rem;
  font-style: normal;
  color: var(--kiba-primary, #c94c4c);
  line-height: 0.5;
  margin-bottom: 20px;
  font-family: Georgia, serif;
}

.kiba-manifesto-signature-attribution {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--kiba-text-muted, #888);
}

.kiba-manifesto-signature-divider {
  display: inline-block;
  width: 28px;
  height: 1px;
  background: var(--kiba-primary, #c94c4c);
}

/* Responsive ------------------------------------------------------------ */
@media (max-width: 768px) {
  .kiba-manifesto-header {
    margin-bottom: 60px;
  }
  .kiba-manifesto-statement {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 0;
    margin-bottom: 60px;
  }
  .kiba-manifesto-statement-mark {
    margin: 0 auto;
  }
  .kiba-manifesto-statement-text {
    text-align: center;
  }
  .kiba-manifesto-principles-grid {
    grid-template-columns: 1fr;
  }
  .kiba-manifesto-principle {
    padding: 28px 24px;
  }
  .kiba-manifesto-signature {
    margin-top: 60px;
    padding: 36px 16px;
  }
}
</style>
