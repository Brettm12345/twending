const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { pipe } = require("fp-ts/lib/pipeable");

module.exports = pipe(
  {
    transformManifest: manifest => ["/"].concat(manifest), // add the homepage to the cache
    generateInDevMode: false,
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
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
  require("next-offline")
);
