import { fileURLToPath } from 'node:url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Static site generation for GitHub Pages
  typescript: {
    shim: false
  },
  nitro: {
    preset: 'github-pages' // Ottimizzato per GitHub Pages
  },
  alias: {
    "@": fileURLToPath(new URL('./', import.meta.url)),
  },
  app: {
    baseURL: '/vie_vue_3/', // Nome repository - modifica se necessario
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
        }
      ],
      script: [
        { src: "/js/wow.min.js" },
        { src: "/js/isotope.pkgd.min.js" },
        { src: "/js/pace.min.js" },
        { src: "/js/splitting.min.js" },
        { src: "/js/simpleParallax.min.js" },
      ]
    }
  },
  css: [
    'swiper/css/bundle',
    '@/styles/modal-video.css',
    '@/styles/globals.css'
  ],
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
