// @ts-check

/**
 * @param {Element} elem
 */
function parse (elem) {
  try {
    // @ts-ignore
    const type = elem.dataNode._type
    if (type === 'gapfill') {
      const id = elem.id.substr(3) // div${id}
      const f = [...elem.querySelector('.div_title_question_all > .div_title_question').childNodes]
        // @ts-ignore
        .filter(x => !((x.tagName === 'SPAN' && ['req', 'qtypetip'].some(c => x.classList.contains(c))) || (x.tagName === 'INPUT')))
        .map(x => x.textContent).join('')
        .trim().replace(/(\s+)/g, '')
      return { type: 'g', elem, id, meta: { f } }
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
    return [...elem.querySelectorAll('input')].map(x => x.value).join(',')
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
    const rows = [...elem.querySelectorAll('input')]
    rows.forEach((e, i) => { e.value = vals[i] })
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function display (elem, result) {
}

/**
 * @param {Element} elem
 */
function hide (elem) {
}

module.exports = {
  parse,
  get,
  set,
  display,
  hide
}
