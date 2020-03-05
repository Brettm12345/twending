// @ts-nocheck

const isProduction = !process.argv.find(v =>
  v.includes('dev')
)

const dev = [
  require('tailwindcss'),
  require('postcss-preset-env'),
  require('postcss-scrollbar'),
  require('postcss-will-change-transition'),
  require('postcss-normalize'),
  require('postcss-momentum-scrolling')([
    'hidden',
    'inherit',
  ]),
  require('postcss-ts-classnames'),
]

const production = [
  require('cssnano'),
  require('@fullhuman/postcss-purgecss')({
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
