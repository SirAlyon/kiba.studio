<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.case_study.hero_eyebrow')"
      :title="$t('pages.case_study.hero_title')"
      :subtitle="$t('pages.case_study.hero_subtitle')"
    />

    <KibaPageSection>
      <div class="case-grid">
        <NuxtLink
          v-for="cs in caseStudies"
          :key="cs.slug"
          :to="`/case-study/${cs.slug}`"
          class="case-card"
        >
          <div class="case-card-meta">
            <span class="case-card-tag">{{ $t(`pages.case_study.cases.${cs.key}.tag`) }}</span>
            <span class="case-card-year">{{ $t(`pages.case_study.cases.${cs.key}.year`) }}</span>
          </div>
          <h2>{{ $t(`pages.case_study.cases.${cs.key}.title`) }}</h2>
          <p>{{ $t(`pages.case_study.cases.${cs.key}.summary`) }}</p>
          <div class="case-card-stack">
            <span v-for="t in cs.stack" :key="t">{{ t }}</span>
          </div>
          <span class="case-card-arrow">
            {{ $t('pages.case_study.discover') }}
            <i class="fas fa-arrow-right"></i>
          </span>
        </NuxtLink>
      </div>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';

const { t } = useI18n();

const caseStudies = [
  { slug: 'autoimporta', key: 'autoimporta', stack: ['PHP 8.3', 'Laravel 12', 'Filament', 'PostgreSQL'] },
  { slug: 'kiba-finance', key: 'kiba_finance', stack: ['Laravel 12', 'Filament 4', 'SQLite'] },
  { slug: 'kiba-fetch', key: 'fetch', stack: ['Laravel', 'Python', 'FastAPI', 'PostgreSQL'] }
];

const config = useRuntimeConfig();
const url = `${config.public.siteUrl}/case-study`;

useHead(() => ({
  title: `${t('pages.case_study.hero_eyebrow')} — Kiba.Studio`,
  meta: [
    { hid: 'description', name: 'description', content: t('pages.case_study.meta_description') },
    { hid: 'og:title', property: 'og:title', content: `${t('pages.case_study.hero_eyebrow')} — Kiba.Studio` },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
}));
</script>

<style scoped>
.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.case-card {
  display: block;
  padding: 32px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.case-card:hover {
  border-color: rgba(201, 76, 76, 0.4);
  transform: translateY(-2px);
}

.case-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--kiba-text-muted, #888);
}

.case-card-tag {
  color: var(--kiba-primary, #c94c4c);
  font-weight: 600;
}

.case-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: var(--kiba-text-main, #e8e8e8);
}

.case-card p {
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.65;
  margin: 0 0 18px;
}

.case-card-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.case-card-stack span {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--kiba-text-secondary, #b0b0b0);
}

.case-card-arrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--kiba-primary, #c94c4c);
  font-weight: 600;
  font-size: 0.9375rem;
}
</style>
