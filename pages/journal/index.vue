<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.journal.hero_eyebrow')"
      :title="$t('pages.journal.hero_title')"
      :subtitle="$t('pages.journal.hero_subtitle')"
    />

    <KibaPageSection>
      <div class="journal-empty">
        <div class="empty-icon"><i class="fas fa-feather-pointed"></i></div>
        <h2>{{ $t('pages.journal.empty_title') }}</h2>
        <p>{{ $t('pages.journal.empty_intro') }}</p>
        <ul class="topics-list">
          <li v-for="(topic, i) in topics" :key="i">{{ topic }}</li>
        </ul>
        <p class="empty-note">
          {{ $t('pages.journal.empty_note_prefix') }}<a href="mailto:hello@kiba.studio">hello@kiba.studio</a>{{ $t('pages.journal.empty_note_suffix') }}
        </p>
      </div>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';

const { t, tm, rt } = useI18n();
const config = useRuntimeConfig();
const url = `${config.public.siteUrl}/journal`;

const topics = computed(() => {
  const list = tm('pages.journal.topics');
  return Array.isArray(list) ? list.map((item) => rt(item)) : [];
});

useHead(() => ({
  title: `${t('pages.journal.hero_eyebrow')} — Kiba.Studio`,
  meta: [
    { hid: 'description', name: 'description', content: t('pages.journal.meta_description') },
    { hid: 'og:title', property: 'og:title', content: `${t('pages.journal.hero_eyebrow')} — Kiba.Studio` },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
}));
</script>

<style scoped>
.journal-empty {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(201, 76, 76, 0.12);
  color: var(--kiba-primary, #c94c4c);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 22px;
}

.journal-empty h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 14px;
}

.journal-empty p {
  color: var(--kiba-text-secondary, #b0b0b0);
  line-height: 1.65;
  margin: 0 0 18px;
}

.topics-list {
  text-align: left;
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 8px 0 28px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px 28px;
}

.topics-list li {
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  color: var(--kiba-text-main, #e8e8e8);
  font-size: 0.9375rem;
}

.topics-list li:first-child {
  border-top: none;
}

.empty-note {
  font-size: 0.9375rem;
  color: var(--kiba-text-muted, #888);
}

.empty-note a {
  color: var(--kiba-primary, #c94c4c);
  font-weight: 500;
  text-decoration: none;
}
</style>
