module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-preset-env'),
    require('postcss-scrollbar'),
    require('postcss-nested'),
    require('postcss-momentum-scrolling')([
      'hidden',
      'inherit',
    ]),
    require('postcss-ts-classnames'),
    require('cssnano'),
  ],
}
