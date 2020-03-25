// @ts-check

const { isSensible } = require('./util')

/**
 * @param {Element} elem
 */
function parse (elem) {
  try {
    const c = elem.querySelector('.div_table_radio_question')
    const id = elem.id.substr(3) // div${id}
    if (c.querySelector('a.jqCheckbox') || c.querySelector('a.jqRadio')) {
      const cid = _utilsParseCID(elem)
      const list = [...c.querySelectorAll('ul > li').values()]
      const o = list
        .map(x => [x.querySelector('input').id.substr(cid.length + 1), x.querySelector('label').textContent.trim()])
        .filter(x => x[0])
        .sort()
      const t = c.querySelector('a.jqCheckbox') ? 1 : 0
      const title = elem.querySelector('.div_title_question')
      const content = title.childNodes[0].textContent
      const s = isSensible(content)
      const f = [...elem.querySelector('.div_title_question_all > .div_title_question').childNodes]
        // @ts-ignore
        .filter(x => !(x.tagName === 'SPAN' && ['req', 'qtypetip'].some(c => x.classList.contains(c))))
        .map(x => x.textContent).join('')
        .trim().replace(/(\s+)/g, '')
      return { type: 'c', elem, id, meta: { o, t, i: cid, s, f } }
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function _utilsParseCID (elem) {
  const input = elem.querySelector('input')
  return /^(.+)_/.exec(input.id)[1]
}

/**
 * @param {Element} elem
 */
function get (elem) {
  try {
    const checked = [...elem.querySelectorAll('a.jqChecked').values()]
    if (checked.length) {
      const b = _utilsParseCID(elem)
      // @ts-ignore
      return checked.map(x => x.rel.substr(b.length + 1)).join(',')
    } else {
      return ''
    }
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
    if (!result) return
    const b = _utilsParseCID(elem)
    const options = result.split(',')
    const old = elem.querySelectorAll('.div_table_radio_question > ul > li > a.jqCheckbox.jqChecked')
    // @ts-ignore
    old.forEach(x => x.click())
    for (const o of options) {
      const lab = elem.querySelector(`a[rel="${b}_${o}"]`)
      if (lab) {
        // @ts-ignore
        lab.click()
      }
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function display (elem, result) {
  try {
    if (!result) return
    const b = _utilsParseCID(elem)
    const options = result.split(',')
    const lis = elem.querySelectorAll('.div_table_radio_question > ul > li')
    for (const li of lis) {
      li.classList.remove('fdd-cstd')
    }
    for (const o of options) {
      const lab = elem.querySelector(`a[rel="${b}_${o}"]`)
      if (lab) {
        lab.parentElement.classList.add('fdd-cstd')
      }
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function hide (elem) {
  try {
    const lis = elem.querySelectorAll('.div_table_radio_question > ul > li')
    for (const li of lis) {
      li.classList.remove('fdd-cstd')
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = { parse, get, set, display, hide }
