const {
  TsconfigPathsPlugin,
} = require('tsconfig-paths-webpack-plugin')
const { pipe } = require('fp-ts/lib/pipeable')

module.exports = pipe(
  {
    generateInDevMode: false,
    transformManifest: manifest => ['/'].concat(manifest),
    webpack: config => {
      if (config.resolve.plugins) {
        config.resolve.plugins.push(
          new TsconfigPathsPlugin()
        )
      } else {
        config.resolve.plugins = [new TsconfigPathsPlugin()]
      }
      return config
    },
    workboxOpts: {
      clientsClaim: true,
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      runtimeCaching: [
        {
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'https-calls',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              maxEntries: 150,
            },
          },
          urlPattern: /^https?.*/,
        },
      ],
      skipWaiting: true,
      swDest: 'static/service-worker.js',
    },
  },
  require('next-offline'),
  require('next-fonts'),
  require('@zeit/next-css'),
  require('@zeit/next-sass')
)
