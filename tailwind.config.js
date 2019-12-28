require('typescript-require')

module.exports = {
  plugins: [
    require("tailwindcss-theming"),
    require("tailwindcss-transitions")(),
  ],
  theme: require('./src/theme').default
};
