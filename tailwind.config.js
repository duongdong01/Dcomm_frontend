/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {

  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {},
    colors: {
      // Configure your color palette here
      grey_dark: '#f7f9f9',
      btn_hover: '#374151',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      gray_850: '#1c212e',
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      pink: colors.pink,
      slate: colors.slate,
      primary: '#4f46e5',
      green: colors.green
    }
  },
  plugins: []
}
