const {
  TsconfigPathsPlugin,
} = require('tsconfig-paths-webpack-plugin')
const { pipe } = require('fp-ts/lib/pipeable')

const cacheableResponse = {
  statuses: [0, 200],
}

const expiration = maxEntries => ({
  maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
  maxEntries,
})

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
      runtimeCaching: [
        {
          handler: 'CacheFirst',
          options: {
            cacheName: 'avatars',
            cacheableResponse,
            expiration: expiration(20),
          },
          urlPattern: /^githubusercontent.*/,
        },
        {
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            cacheableResponse,
            expiration: expiration(150),
            networkTimeoutSeconds: 15,
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
  require('@zeit/next-css')
)
