// @ts-check

const sensibles = [
  /(姓名|名字|班级|教学班|行政班)[\s]*([(（].+[)）])?[\s]*(:|：)?$/
]

/**
 * @param {string} text
 */
function isSensible (text) {
  text = text.trim()
  return sensibles.some(r => r.test(text))
}

function deleteAllCookies () {
  document.cookie.split(';')
    .forEach(function (c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })
}

module.exports = {
  isSensible,
  deleteAllCookies
}
