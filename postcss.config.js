module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env'),
    require('postcss-scrollbar'),
    require('postcss-will-change-transition'),
    require('postcss-normalize'),
    require('postcss-momentum-scrolling')([
      'hidden',
      'inherit',
    ]),
    require('cssnano'),
    require('postcss-ts-classnames'),
  ],
  syntax: 'postcss-scss',
}
