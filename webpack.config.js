const path = require('path')
const webpack = require('webpack')
const monkey = require('./monkey.config')

function generateDefinition () {
  const d = {
    SECRET: process.env.SECRET
  }
  for (const k in d) d[k] = JSON.stringify(d[k])
  return d
}

module.exports = {
  entry: monkey.config.entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:
      monkey.header.name.toLowerCase().replace(' ', '-') + '.user.js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'post',
        use: {
          loader: 'obfuscator-loader',
          options: {
          }
        }
      },
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
    new webpack.DefinePlugin(generateDefinition()),
    new webpack.BannerPlugin({
      banner: monkey.buildedHeader(),
      raw: true
    })
  ]
}
