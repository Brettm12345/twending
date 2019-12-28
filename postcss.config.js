module.exports = {
  plugins: [
    require("tailwindcss"),
    require("postcss-preset-env"),
    require("postcss-scrollbar"),
    require("postcss-nested"),
    require("postcss-momentum-scrolling")(["hidden", "inherit"]),
    require("postcss-ts-classnames"),
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.tsx"],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    }),
    require("cssnano")
  ]
};
