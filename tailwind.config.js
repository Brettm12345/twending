require('typescript-require')

module.exports = {
  theme: require('./src/data/theme'),
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
}
