// @ts-check

/**
 * @param {Element} elem
 */
function parse (elem) {
  try {
    const id = elem.id.substr(3) // div${id}
    const c = elem.querySelector('.div_table_radio_question')
    if (c.querySelectorAll('table').length === 1) {
      const l = elem.querySelectorAll('.div_table_radio_question > table > tbody > tr textarea').length
      return { type: 'bi', elem, id, meta: { s: true, l } }
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
    const rows = [...elem.querySelectorAll('.div_table_radio_question > table > tbody > tr')]
    return rows.map(e => e.querySelector('textarea').value).join(',')
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
    const vals = result.split(',')
    const rows = [...elem.querySelectorAll('.div_table_radio_question > table > tbody > tr')]
    rows.forEach((e, i) => { e.querySelector('textarea').value = vals[i] })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  parse,
  get,
  set
}
