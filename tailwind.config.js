require('typescript-require')

module.exports = {
  corePlugins: {
    borderCollapse: false,
    clear: false,
    objectFit: false,
    objectPosition: false,
    tableLayout: false,
  },
  plugins: ['caret-color'].map(p =>
    require(`tailwind-${p}`)()
  ),
  theme: require('./src/styles/theme'),
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
}
