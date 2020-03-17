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

module.exports = {
  isSensible
}
