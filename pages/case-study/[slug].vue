<template>
  <div>
    <KibaPageHero
      :eyebrow="$t(`pages.case_study.cases.${i18nKey}.tag`)"
      :title="$t(`pages.case_study.cases.${i18nKey}.title`)"
      :subtitle="$t(`pages.case_study_detail.cases.${i18nKey}.summary`)"
    >
      <template #actions>
        <NuxtLink to="/case-study" class="kiba-back">
          <i class="fas fa-arrow-left"></i>
          {{ $t('pages.case_study_detail.back_label') }}
        </NuxtLink>
      </template>
    </KibaPageHero>

    <KibaPageSection>
      <div class="case-detail">
        <aside class="case-meta">
          <div class="meta-item">
            <span class="meta-label">{{ $t('pages.case_study_detail.meta_year') }}</span>
            <span class="meta-value">{{ $t(`pages.case_study.cases.${i18nKey}.year`) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">{{ $t('pages.case_study_detail.meta_category') }}</span>
            <span class="meta-value">{{ $t(`pages.case_study.cases.${i18nKey}.tag`) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">{{ $t('pages.case_study_detail.meta_stack') }}</span>
            <span class="meta-value">{{ caseData.stack.join(' · ') }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">{{ $t('pages.case_study_detail.meta_status') }}</span>
            <span class="meta-value status">{{ $t(`pages.case_study_detail.status.${caseData.statusKey}`) }}</span>
          </div>
        </aside>

        <div class="case-content">
          <section>
            <h2>{{ $t('pages.case_study_detail.section_context') }}</h2>
            <p>{{ $t(`pages.case_study_detail.cases.${i18nKey}.context`) }}</p>
          </section>
          <section>
            <h2>{{ $t('pages.case_study_detail.section_work') }}</h2>
            <p>{{ $t(`pages.case_study_detail.cases.${i18nKey}.work`) }}</p>
          </section>
          <section>
            <h2>{{ $t('pages.case_study_detail.section_results') }}</h2>
            <ul>
              <li v-for="(r, i) in tm(`pages.case_study_detail.cases.${i18nKey}.results`)" :key="i">{{ rt(r) }}</li>
            </ul>
          </section>
          <section v-if="caseData.hasNote" class="note">
            <p>{{ $t(`pages.case_study_detail.cases.${i18nKey}.note`) }}</p>
          </section>
        </div>
      </div>
    </KibaPageSection>

    <KibaPageSection muted>
      <div class="cta-block">
        <h2>{{ $t('pages.case_study_detail.cta_title') }}</h2>
        <p>{{ $t('pages.case_study_detail.cta_subtitle') }}</p>
        <NuxtLink to="/contatti" class="kiba-page-cta">
          {{ $t('pages.case_study_detail.cta_button') }}
          <i class="fas fa-arrow-right"></i>
        </NuxtLink>
      </div>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';

const route = useRoute();
const config = useRuntimeConfig();
const { t, tm, rt } = useI18n();

const cases = {
  autoimporta: {
    i18nKey: 'autoimporta',
    stack: ['PHP 8.3', 'Laravel 12', 'Filament v5', 'Horizon', 'MySQL', 'PostgreSQL'],
    statusKey: 'in_production',
    hasNote: true
  },
  'kiba-finance': {
    i18nKey: 'kiba_finance',
    stack: ['Laravel 12', 'Filament 4', 'Livewire', 'SQLite'],
    statusKey: 'in_development',
    hasNote: true
  },
  'kiba-fetch': {
    i18nKey: 'fetch',
    stack: ['Laravel', 'Filament', 'Python', 'FastAPI', 'PostgreSQL'],
    statusKey: 'in_development',
    hasNote: true
  }
};

const caseData = computed(() => cases[route.params.slug] || null);
const i18nKey = computed(() => caseData.value?.i18nKey);

if (!caseData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true });
}

const url = `${config.public.siteUrl}/case-study/${route.params.slug}`;

useHead(() => ({
  title: `${t(`pages.case_study.cases.${i18nKey.value}.title`)} — Kiba.Studio`,
  meta: [
    { hid: 'description', name: 'description', content: t(`pages.case_study_detail.cases.${i18nKey.value}.summary`) },
    { hid: 'og:title', property: 'og:title', content: `${t(`pages.case_study.cases.${i18nKey.value}.title`)} — Kiba.Studio` },
    { hid: 'og:description', property: 'og:description', content: t(`pages.case_study_detail.cases.${i18nKey.value}.summary`) },
    { hid: 'og:url', property: 'og:url', content: url },
    { hid: 'og:type', property: 'og:type', content: 'article' }
  ],
  link: [{ rel: 'canonical', href: url }]
}));
</script>

<style scoped>
.kiba-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: var(--kiba-text-secondary, #b0b0b0);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.kiba-back:hover {
  border-color: var(--kiba-primary, #c94c4c);
  color: var(--kiba-primary, #c94c4c);
}

.case-detail {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 60px;
}

.case-meta {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
}

.meta-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--kiba-text-muted, #888);
  font-weight: 600;
}

.meta-value {
  font-size: 0.9375rem;
  color: var(--kiba-text-main, #e8e8e8);
}

.meta-value.status {
  color: var(--kiba-primary, #c94c4c);
  font-weight: 600;
}

.case-content section {
  margin-bottom: 40px;
}

.case-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 14px;
  color: var(--kiba-text-main, #e8e8e8);
}

.case-content p {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0;
}

.case-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.case-content ul li {
  padding-left: 28px;
  position: relative;
  margin-bottom: 12px;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-size: 1.0625rem;
  line-height: 1.6;
}

.case-content ul li::before {
  content: '\2192';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--kiba-primary, #c94c4c);
  font-weight: 700;
}

.case-content .note {
  padding: 20px;
  background: rgba(201, 76, 76, 0.08);
  border-left: 3px solid var(--kiba-primary, #c94c4c);
  border-radius: 0 8px 8px 0;
}

.case-content .note p {
  color: var(--kiba-text-secondary, #b0b0b0);
  font-style: italic;
  font-size: 0.9375rem;
}

.cta-block {
  text-align: center;
  max-width: 620px;
  margin: 0 auto;
}

.cta-block h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.cta-block p {
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 24px;
}

.kiba-page-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .case-detail {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
