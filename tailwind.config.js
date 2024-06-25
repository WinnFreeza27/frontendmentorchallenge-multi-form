/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    container: {
      screens: {
        width: '90%'
      },
    },
    extend: {
      fontFamily: {
        'ubuntu': ['ubuntu']
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '90%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '80%',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
          '@screen 2xl': {
            maxWidth: '1536px',
          },
        }
      })
    }
  ],
}

