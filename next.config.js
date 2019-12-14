const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
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
  require("next-fonts"),
  require("@zeit/next-css"),
  require('next-offline')
);
