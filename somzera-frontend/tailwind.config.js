/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sz-yellow': '#FFBE0B',
        'sz-purple': '#3F37C9',
        'sz-blue': '#04B2D9',
        'sz-light': '#97BF04',
        'sz-dark': '#1B263B',
        'sz-gray-border': '#78A633',
        'sz-bg-gray': '#78A633'
      },
      fontFamily: {
        'retro': ['Tahoma', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        'retro-button': 'inset 1px 1px 0px rgba(255,255,255,0.8), inset -1px -1px 0px rgba(0,0,0,0.5), 1px 1px 3px rgba(0,0,0,0.3)',
        'retro-button-active': 'inset 2px 2px 4px rgba(0,0,0,0.5)',
        'retro-panel': 'inset 1px 1px 0px rgba(255,255,255,0.7), inset -1px -1px 0px rgba(0,0,0,0.4), 2px 2px 5px rgba(0,0,0,0.2)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 51%, rgba(0,0,0,0.2) 100%)',
        'header-gradient': 'linear-gradient(to bottom, #4361EE 0%, #3F37C9 100%)',
        'nav-gradient': 'linear-gradient(to bottom, #d4d4d4 0%, #a3a3a3 100%)'
      }
    },
  },
  plugins: [],
}