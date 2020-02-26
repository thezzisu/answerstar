const path = require('path')
const monkey = require('./monkey.config')
const header = monkey.header

header.require.push(`file://${path.join(__dirname, 'build', `${monkey.header.name.toLowerCase().replace(' ', '-')}.js`)}`)

module.exports.config = monkey.config

module.exports.header = header

module.exports.buildedHeader = () => {
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
