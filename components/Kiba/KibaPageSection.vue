<template>
  <section class="kiba-page-section" :class="{ 'is-muted': muted }">
    <div class="kiba-page-section-inner" :style="maxWidth ? { maxWidth } : undefined">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  muted: { type: Boolean, default: false },
  maxWidth: { type: String, default: '' }
});
</script>

<style scoped>
.kiba-page-section {
  padding: 80px 24px;
}

.kiba-page-section.is-muted {
  background: rgba(255, 255, 255, 0.02);
}

.kiba-page-section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .kiba-page-section {
    padding: 60px 20px;
  }
}
</style>
