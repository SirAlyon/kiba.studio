import { fileURLToPath } from 'node:url';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Static site generation for GitHub Pages
  typescript: {
    shim: false
  },
  nitro: {
    preset: 'github-pages', // Ottimizzato per GitHub Pages
    prerender: {
      crawlLinks: false, // Non seguire link
      failOnError: false, // Ignora errori
      routes: ['/'], // Solo index - le altre pagine saranno caricate client-side
      // Con ssr: false, il contenuto è già client-side, non serve prerender
    }
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
      ]
    }
  },
  css: [
    'swiper/css/bundle',
    '@/styles/globals.css'
  ],
  build: {
    transpile: [],
    analyze: false
  },
  vite: {
    optimizeDeps: {
      include: ['gsap', 'three', 'swiper']
    }
  },
  experimental: {
    payloadExtraction: false // Disabilita per ssr: false
  }
})
