/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.edge'],
  theme: {
    extend: {
      keyframes: {
        life: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        life: 'life 4750ms linear forwards',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    themes: ['corporate'],
  },
}
