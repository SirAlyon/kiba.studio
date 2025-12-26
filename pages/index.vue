<template>
  <KibaSPA />
</template>

<script setup>
import KibaSPA from '~/components/Kiba/KibaSPA.vue';

//= Page Metadata
definePageMeta({
  layout: 'blank'
});

//= Page Head
useHead({
  title: 'Kiba.Studio - Web Agency Etica',
  meta: [
    {
      name: 'description',
      content:
        'Kiba.Studio - Software etico fatto per durare. Privacy first, codice pulito, qualità senza compromessi. Laravel, Vue.js, Node, Python.'
    },
    {
      name: 'keywords',
      content:
        'web agency, sviluppo software, Laravel, Vue.js, Node.js, Python, privacy first, etica digitale'
    },
    {
      property: 'og:title',
      content: 'Kiba.Studio - Web Agency Etica'
    },
    {
      property: 'og:description',
      content: 'Software etico fatto per durare. Privacy first, qualità senza compromessi.'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
});
</script>

