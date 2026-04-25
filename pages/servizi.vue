<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.servizi.hero_eyebrow')"
      :title="$t('pages.servizi.hero_title')"
      :subtitle="$t('pages.servizi.hero_subtitle')"
    />

    <KibaPageSection>
      <div class="services-grid">
        <article
          v-for="svc in services"
          :id="svc.anchor"
          :key="svc.key"
          class="service-card"
        >
          <div class="service-card-icon"><i :class="svc.icon"></i></div>
          <h2>{{ $t(`pages.servizi.${svc.key}.title`) }}</h2>
          <p>{{ $t(`pages.servizi.${svc.key}.description`) }}</p>
          <ul>
            <li v-for="(item, i) in tm(`pages.servizi.${svc.key}.items`)" :key="i">{{ rt(item) }}</li>
          </ul>
        </article>
      </div>
    </KibaPageSection>

    <KibaPageSection muted>
      <div class="cta-block">
        <h2>{{ $t('pages.servizi.cta_title') }}</h2>
        <p>{{ $t('pages.servizi.cta_subtitle') }}</p>
        <NuxtLink to="/contatti" class="kiba-page-cta">
          {{ $t('pages.servizi.cta_button') }}
          <i class="fas fa-arrow-right"></i>
        </NuxtLink>
      </div>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';

const { t, tm, rt } = useI18n();

const services = [
  { key: 'frontend', icon: 'fas fa-code', anchor: 'frontend' },
  { key: 'backend', icon: 'fas fa-server', anchor: 'backend' },
  { key: 'devops', icon: 'fas fa-cubes', anchor: 'devops' },
  { key: 'automation', icon: 'fas fa-robot', anchor: 'automation' },
  { key: 'consulting', icon: 'fas fa-compass', anchor: 'consulting' },
  { key: 'privacy', icon: 'fas fa-shield-halved', anchor: 'privacy' }
];

const config = useRuntimeConfig();
const url = `${config.public.siteUrl}/servizi`;

useHead(() => ({
  title: `${t('pages.servizi.hero_eyebrow')} — Kiba.Studio`,
  meta: [
    { hid: 'description', name: 'description', content: t('pages.servizi.meta_description') },
    { hid: 'og:title', property: 'og:title', content: `${t('pages.servizi.hero_eyebrow')} — Kiba.Studio` },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
}));
</script>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.service-card {
  padding: 32px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.service-card:hover {
  border-color: rgba(201, 76, 76, 0.3);
  transform: translateY(-2px);
}

.service-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 18px;
}

.service-card h2 {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 12px;
  color: var(--kiba-text-main, #e8e8e8);
}

.service-card p {
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.65;
  margin: 0 0 16px;
}

.service-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-card ul li {
  padding-left: 22px;
  position: relative;
  margin-bottom: 8px;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-size: 0.9375rem;
}

.service-card ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 12px;
  height: 1px;
  background: var(--kiba-primary, #c94c4c);
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
  box-shadow: 0 6px 20px rgba(201, 76, 76, 0.25);
  transition: transform 0.2s ease;
}

.kiba-page-cta:hover {
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .service-card {
    padding: 24px 22px;
  }
  .cta-block h2 {
    font-size: 1.5rem;
  }
}
</style>
