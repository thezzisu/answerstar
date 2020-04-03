const pkg = require('./package.json')

module.exports = {
  name: '答卷星',
  description: pkg.description,
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
  match: [
    'http*://ks.wjx.top/*',
    'http*://www.wjx.cn/*',
    'http*://djx.zhangzisu.cn/*'
  ],
  grant: [
    'GM.addStyle',
    'GM.xmlHttpRequest',
    'GM.notification',
    'GM.getValue',
    'GM.setValue',
    'GM.deleteValue'
  ],
  connect: [
    'v4.ipv6-test.com',
    'ip-api.com',
    'fdd.19260817.net',
    'paste.ubuntu.com'
  ],
  require: [],
  website: 'https://djx.zhangzisu.cn/',
  icon: 'https://djx.zhangzisu.cn/static/answerstar_logo.png',
  'run-at': 'document-start'
}
