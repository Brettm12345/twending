require('typescript-require')

const theme = require('./src/theme').default

module.exports = {
  plugins: [
    require("tailwindcss-dark-mode")(),
    require("tailwindcss-transitions")(),
    require("tailwindcss-aspect-ratio")(),
    require("tailwindcss-debug-screens")
  ],
  theme
};
