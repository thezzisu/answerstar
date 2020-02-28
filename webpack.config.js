const path = require('path')
const webpack = require('webpack')
const Obfuscator = require('webpack-obfuscator')
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
    new webpack.DefinePlugin(generateDefinition()),
    new Obfuscator({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      // deadCodeInjection: true,
      // deadCodeInjectionThreshold: 1,
      // debugProtection: true,
      // debugProtectionInterval: true,
      // disableConsoleOutput: true,
      // selfDefending: true,
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: 'rc4',
      stringArrayThreshold: 1,
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    })
  ]
}
