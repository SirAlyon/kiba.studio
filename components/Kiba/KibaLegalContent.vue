<template>
  <article class="legal-content">
    <slot />
  </article>
</template>

<style scoped>
.legal-content {
  max-width: 760px;
  margin: 0 auto;
}

.legal-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--kiba-text-main, #e8e8e8);
  margin: 40px 0 14px;
}

.legal-content :deep(h2:first-child) {
  margin-top: 0;
}

.legal-content :deep(h3) {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--kiba-text-main, #e8e8e8);
  margin: 28px 0 10px;
}

.legal-content :deep(p) {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 14px;
}

.legal-content :deep(ul),
.legal-content :deep(ol) {
  padding-left: 22px;
  margin: 0 0 14px;
}

.legal-content :deep(ul li),
.legal-content :deep(ol li) {
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.7;
  margin-bottom: 6px;
}

.legal-content :deep(a) {
  color: var(--kiba-primary, #c94c4c);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.legal-content :deep(strong) {
  color: var(--kiba-text-main, #e8e8e8);
  font-weight: 600;
}

.legal-content :deep(.last-update) {
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
</style>
