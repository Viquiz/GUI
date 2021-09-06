const colors = require('tailwindcss/colors')
module.exports = {
  theme: {
    colors: {
      sky:colors.sky
    }
  },
  purge: [
    "./src/**/*.{ts,tsx}",
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.vue"
  ]
}
