/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      // Colori Kiba.Studio (da kiba-theme.css)
      colors: {
        kiba: {
          // Base
          'bg-dark': '#1a1a1a',
          'bg-surface': '#2d2d2d',
          'bg-elevated': '#3a3a3a',
          // Primary (rosso Akita)
          'primary': '#c94c4c',
          'primary-hover': '#a83939',
          'primary-light': '#e06666',
          // Secondary (crema)
          'secondary': '#f5e6d3',
          'secondary-dark': '#d4c4b0',
          // Text
          'text-main': '#e8e8e8',
          'text-secondary': '#b0b0b0',
          'text-muted': '#888888',
        }
      },
      // Font families (già in uso)
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat Alternates', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      // Border radius custom
      borderRadius: {
        'kiba-sm': '4px',
        'kiba-md': '8px',
        'kiba-lg': '16px',
      },
      // Box shadows Kiba
      boxShadow: {
        'kiba-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'kiba-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'kiba-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      // Transizioni custom
      transitionTimingFunction: {
        'kiba': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Container breakpoints Bootstrap-like
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
}
