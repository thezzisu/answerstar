const path = require('path')
const monkey = require('./monkey.config')
const header = monkey.header

let scriptPath = `${path.join(__dirname, 'build', `${monkey.header.name.toLowerCase().replace(' ', '-')}.js`)}`

if (process.platform === 'win32') {
  scriptPath = '/' + scriptPath.replace(/\\/g, '/')
}

header.require.push(`file://${scriptPath}`)

module.exports.config = monkey.config

module.exports.header = header

module.exports.buildedHeader = () => {
  const headerString = []
  headerString.push('// ==UserScript==')
  for (const headerKey in header) {
    let value = header[headerKey]
    if (headerKey === 'name') value = `${value}#dev`
    if (Array.isArray(value)) {
      if (value.length > 0) headerString.push('//')
      for (const p in value) {
        headerString.push(
          '// @' + headerKey.padEnd(13) + value[p]
        )
      }
    } else {
      headerString.push(
        '// @' + headerKey.padEnd(13) + value
      )
    }
  }
  headerString.push('// ==/UserScript==')
  headerString.push('')
  return headerString.join('\n')
}
