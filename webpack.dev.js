const path = require('path')
const monkey = require('./monkey.dev.config')
const fs = require('fs')
const webpack = require('webpack')
const moment = require('moment')
const colors = require('colors')
const common = require('./webpack.common')

if (!fs.existsSync('build')) fs.mkdirSync('build')
fs.writeFileSync('./build/header.js', monkey.buildedHeader())

console.log(
  `[${colors.grey(`${moment().format('HH:mm:ss')}`)}][${colors.grey(
    'Webpack'
  )}] ${colors.green(
    'Copy the content of build/header.js to your TamperMonkey plugin'
  )}`
)

module.exports = {
  entry: monkey.config.entry,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: monkey.header.name.toLowerCase().replace(' ', '-') + '.js'
  },
  watch: true,
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
    new webpack.DefinePlugin(common.generateDefinition(true))
  ]
}
