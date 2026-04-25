<template>
  <KibaSPA />
</template>

<script setup>
import KibaSPA from '~/components/Kiba/KibaSPA.vue';

definePageMeta({
  layout: 'blank'
});

const { locale } = useI18n();
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

const meta = computed(() => {
  if (locale.value === 'en') {
    return {
      title: 'Kiba.Studio — Ethical, privacy-first software house',
      description: 'Italian boutique software house. We build ethical, secure and privacy-first web products with Laravel, Vue.js, Nuxt and Node. Zero dark patterns, GDPR by design.',
      ogLocale: 'en_US'
    };
  }
  return {
    title: 'Kiba.Studio — Software house etica e privacy-first',
    description: 'Software house boutique italiana. Sviluppiamo prodotti web etici, sicuri e privacy-first con Laravel, Vue.js, Nuxt e Node. Zero dark patterns, GDPR by design.',
    ogLocale: 'it_IT'
  };
});

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Kiba.Studio',
  legalName: 'Alessio Sada',
  url: siteUrl,
  logo: `${siteUrl}/og-image.png`,
  description: 'Software house boutique italiana. Privacy-first, GDPR by design, zero dark patterns.',
  email: 'hello@kiba.studio',
  vatID: 'IT14548540963',
  taxID: 'IT14548540963',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Milano',
    addressRegion: 'MI',
    postalCode: '20155',
    addressCountry: 'IT'
  },
  areaServed: {
    '@type': 'Country',
    name: 'Italia'
  },
  sameAs: [
    'https://github.com/SirAlyon/',
    'https://www.linkedin.com/in/alessio-sada-a380a822a/'
  ]
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Kiba.Studio',
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: ['it-IT', 'en-US']
};

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'en' ? 'en' : 'it' },
  title: meta.value.title,
  meta: [
    { hid: 'description', name: 'description', content: meta.value.description },
    { hid: 'og:title', property: 'og:title', content: meta.value.title },
    { hid: 'og:description', property: 'og:description', content: meta.value.description },
    { hid: 'og:locale', property: 'og:locale', content: meta.value.ogLocale },
    { hid: 'og:url', property: 'og:url', content: siteUrl },
    { hid: 'og:image', property: 'og:image', content: `${siteUrl}/og-image.png` },
    { hid: 'twitter:title', name: 'twitter:title', content: meta.value.title },
    { hid: 'twitter:description', name: 'twitter:description', content: meta.value.description }
  ],
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationLd)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(websiteLd)
    }
  ]
}));
</script>
