<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.contatti.hero_eyebrow')"
      :title="$t('pages.contatti.hero_title')"
      :subtitle="$t('pages.contatti.hero_subtitle')"
    />

    <KibaPageSection>
      <div class="contact-grid">
        <div class="contact-info">
          <h2>{{ $t('pages.contatti.write_title') }}</h2>
          <p>{{ $t('pages.contatti.write_intro') }}</p>

          <a href="mailto:hello@kiba.studio" class="contact-link">
            <i class="fas fa-envelope"></i>
            hello@kiba.studio
          </a>

          <div class="contact-detail">
            <span class="contact-label">{{ $t('pages.contatti.label_office') }}</span>
            <span class="contact-value">{{ $t('pages.contatti.value_office') }}</span>
          </div>
          <div class="contact-detail">
            <span class="contact-label">{{ $t('pages.contatti.label_vat') }}</span>
            <span class="contact-value">IT14548540963</span>
          </div>
          <div class="contact-detail">
            <span class="contact-label">{{ $t('pages.contatti.label_response') }}</span>
            <span class="contact-value">{{ $t('pages.contatti.value_response') }}</span>
          </div>
          <div class="contact-detail">
            <span class="contact-label">{{ $t('pages.contatti.label_languages') }}</span>
            <span class="contact-value">{{ $t('pages.contatti.value_languages') }}</span>
          </div>
        </div>

        <div class="contact-form-block">
          <div class="contact-form-placeholder">
            <div class="placeholder-icon"><i class="fas fa-envelope-open-text"></i></div>
            <h3>{{ $t('pages.contatti.form_placeholder_title') }}</h3>
            <p>
              {{ $t('pages.contatti.form_placeholder_p1') }}<a href="mailto:hello@kiba.studio">hello@kiba.studio</a>.
            </p>
            <p class="placeholder-meta">{{ $t('pages.contatti.form_placeholder_p2') }}</p>
          </div>
        </div>
      </div>
    </KibaPageSection>

    <KibaPageSection muted>
      <div class="faq-block">
        <h2>{{ $t('pages.contatti.faq_title') }}</h2>

        <div v-for="(faq, idx) in faqs" :key="idx" class="faq-item">
          <h3>{{ faq.q }}</h3>
          <p v-if="faq.a">{{ faq.a }}</p>
          <p v-else>
            {{ faq.a_prefix }}<NuxtLink to="/case-study">{{ faq.a_link }}</NuxtLink>{{ faq.a_suffix }}
          </p>
        </div>
      </div>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';

const { t, tm, rt } = useI18n();
const config = useRuntimeConfig();
const url = `${config.public.siteUrl}/contatti`;

const faqs = computed(() => {
  const list = tm('pages.contatti.faqs');
  if (!Array.isArray(list)) return [];
  return list.map((item) => ({
    q: rt(item.q),
    a: item.a ? rt(item.a) : null,
    a_prefix: item.a_prefix ? rt(item.a_prefix) : null,
    a_link: item.a_link ? rt(item.a_link) : null,
    a_suffix: item.a_suffix ? rt(item.a_suffix) : null
  }));
});

useHead(() => ({
  title: `${t('pages.contatti.hero_eyebrow')} — Kiba.Studio`,
  meta: [
    { hid: 'description', name: 'description', content: t('pages.contatti.meta_description') },
    { hid: 'og:title', property: 'og:title', content: `${t('pages.contatti.hero_eyebrow')} — Kiba.Studio` },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
}));
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 60px;
  align-items: start;
}

.contact-info h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.contact-info p {
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 28px;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 22px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 32px;
  transition: transform 0.2s ease;
}

.contact-link:hover {
  transform: translateY(-1px);
}

.contact-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.contact-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--kiba-text-muted, #888);
  font-weight: 600;
}

.contact-value {
  font-size: 0.9375rem;
  color: var(--kiba-text-main, #e8e8e8);
}

.contact-form-placeholder {
  padding: 40px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  text-align: center;
}

.placeholder-icon {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 18px;
}

.contact-form-placeholder h3 {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.contact-form-placeholder p {
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.65;
  margin: 0 0 12px;
}

.contact-form-placeholder a {
  color: var(--kiba-primary, #c94c4c);
  text-decoration: none;
  font-weight: 600;
}

.placeholder-meta {
  font-size: 0.875rem;
  color: var(--kiba-text-muted, #888);
  font-style: italic;
  margin-top: 18px;
}

.faq-block h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 32px;
}

.faq-item {
  padding: 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.faq-item h3 {
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--kiba-text-main, #e8e8e8);
}

.faq-item p {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0;
}

.faq-item :deep(a) {
  color: var(--kiba-primary, #c94c4c);
  text-decoration: none;
  font-weight: 500;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
