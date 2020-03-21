// @ts-check

/**
 * @param {Element} elem
 */
function parse (elem) {
  try {
    const id = elem.id.substr(3) // div${id}
    const c = elem.querySelector('.div_table_radio_question')
    if (c.querySelectorAll('select').length === 1) {
      return { type: 'sl', elem, id, meta: { s: true } }
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function get (elem) {
  try {
    // @ts-ignore
    const v = elem.querySelector('.div_table_radio_question > select').value
    return parseInt(v) > 0 ? v : ''
  } catch (e) {
    console.error(e)
    return ''
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function set (elem, result) {
  try {
    // @ts-ignore
    elem.querySelector('.div_table_radio_question > select').value = result
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  parse,
  get,
  set
}
