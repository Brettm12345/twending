require('typescript-require')

module.exports = {
  plugins: [
    'transitions',
    'typography',
    'touch',
  ].map(str => require(`tailwindcss-${str}`)()),
  theme: require('./src/data/theme').default,
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
}
