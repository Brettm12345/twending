const isProduction = !process.argv.find(v =>
  v.includes('dev')
)

const r = require

const dev = [
  r('tailwindcss'),
  ...[
    'preset-env',
    'scrollbar',
    'will-change-transition',
    'normalize',
    ['momentum-scrolling', ['hidden', 'inherit']],
    'ts-classnames',
  ].map(val =>
    Array.isArray(val)
      ? r(`postcss-${val[0]}`)(val[1])
      : r(`postcss-${val}`)
  ),
]

const production = [
  r('cssnano'),
  r('@fullhuman/postcss-purgecss')({
    // Specify the paths to all of the template files in your project
    content: ['./src/**/*.ts'],
    // Include any special characters you're using in this regular expression
    defaultExtractor: content =>
      content.match(/[\w-/:]+/g) || [],
  }),
]

module.exports = {
  plugins: isProduction ? dev.concat(production) : dev,
}
