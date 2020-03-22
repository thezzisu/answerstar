const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const monkey = require('./monkey.config')
const common = require('./webpack.common')
const pkg = require('./package.json')

module.exports = {
  entry: monkey.config.entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${pkg.name}.js`
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'css-loader' }, { loader: 'postcss-loader' }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin(common.generateDefinition())
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false
        }
      },
      extractComments: false
    })]
  }
}
