require('dotenv').config()
const {
  TsconfigPathsPlugin,
} = require('tsconfig-paths-webpack-plugin')
const { pipe } = require('fp-ts/lib/pipeable')

module.exports = pipe(
  {
    env: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
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
            cacheName: 'avatars',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
              maxEntries: 20,
            },
          },
          urlPattern: /^github?.*/,
        },
      ],
      skipWaiting: true,
      swDest: 'static/service-worker.js',
    },
  },
  require('next-offline'),
  require('@zeit/next-css')
)
