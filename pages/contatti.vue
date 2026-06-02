<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.contatti.hero_eyebrow')"
      :title="$t('pages.contatti.hero_title')"
      :subtitle="$t('pages.contatti.hero_subtitle')"
    />

    <KibaPageSection>
      <div class="contact-grid">
        <aside class="contact-info">
          <h2>{{ $t('pages.contatti.write_title') }}</h2>
          <p>{{ $t('pages.contatti.write_intro') }}</p>

          <a href="mailto:hello@kiba.studio" class="contact-link">
            <i class="fas fa-envelope" aria-hidden="true"></i>
            hello@kiba.studio
          </a>

          <dl class="contact-details">
            <div class="contact-detail">
              <dt>{{ $t('pages.contatti.label_office') }}</dt>
              <dd>{{ $t('pages.contatti.value_office') }}</dd>
            </div>
            <div class="contact-detail">
              <dt>{{ $t('pages.contatti.label_vat') }}</dt>
              <dd>IT14548540963</dd>
            </div>
            <div class="contact-detail">
              <dt>{{ $t('pages.contatti.label_response') }}</dt>
              <dd>{{ $t('pages.contatti.value_response') }}</dd>
            </div>
            <div class="contact-detail">
              <dt>{{ $t('pages.contatti.label_languages') }}</dt>
              <dd>{{ $t('pages.contatti.value_languages') }}</dd>
            </div>
          </dl>
        </aside>

        <section class="contact-form-block">
          <div class="contact-form-card">
            <h3 class="contact-form-card-title">{{ $t('pages.contatti.form_section_title') }}</h3>
            <p class="contact-form-card-intro">{{ $t('pages.contatti.form_section_intro') }}</p>
            <KibaContactForm />
          </div>
        </section>
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
import KibaContactForm from '~/components/Kiba/KibaContactForm.vue';

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
  grid-template-columns: minmax(260px, 1fr) 1.5fr;
  gap: 56px;
  align-items: start;
}

.contact-info h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}

.contact-info > p {
  color: var(--kiba-text-secondary, #b0b0b0);
  margin: 0 0 24px;
  line-height: 1.6;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: var(--kiba-gradient, linear-gradient(135deg, #c94c4c 0%, #e06666 100%));
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 32px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 18px rgba(201, 76, 76, 0.25);
}

.contact-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(201, 76, 76, 0.35);
}

.contact-details {
  margin: 0;
  padding: 0;
}

.contact-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.contact-detail dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--kiba-text-muted, #888);
  font-weight: 600;
  margin: 0;
}

.contact-detail dd {
  font-size: 0.9375rem;
  color: var(--kiba-text-main, #e8e8e8);
  margin: 0;
}

.contact-form-block {
  min-width: 0;
}

.contact-form-card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 32px;
}

.contact-form-card-title {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.005em;
  margin: 0 0 8px;
  color: var(--kiba-text-main, #e8e8e8);
}

.contact-form-card-intro {
  font-size: 0.9375rem;
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.6;
  margin: 0 0 24px;
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

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 640px) {
  .contact-form-card {
    padding: 24px 20px;
  }
  .contact-info h2 {
    font-size: 1.5rem;
  }
  .contact-form-card-title {
    font-size: 1.25rem;
  }
}
</style>
