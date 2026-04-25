<template>
  <div class="kiba-default-layout">
    <KibaPageNav />
    <main id="main" class="kiba-default-main">
      <slot />
    </main>
    <KibaSPAFooter />
  </div>
</template>

<script setup>
import KibaPageNav from '~/components/Kiba/KibaPageNav.vue';
import KibaSPAFooter from '~/components/Kiba/KibaSPAFooter.vue';

useHead({
  link: [
    { rel: 'stylesheet', href: '/assets/css/kiba-theme.css' },
    { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css' }
  ]
});
</script>

<style scoped>
.kiba-default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--kiba-bg-dark, #1a1a1a);
  color: var(--kiba-text-main, #e8e8e8);
}

.kiba-default-main {
  flex: 1;
}
</style>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiba-bg-dark, #1a1a1a);
  color: var(--kiba-text-main, #e8e8e8);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
