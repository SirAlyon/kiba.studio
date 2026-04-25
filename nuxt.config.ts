import { fileURLToPath } from 'node:url';

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://kiba.studio';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-11-24',
  modules: ['@nuxtjs/i18n'],
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL
    }
  },
  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'it',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'kiba_locale',
      redirectOn: 'root'
    },
    // Permettiamo l'HTML inline nelle stringhe (usato in /transparency per
    // evidenziare nomi di servizi/tecnologie). I contenuti i18n sono
    // controllati da noi: nessun XSS surface.
    compilation: {
      strictMessage: false,
      escapeHtml: false
    }
  },
  typescript: {
    shim: false
  },
  nitro: {
    compatibilityDate: '2025-11-24'
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url))
  },
  app: {
    head: {
      title: 'Kiba.Studio — Software house etica e privacy-first',
      htmlAttrs: {
        lang: 'it'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#1a1a1a' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content: 'Software house boutique italiana. Sviluppiamo prodotti web etici, sicuri e privacy-first con Laravel, Vue.js, Nuxt e Node. Zero dark patterns, GDPR by design.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'software house Milano, sviluppo web etico, privacy first, GDPR, Laravel, Vue.js, Nuxt, software boutique, web agency Italia'
        },
        // Open Graph
        { hid: 'og:site_name', property: 'og:site_name', content: 'Kiba.Studio' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:locale', property: 'og:locale', content: 'it_IT' },
        { hid: 'og:locale:alternate', property: 'og:locale:alternate', content: 'en_US' },
        { hid: 'og:title', property: 'og:title', content: 'Kiba.Studio — Software house etica e privacy-first' },
        { hid: 'og:description', property: 'og:description', content: 'Software house boutique italiana. Sviluppiamo prodotti web etici, sicuri e privacy-first.' },
        { hid: 'og:url', property: 'og:url', content: SITE_URL },
        { hid: 'og:image', property: 'og:image', content: `${SITE_URL}/og-image.png` },
        { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
        { hid: 'og:image:height', property: 'og:image:height', content: '630' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: 'Kiba.Studio — Software house etica e privacy-first' },
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Kiba.Studio — Software house etica e privacy-first' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Software house boutique italiana. Privacy-first, zero dark patterns.' },
        { hid: 'twitter:image', name: 'twitter:image', content: `${SITE_URL}/og-image.png` }
      ],
      link: [
        // SVG: preferito dai browser moderni (Chrome, Firefox, Safari, Edge), nitido a qualsiasi dimensione
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // ICO: fallback per browser legacy
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: SITE_URL },
        { rel: 'alternate', hreflang: 'it-IT', href: SITE_URL },
        { rel: 'alternate', hreflang: 'en-US', href: SITE_URL },
        { rel: 'alternate', hreflang: 'x-default', href: SITE_URL },
        // Preconnect a Google Fonts (riduce latenza primo render)
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Montserrat+Alternates:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
          integrity: 'sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==',
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  css: [
    'swiper/css/bundle',
    '@/assets/css/tailwind.css',
    '@/styles/globals.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  build: {
    transpile: ['vue3-count-to', 'vue3-particles']
  }
});
