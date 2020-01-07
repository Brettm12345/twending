/* eslint-disable @typescript-eslint/no-var-requires */
require('typescript-require')

module.exports = {
  plugins: [
    'tailwindcss-transitions',
    'tailwindcss-typography',
    'tailwindcss-touch',
  ].map(str => require(str)()),
  theme: require('./src/data/theme').default,
}
