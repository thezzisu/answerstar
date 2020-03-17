const pkg = require('./package.json')

const config = {
  entry: './src/index.js'
}

const header = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  license: pkg.license,
  include: ['http*://ks.wjx.top/*'],
  require: [],
  grant: [
    'GM_addStyle',
    'GM_xmlhttpRequest'
  ],
  connect: [
    'v4.ipv6-test.com',
    'ip-api.com',
    'fdd.19260817.net'
  ]
}

exports.config = config

exports.header = header

exports.buildedHeader = () => {
  const headerString = []
  headerString.push('// ==UserScript==')
  for (const headerKey in header) {
    if (Array.isArray(header[headerKey])) {
      if (header[headerKey].length > 0) headerString.push('//')
      for (const p in header[headerKey]) {
        headerString.push(
          '// @' + headerKey.padEnd(13) + header[headerKey][p]
        )
      }
    } else {
      headerString.push(
        '// @' + headerKey.padEnd(13) + header[headerKey]
      )
    }
  }
  headerString.push('// ==/UserScript==')
  headerString.push('')
  return headerString.join('\n')
}
