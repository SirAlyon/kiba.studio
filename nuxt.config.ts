import { fileURLToPath } from 'node:url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-11-24',
  modules: ['@nuxtjs/i18n'],
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
      redirectOn: 'root',
    }
  },
  typescript: {
    shim: false
  },
  nitro: {
    compatibilityDate: '2025-11-24'
  },
  alias: {
    "@": fileURLToPath(new URL('./', import.meta.url)),
  },
  app: {
    head: {
      title: "Kiba.Studio - Software Etico e Sicuro",
      htmlAttrs: {
        lang: 'it'
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "keywords",
          name: "keywords",
          content: "Kiba Studio, software etico, privacy first, sviluppo web, Vue, Nuxt, GDPR",
        },
        {
          hid: "description",
          name: "description",
          content: "Kiba.Studio - Software etico, sicuro e fatto per durare. Sviluppo web privacy-first.",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
          integrity: "sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==",
          crossorigin: "anonymous"
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
      autoprefixer: {},
    },
  },
  webpack: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true
      }
    }
  },
  build: {
    transpile: [
      "vue3-count-to",
      "vue3-particles"
    ]
  }
})
