<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.servizi.hero_eyebrow')"
      :title="$t('pages.servizi.hero_title')"
      :subtitle="$t('pages.servizi.hero_subtitle')"
    >
      <template #actions>
        <NuxtLink to="/contatti" class="kiba-page-cta">
          {{ $t('pages.servizi.cta_button') }}
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </NuxtLink>
      </template>
    </KibaPageHero>

    <KibaPageSection v-for="(group, gIndex) in groups" :key="group.key" :muted="gIndex % 2 === 1">
      <header class="group-header">
        <span class="group-label">{{ group.label }}</span>
        <h2 class="group-title">{{ group.title }}</h2>
        <p class="group-intro">{{ group.intro }}</p>
      </header>

      <div class="services-grid">
        <article
          v-for="(svc, idx) in group.services"
          :id="svc.anchor"
          :key="svc.key"
          class="service-card"
          :class="{ 'service-card--featured': gIndex === 0 && idx === 0 }"
        >
          <!-- Decorazione angolare in SVG, puramente decorativa -->
          <svg class="service-card-decor" viewBox="0 0 120 120" aria-hidden="true">
            <path d="M0 60 Q60 0 120 60" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
            <circle cx="120" cy="60" r="2" fill="currentColor" opacity="0.5"/>
          </svg>

          <div class="service-card-num">{{ String(svc.number).padStart(2, '0') }}</div>

          <div class="service-card-icon">
            <i :class="svc.icon" aria-hidden="true"></i>
          </div>

          <h3 class="service-card-title">{{ $t(`pages.servizi.${svc.key}.title`) }}</h3>
          <p class="service-card-description">{{ $t(`pages.servizi.${svc.key}.description`) }}</p>

          <div class="service-card-block">
            <div class="service-card-block-label">{{ $t('pages.servizi.items_label') }}</div>
            <ul class="service-card-items">
              <li v-for="(item, i) in tm(`pages.servizi.${svc.key}.items`)" :key="i">
                {{ rt(item) }}
              </li>
            </ul>
          </div>

          <div class="service-card-block" v-if="stackList(svc.key).length">
            <div class="service-card-block-label">{{ $t('pages.servizi.stack_label') }}</div>
            <ul class="service-card-stack">
              <li v-for="(tech, i) in stackList(svc.key)" :key="i">
                {{ tech }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </KibaPageSection>

    <KibaPageSection>
      <div class="approach-block">
        <div class="approach-content">
          <span class="approach-label">{{ $t('process.label') }}</span>
          <h2 class="approach-title">{{ $t('pages.servizi.approach_title') }}</h2>
          <p class="approach-intro">{{ $t('pages.servizi.approach_intro') }}</p>
          <NuxtLink to="/#processo" class="approach-link">
            {{ $t('pages.servizi.approach_link') }}
          </NuxtLink>
        </div>
        <div class="approach-visual" aria-hidden="true">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="approachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#c94c4c" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#e06666" stop-opacity="0.1"/>
              </linearGradient>
            </defs>
            <!-- Linea di processo: 5 nodi -->
            <line x1="50" y1="150" x2="350" y2="150" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="4 4"/>
            <g v-for="(node, n) in 5" :key="n">
              <circle :cx="50 + (n * 75)" cy="150" r="22" fill="url(#approachGrad)" stroke="rgba(201,76,76,0.5)" stroke-width="1"/>
              <text :x="50 + (n * 75)" y="155" text-anchor="middle" font-size="13" font-weight="600" fill="#e8e8e8">{{ n + 1 }}</text>
            </g>
          </svg>
        </div>
      </div>
    </KibaPageSection>

    <KibaPageSection muted>
      <div class="cta-block">
        <h2>{{ $t('pages.servizi.cta_title') }}</h2>
        <p>{{ $t('pages.servizi.cta_subtitle') }}</p>
        <NuxtLink to="/contatti" class="kiba-page-cta">
          {{ $t('pages.servizi.cta_button') }}
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </NuxtLink>
      </div>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';

const { t, tm, rt } = useI18n();

const stackList = (key) => {
  const arr = tm(`pages.servizi.${key}.stack`);
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => rt(item));
};

