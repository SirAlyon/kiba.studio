<template>
  <section class="kiba-page-hero">
    <div class="kiba-page-hero-inner">
      <div class="kiba-page-hero-eyebrow" v-if="eyebrow">{{ eyebrow }}</div>
      <h1 class="kiba-page-hero-title">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p v-if="subtitle || $slots.subtitle" class="kiba-page-hero-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
      <div v-if="$slots.actions" class="kiba-page-hero-actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
});
</script>

<style scoped>
.kiba-page-hero {
  padding: 100px 24px 60px;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201, 76, 76, 0.18), transparent 70%),
    var(--kiba-bg-dark, #1a1a1a);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.kiba-page-hero-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
}

.kiba-page-hero-eyebrow {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(201, 76, 76, 0.15);
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--kiba-primary, #c94c4c);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 18px;
}

.kiba-page-hero-title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--kiba-text-main, #e8e8e8);
  margin: 0 0 20px;
}

.kiba-page-hero-subtitle {
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: var(--kiba-text-secondary, #b0b0b0);
  max-width: 720px;
  margin: 0;
}

.kiba-page-hero-actions {
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .kiba-page-hero {
    padding: 80px 20px 40px;
  }
}
</style>
