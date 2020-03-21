const pkg = require('./package.json')

module.exports = {
  name: '答卷星',
  description: pkg.description,
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
  include: [
    'http*://ks.wjx.top/*',
    'http*://www.wjx.cn/*'
  ],
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
