<template>
  <div>
    <KibaPageHero
      :eyebrow="$t('pages.transparency.hero_eyebrow')"
      :title="$t('pages.transparency.hero_title')"
      :subtitle="$t('pages.transparency.hero_subtitle')"
    />

    <KibaPageSection>
      <KibaLegalContent>
        <p class="last-update">{{ $t('pages.transparency.last_update') }}</p>

        <h2>{{ $t('pages.transparency.section_not_title') }}</h2>
        <ul>
          <li v-for="(item, i) in notItems" :key="i" v-html="item"></li>
        </ul>
        <p>{{ $t('pages.transparency.section_not_outro') }}</p>

        <h2>{{ $t('pages.transparency.section_what_title') }}</h2>

        <h3>{{ $t('pages.transparency.section_cookie_title') }}</h3>
        <p>
          {{ $t('pages.transparency.section_cookie_p_prefix') }}<code>{{ $t('pages.transparency.section_cookie_p_code') }}</code>{{ $t('pages.transparency.section_cookie_p_suffix') }}<NuxtLink to="/cookie">{{ $t('pages.transparency.section_cookie_p_link') }}</NuxtLink>{{ $t('pages.transparency.section_cookie_p_end') }}
        </p>

        <h3>{{ $t('pages.transparency.section_resources_title') }}</h3>
        <p>{{ $t('pages.transparency.section_resources_intro') }}</p>
        <ul>
          <li v-for="(item, i) in resourceItems" :key="i" v-html="item"></li>
        </ul>
        <p>{{ $t('pages.transparency.section_resources_outro') }}</p>

        <h3>{{ $t('pages.transparency.section_logs_title') }}</h3>
        <p>{{ $t('pages.transparency.section_logs_p') }}</p>

        <h2>{{ $t('pages.transparency.section_hosting_title') }}</h2>
        <ul>
          <li v-for="(item, i) in hostingItems" :key="i" v-html="item"></li>
        </ul>

        <h2>{{ $t('pages.transparency.section_stack_title') }}</h2>
        <p v-html="$t('pages.transparency.section_stack_p')"></p>

        <h2>{{ $t('pages.transparency.section_verify_title') }}</h2>
        <p>{{ $t('pages.transparency.section_verify_p1') }}</p>
        <p>
          {{ $t('pages.transparency.section_verify_p2_prefix') }}<a href="mailto:hello@kiba.studio">hello@kiba.studio</a>{{ $t('pages.transparency.section_verify_p2_suffix') }}
        </p>

        <h2>{{ $t('pages.transparency.section_why_title') }}</h2>
        <p>{{ $t('pages.transparency.section_why_p') }}</p>
      </KibaLegalContent>
    </KibaPageSection>
  </div>
</template>

<script setup>
import KibaPageHero from '~/components/Kiba/KibaPageHero.vue';
import KibaPageSection from '~/components/Kiba/KibaPageSection.vue';
import KibaLegalContent from '~/components/Kiba/KibaLegalContent.vue';

const { t, tm, rt } = useI18n();
const config = useRuntimeConfig();
const url = `${config.public.siteUrl}/transparency`;

const notItems = computed(() => {
  const list = tm('pages.transparency.section_not_items');
  return Array.isArray(list) ? list.map((i) => rt(i)) : [];
});

const resourceItems = computed(() => {
  const list = tm('pages.transparency.section_resources_items');
  return Array.isArray(list) ? list.map((i) => rt(i)) : [];
});

const hostingItems = computed(() => {
  const list = tm('pages.transparency.section_hosting_items');
  return Array.isArray(list) ? list.map((i) => rt(i)) : [];
});

useHead(() => ({
  title: `${t('pages.transparency.hero_eyebrow')} — Kiba.Studio`,
  meta: [
    { hid: 'description', name: 'description', content: t('pages.transparency.meta_description') },
    { hid: 'og:title', property: 'og:title', content: `${t('pages.transparency.hero_eyebrow')} — Kiba.Studio` },
    { hid: 'og:url', property: 'og:url', content: url }
  ],
  link: [{ rel: 'canonical', href: url }]
}));
</script>
