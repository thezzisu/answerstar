console.log('WJX Detected')

const { Base64 } = require('js-base64')

let problems = []
/** @type {string} */
let tid

function _gets (k) {
  return localStorage.getItem(`fdd.${tid}.${k}`)
}

function _getj (k) {
  try {
    return JSON.parse(_gets(k))
  } catch (e) {
    console.error(e)
    return null
  }
}

function _sets (k, v) {
  return localStorage.setItem(`fdd.${tid}.${k}`, v)
}

function _setj (k, v) {
  return _sets(k, JSON.stringify(v))
}

function allowCopyPaste () {
  document.oncontextmenu = null
  document.ondragstart = null
  document.onselectstart = null
}

function redir2desktop () {
  if (/(ks\.wjx\.top\/m\/)/.test(location.href)) {
    location.href = location.href.replace(/m/, 'jq')
  }
}

function showAllOnce () {
  document.querySelectorAll('.fieldset').forEach(fs => { fs.style.display = '' })
  document.getElementById('submit_table').style.display = ''
  try {
    document.getElementById('btnNext')
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .style.display = 'none'
  } catch (e) {}
}

const sensibles = [
  /(姓名|名字|班级|教学班|行政班)[\s]*(:|：)?$/
]

/**
 * @param {string} text
 */
function _utilsIsSensible (text) {
  text = text.trim()
  return sensibles.some(r => r.test(text))
}

