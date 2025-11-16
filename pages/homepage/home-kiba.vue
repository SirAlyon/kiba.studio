<template>
  <KibaLoading />
  <KibaNavbar />
  <div class="kiba-scroll-container">
    <KibaHero />
    <KibaAbout />
    <KibaServices />
    <KibaProcess />
    <KibaTechStack />
    <KibaPortfolio />
    <KibaContact />
  </div>
  <KibaFooter />
</template>

<script setup>
//= Kiba.Studio Page Components
import KibaLoading from '@/components/Kiba/KibaLoading';
import KibaNavbar from '@/components/Kiba/KibaNavbar';
import KibaHero from '@/components/Kiba/KibaHero';
import KibaAbout from '@/components/Kiba/KibaAbout';
import KibaServices from '@/components/Kiba/KibaServices';
import KibaProcess from '@/components/Kiba/KibaProcess';
import KibaTechStack from '@/components/Kiba/KibaTechStack';
import KibaPortfolio from '@/components/Kiba/KibaPortfolio';
import KibaContact from '@/components/Kiba/KibaContact';
import KibaFooter from '@/components/Kiba/KibaFooter';

//= Scroll animations composable
import { useScrollAnimations } from '@/composables/useScrollAnimations';

//= Initialize scroll animations
useScrollAnimations({
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px',
  once: true
});

//= Page Metadata - Using dark layout as base
definePageMeta({
  layout: "dark",
});

//= Page Head
useHead({
  titleTemplate: `%s - Kiba.Studio`,
  title: 'Software Etico su Misura',
  meta: [
    { name: 'description', content: 'Kiba.Studio - Boutique di sviluppo software etico. Privacy first, codice artigianale, soluzioni durature. Laravel, Vue.js, Node, Python.' },
    { name: 'keywords', content: 'sviluppo software, web agency, Laravel, Vue.js, Node.js, Python, privacy, etico, Italia' },
    { property: 'og:title', content: 'Kiba.Studio - Software Etico su Misura' },
    { property: 'og:description', content: 'Boutique tecnica specializzata in software etico, privacy-first e soluzioni durature.' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: '/assets/css/kiba-theme.css'
    }
  ]
});
</script>
