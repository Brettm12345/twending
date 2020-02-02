const {
  TsconfigPathsPlugin,
} = require('tsconfig-paths-webpack-plugin')
const { resolve } = require
module.exports = ({ config }) => {
  config.module.rules = config.module.rules.filter(
    f => f.test.toString() !== '/\\.css$/'
  );
  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader'
    ].map(resolve),
  })
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: resolve('babel-loader'),
    options: {
      presets: [resolve('babel-preset-react-app')],
    },
  })

  config.resolve.plugins = [new TsconfigPathsPlugin()]
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