function getType () {
  if (/ks\.wjx\.top\/jq\//.test(location.href)) return 1
  if (/ks\.wjx\.top\/wjx\/join\//.test(location.href)) return 2
}

function ksParseTID () {
  const match = /([0-9]+)\.aspx$/.exec(location.href)
  tid = match[1]
}

function jgParseTid () {
  const match = /q=([0-9]+)/.exec(location.search)
  tid = match[1]
}

function parseKsPage () {
  const divs = document.querySelectorAll('.div_question')
  problems = [...divs.values()]
    .map(x => parseProb(x))
    .filter(x => x)
  const problemsMeta = problems.map(x => ({ id: x.id, type: x.type, meta: x.meta }))
  _setj('p', problemsMeta)
}

/**
 * @param {Element} elem
 */
function parseProb (elem) {
  let result
  if ((result = parseC(elem))) return result
  if ((result = parseT(elem))) return result
  console.group('Unknow problem')
  console.log(elem)
  console.groupEnd()
}

/**
 * @param {Element} elem
 */
function parseT (elem) {
  try {
    const id = elem.id.substr(3) // div${id}
    const c = elem.querySelector('.div_table_radio_question')
    if (c.querySelectorAll('textarea').length === 1) {
      const tid = _utilsParseTID(elem)
      const title = elem.querySelector('.div_title_question')
      const content = title.childNodes[0].textContent
      const s = _utilsIsSensible(content)
      return { type: 't', elem, id, meta: { i: tid, s } }
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function getT (elem) {
  try {
    return elem.querySelector('textarea').value
  } catch (e) {
    console.error(e)
    return ''
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function setT (elem, result) {
  try {
    elem.querySelector('textarea').value = result
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function displayT (elem, result) {
  try {
    const ta = elem.querySelector('textarea')
    const answer = document.createElement('textarea')
    answer.setAttribute('topic', 'fdd-display')
    answer.value = result
    answer.readOnly = true
    answer.style.width = '100%'
    ta.after(answer)
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function hideT (elem) {
  try {
    const d = elem.querySelector('textarea[topic="fdd-display"]')
    if (d) d.remove()
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 */
function _utilsParseTID (elem) {
  const ta = elem.querySelector('textarea')
  return ta.id
}

/**
 * @param {Element} elem
 */
function parseC (elem) {
  try {
    const c = elem.querySelector('.div_table_radio_question')
    const id = elem.id.substr(3) // div${id}
    if (c.querySelector('a.jqCheckbox') || c.querySelector('a.jqRadio')) {
      const cid = _utilsParseCID(elem)
      const ul = c.querySelector('ul')
      const list = [...ul.querySelectorAll('li').values()]
      const o = list
        .map(x => [x.querySelector('input').id.substr(cid.length + 1), x.querySelector('label').textContent.trim()])
        .filter(x => x[0])
      const t = c.querySelector('a.jqCheckbox') ? 1 : 0
      const title = elem.querySelector('.div_title_question')
      const content = title.childNodes[0].textContent
      const s = _utilsIsSensible(content)
      return { type: 'c', elem, id, meta: { o, t, i: cid, s } }
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
function getC (elem) {
  try {
    const checked = [...elem.querySelectorAll('a.jqChecked').values()]
    if (checked.length) {
      const b = _utilsParseCID(elem)
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
function setC (elem, result) {
  try {
    if (!result) return
    const b = _utilsParseCID(elem)
    const options = result.split(',')
    for (const o of options) {
      const lab = elem.querySelector(`a[rel="${b}_${o}"]`)
      if (lab) {
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
function displayC (elem, result) {
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
function hideC (elem) {
  try {
    const lis = elem.querySelectorAll('.div_table_radio_question > ul > li')
    for (const li of lis) {
      li.classList.remove('fdd-cstd')
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * @param {Element} elem
 * @param {string} type
 */
function get (elem, type) {
  switch (type) {
    case 'c': return getC(elem)
    case 't': return getT(elem)
  }
  return ''
}

/**
 * @param {Element} elem
 * @param {string} type
 */
function hide (elem, type) {
  switch (type) {
    case 'c': return hideC(elem)
    case 't': return hideT(elem)
  }
}

/**
 * @param {Element} elem
 * @param {string} type
 * @param {string} val
 * @param {boolean} override
 */
function set (elem, type, val, override) {
  if (!override && get(elem, type)) {
    return
  }
  switch (type) {
    case 'c': return setC(elem, val)
    case 't': return setT(elem, val)
  }
}

/**
 * @param {Element} elem
 * @param {string} type
 * @param {string} val
 */
function display (elem, type, val) {
  hide(elem, type)
  switch (type) {
    case 'c': return displayC(elem, val)
    case 't': return displayT(elem, val)
  }
}

function ksGetAll () {
  const map = _getj('s') || {}
  for (const p of problems) {
    const v = get(p.elem, p.type)
    if (v) map[p.id] = v
  }
  _setj('s', map)
  return _gets('s')
}

/**
 * @param {string} key
 * @param {boolean} override
 */
function ksSetAll (key, override) {
  const map = _getj(key) || {}
  for (const id in map) {
    const p = problems.find(x => x.id === id)
    if (p) {
      set(p.elem, p.type, map[id], override)
    } else {
      console.warn(`ID ${id} not found`)
    }
  }
}

/**
 * @param {string} key
 */
function ksDisplayAll (key) {
  const map = _getj(key) || {}
  for (const id in map) {
    const p = problems.find(x => x.id === id)
    if (p) {
      display(p.elem, p.type, map[id])
    } else {
      console.warn(`ID ${id} not found`)
    }
  }
}

function ksHideAll () {
  for (const p of problems) {
    hide(p.elem, p.type)
  }
}

/**
 * @param {string} val
 */
function generateLink (val) {
  return [tid, Base64.encodeURI(val)].join('$')
}

/**
 * @param {string} k
 */
function exportByType (k) {
  const map = _getj(k)
  for (const id in map) {
    const p = problems.find(x => x.id === id)
    if (p && p.meta.s) delete map[id]
  }
  return generateLink(JSON.stringify(map))
}

/**
 * @param {string} val
 * @param {string} k
 */
function feedData (val, k) {
  const [ttid, pld] = val.split('$')
  if (ttid !== tid) {
    alert('Not for this paper')
    return
  }
  _sets(k, Base64.decode(pld))
}

function hookPage () {
  const submitBtn = document.getElementById('submit_button')
  const bk = submitBtn.onclick
  submitBtn.onclick = null
  submitBtn.addEventListener('click', ev => {
    if (!confirm('Are you sure to submit?')) {
      ev.preventDefault()
      return false
    }
    return bk(ev)
  })

  document.addEventListener('click', () => {
    ksGetAll()
  })
}

function createOpenMenuBtn (cb) {
  const a = document.createElement('button')
  a.textContent = 'menu'
  a.style.zIndex = 998
  a.style.position = 'fixed'
  a.style.bottom = '32px'
  a.style.right = '32px'
  document.body.appendChild(a)
  a.addEventListener('click', cb)
}

function initUI () {
  const container = document.createElement('div')
  container.style.zIndex = 999
  container.style.position = 'fixed'
  container.style.top = '32px'
  container.style.left = '32px'
  document.body.appendChild(container)

  function showMenu () {
    container.style.display = ''
  }

  function hideMenu () {
    container.style.display = 'none'
  }

  function createBtn (text, cb) {
    const b = document.createElement('button')
    b.textContent = text
    b.addEventListener('click', cb)
    container.appendChild(b)
  }

  function createBr () {
    const br = document.createElement('br')
    container.appendChild(br)
  }

  createBtn('X', () => {
    hideMenu()
  })

  createOpenMenuBtn(() => {
    showMenu()
  })
  console.log('UI Init')

  return { createBtn, createBr }
}

function KSInit () {
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Allow Copy/Paste
      allowCopyPaste()

      ksParseTID()
      // Show in single page
      showAllOnce()
      parseKsPage()

      const { createBtn, createBr } = initUI()

      createBtn('Export my answer', () => {
        ksGetAll()
        prompt('Your answer:', exportByType('s'))
      })
      createBtn('Import and replace my answer', () => {
        const s = prompt('Please paste')
        feedData(s, 's')
      })
      createBtn('Restore my answer', () => {
        ksSetAll('s', true)
      })
      createBr()
      createBtn('Import right', () => {
        const s = prompt('Please paste')
        feedData(s, 'r')
      })
      createBtn('Display right', () => {
        ksDisplayAll('r')
      })
      createBtn('Hide', () => {
        ksHideAll()
      })
      createBtn('Restore right', () => {
        ksSetAll('r', true)
      })

      ksSetAll('s')
      hookPage()
    }, 200)
  })
}

/**
 * @param {Element} elem
 */
function jgParseFailedOne (elem) {
  const top = elem.parentElement.parentElement.parentElement
  const id = top.getAttribute('topic')
  const p = problems.find(x => x.id === id)
  if (!p) {
    console.warn('Problem not found: ' + id)
    return
  }
  if (p.type === 'c') {
    if (p.meta.t === 0) {
      const val = top.querySelector('div.data__key > div > font').nextSibling.textContent.trim()
      const right = p.meta.o.find(x => x[1] === val)[0]
      return [id, right]
    } else {
      const val = top.querySelector('div.data__key > div > font').nextSibling.textContent.trim()
      const right = p.meta.o.filter(x => val.includes(x[1])).map(x => x[0]).join(',')
      return [id, right]
    }
  } else if (p.type === 't') {
    const val = top.querySelector('div.data__key > div > font').nextSibling.textContent.trim()
    return [id, val]
  }
}

function jgParseResult () {
  return [...document.querySelectorAll('img[alt="错误"]').values()]
    .map(x => jgParseFailedOne(x))
    .filter(x => x)
}

function jgRestoreProblems () {
  problems = _getj('p')
}

function JGInit () {
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Allow Copy/Paste
      allowCopyPaste()

      jgParseTid()
      jgRestoreProblems()
      const { createBtn } = initUI()

      const delta = jgParseResult()
      const map = _getj('s')
      for (const d of delta) {
        map[d[0]] = d[1]
      }
      _setj('r', map)

      createBtn('Export My Answer', () => {
        prompt('My answer:', exportByType('s'))
      })
      createBtn('Export Right Answer', () => {
        prompt('Right answer:', exportByType('r'))
      })
    }, 200)
  })
}

redir2desktop()

switch (getType()) {
  case 1:
    KSInit()
    break
  case 2:
    JGInit()
    break
}

/* global GM_addStyle */

GM_addStyle(require('./resource/style/wjx.css').toString())
