const header = require('./info')

const config = {
  entry: './src/index.js'
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
