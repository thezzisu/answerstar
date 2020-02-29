const path = require('path')
const webpack = require('webpack')
const Obfuscator = require('webpack-obfuscator')
const monkey = require('./monkey.config')
const common = require('./webpack.common')

module.exports = {
  entry: monkey.config.entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: monkey.header.name.toLowerCase().replace(' ', '-') + '.js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
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
    new webpack.DefinePlugin(common.generateDefinition()),
    new Obfuscator({
      compact: true,
      identifierNamesGenerator: 'mangled',
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: 'rc4',
      stringArrayThreshold: 1,
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    })
  ]
}
