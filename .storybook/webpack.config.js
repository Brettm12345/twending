const {
  TsconfigPathsPlugin,
} = require('tsconfig-paths-webpack-plugin')
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.s?css$/,
    use: [
      require.resolve('style-loader'),
      require.resolve('css-loader'),
      require.resolve('postcss-loader'),
      require.resolve('sass-loader'),
    ],
  })
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')],
    },
  })

  config.resolve.plugins = [new TsconfigPathsPlugin()]
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
