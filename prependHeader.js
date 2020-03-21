const fs = require('fs')
const path = require('path')
const monkey = require('./monkey.config')
const pkg = require('./package.json')

const src = path.resolve(__dirname, 'dist', `${pkg.name}.js`)
const header = monkey.buildedHeader()
const dest = path.resolve(__dirname, 'dist', `${pkg.name}.user.js`)

fs.writeFileSync(dest, header + '\n' + fs.readFileSync(src))
