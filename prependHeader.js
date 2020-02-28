const fs = require('fs')
const path = require('path')
const monkey = require('./monkey.config')
const src = path.resolve(__dirname, 'dist', monkey.header.name.toLowerCase().replace(' ', '-') + '.js')
const header = monkey.buildedHeader()
const dest = path.resolve(__dirname, 'dist', monkey.header.name.toLowerCase().replace(' ', '-') + '.user.js')

fs.writeFileSync(dest, header + '\n' + fs.readFileSync(src))
