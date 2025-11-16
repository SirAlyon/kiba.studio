<template>
  <!--
    Blank layout for Kiba.Studio SPA
    No template CSS, no WOW.js, no animations from template
    Clean slate for GSAP-based SPA
  -->
  <slot />
</template>

<script setup>
useHead({
  link: [
    // Load Kiba theme variables
    { rel: 'stylesheet', href: '/assets/css/kiba-theme.css' },
    // Load Font Awesome
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    },
    // Load Bootstrap
    { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css' }
  ]
});
</script>

<style>
/* Minimal reset for SPA */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--kiba-bg-dark, #1a1a1a);
  color: var(--kiba-text-main, #f0f0f0);
}

/* Global button reset - remove browser default focus outlines */
button {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

button:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}
</style>
