const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const { pipe } = require("fp-ts/lib/pipeable");

module.exports = pipe(
  {
    webpack: config => {
      if (config.resolve.plugins) {
        config.resolve.plugins.push(new TsconfigPathsPlugin());
      } else {
        config.resolve.plugins = [new TsconfigPathsPlugin()];
      }

      return config;
    }
  },
  withFonts,
  withCSS
);
