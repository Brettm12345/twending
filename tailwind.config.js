require('typescript-require')

module.exports = {
  theme: require('./src/data/theme').default,
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
}
