require('typescript-require')

module.exports = {
  plugins: [
    'tailwindcss-transitions',
    'tailwindcss-typography',
    'tailwindcss-touch',
  ].map(str => require(str)()),
  theme: require('./src/data/theme').default,
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
}
