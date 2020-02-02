const {
  TsconfigPathsPlugin,
} = require('tsconfig-paths-webpack-plugin')
const { pipe } = require('fp-ts/lib/pipeable')

module.exports = pipe(
  {
    generateInDevMode: false,
    transformManifest: manifest => ['/'].concat(manifest),
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          ...config.resolve.plugins,
          new TsconfigPathsPlugin(),
        ],
      },
    }),
    workboxOpts: {
      clientsClaim: true,
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
  require('@zeit/next-css'),
)
