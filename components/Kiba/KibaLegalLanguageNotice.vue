<template>
  <div v-if="showNotice" class="kiba-legal-notice" role="note">
    <i class="fas fa-info-circle"></i>
    <p>
      This legal page is available in Italian only. Kiba.Studio is an Italian
      sole-proprietorship subject to Italian law; legal documents have effect
      in their original Italian version. For any clarification, please contact
      <a href="mailto:hello@kiba.studio">hello@kiba.studio</a>.
    </p>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const showNotice = computed(() => locale.value === 'en');
</script>

<style scoped>
.kiba-legal-notice {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  max-width: 760px;
  margin: 0 auto 32px;
  padding: 18px 22px;
  background: rgba(201, 76, 76, 0.08);
  border: 1px solid rgba(201, 76, 76, 0.25);
  border-radius: 10px;
}

.kiba-legal-notice i {
  color: var(--kiba-primary, #c94c4c);
  font-size: 1.125rem;
  margin-top: 2px;
  flex-shrink: 0;
}

.kiba-legal-notice p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.kiba-legal-notice a {
  color: var(--kiba-primary, #c94c4c);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
}
</style>