const groups = computed(() => [
  {
    key: 'build',
    label: t('pages.servizi.group_build_label'),
    title: t('pages.servizi.group_build_title'),
    intro: t('pages.servizi.group_build_intro'),
    services: [
      { key: 'frontend', icon: 'fas fa-code', anchor: 'frontend', number: 1 },
      { key: 'backend', icon: 'fas fa-server', anchor: 'backend', number: 2 },
      { key: 'devops', icon: 'fas fa-cubes', anchor: 'devops', number: 3 }
    ]
  },
  {
    key: 'strengthen',
    label: t('pages.servizi.group_strengthen_label'),
    title: t('pages.servizi.group_strengthen_title'),
    intro: t('pages.servizi.group_strengthen_intro'),
    services: [
      { key: 'automation', icon: 'fas fa-robot', anchor: 'automation', number: 4 },
      { key: 'consulting', icon: 'fas fa-compass', anchor: 'consulting', number: 5 },
      { key: 'privacy', icon: 'fas fa-shield-halved', anchor: 'privacy', number: 6 }
    ]
  }
]);

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
/* Group header */
.group-header {
  text-align: left;
  margin-bottom: 40px;
  max-width: 760px;
}

.group-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--kiba-primary, #c94c4c);
  margin-bottom: 14px;
}

.group-title {
  font-size: clamp(1.625rem, 3vw, 2.125rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 12px;
  color: var(--kiba-text-main, #e8e8e8);
}

.group-intro {
  font-size: 1.0625rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.65;
  margin: 0;
}

/* Service cards */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.service-card {
  position: relative;
  padding: 32px 28px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.service-card:hover {
  border-color: rgba(201, 76, 76, 0.35);
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
}

.service-card--featured {
  grid-column: span 2;
  background: linear-gradient(180deg, rgba(201, 76, 76, 0.06) 0%, rgba(255, 255, 255, 0.015) 100%);
  border-color: rgba(201, 76, 76, 0.18);
}

.service-card-decor {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 120px;
  height: 120px;
  color: var(--kiba-primary, #c94c4c);
  pointer-events: none;
  opacity: 0.6;
}

.service-card-num {
  position: absolute;
  top: 24px;
  right: 28px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--kiba-text-muted, #777);
  font-variant-numeric: tabular-nums;
}

.service-card-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.375rem;
  flex-shrink: 0;
}

.service-card-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0;
  color: var(--kiba-text-main, #e8e8e8);
  letter-spacing: -0.005em;
}

.service-card--featured .service-card-title {
  font-size: 1.625rem;
}

.service-card-description {
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.65;
  margin: 0;
  font-size: 0.9375rem;
}

.service-card-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.service-card-block-label {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--kiba-text-muted, #888);
}

.service-card-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.service-card-items li {
  padding-left: 18px;
  position: relative;
  color: var(--kiba-text-secondary, #b0b0b0);
  font-size: 0.9rem;
  line-height: 1.5;
}

.service-card-items li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 10px;
  height: 1px;
  background: var(--kiba-primary, #c94c4c);
}

.service-card-stack {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.service-card-stack li {
  padding: 4px 10px;
  background: rgba(201, 76, 76, 0.08);
  border: 1px solid rgba(201, 76, 76, 0.18);
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--kiba-primary, #c94c4c);
  font-weight: 500;
}

/* Approach block */
.approach-block {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 48px;
}

.approach-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--kiba-primary, #c94c4c);
  margin-bottom: 14px;
}

.approach-title {
  font-size: clamp(1.625rem, 3vw, 2.125rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
  color: var(--kiba-text-main, #e8e8e8);
}

.approach-intro {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 18px;
}

.approach-link {
  color: var(--kiba-primary, #c94c4c);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.01em;
}

.approach-link:hover {
  text-decoration: underline;
}

.approach-visual {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.approach-visual svg {
  width: 100%;
  height: auto;
  max-height: 220px;
}

/* CTA block */
.cta-block {
  text-align: center;
  max-width: 620px;
  margin: 0 auto;
}

.cta-block h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}

.cta-block p {
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 24px;
  line-height: 1.6;
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.kiba-page-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(201, 76, 76, 0.35);
}

@media (max-width: 900px) {
  .approach-block {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .service-card--featured {
    grid-column: span 1;
  }

  .service-card--featured .service-card-title {
    font-size: 1.375rem;
  }
}

@media (max-width: 640px) {
  .service-card {
    padding: 26px 22px;
  }

  .service-card-decor {
    width: 90px;
    height: 90px;
  }

  .group-header {
    margin-bottom: 28px;
  }

  .cta-block h2 {
    font-size: 1.5rem;
  }

  .approach-visual {
    padding: 14px;
  }
}
</style>
