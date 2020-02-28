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
      return { type: 't', elem, id, meta: { i: tid } }
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
      return { type: 'c', elem, id, meta: { o, t, i: cid } }
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
 */
function ksSetAll (key) {
  const map = _getj(key) || {}
  for (const id in map) {
    const p = problems.find(x => x.id === id)
    if (p) {
      set(p.elem, p.type, map[id], false)
    } else {
      console.warn(`ID ${id} not found`)
    }
  }
}

function generateLink (val) {
  return [tid, Base64.encodeURI(val)].join('$')
}

function getData () {
  return generateLink(ksGetAll())
}

/**
 * @param {string} val
 */
function feedData (val) {
  const [ttid, pld] = val.split('$')
  if (ttid !== tid) {
    alert('Not for this paper')
    return
  }
  _sets('s', Base64.decode(pld))
}

function hookPage () {
  const submitBtn = document.getElementById('submit_button')
  const bk = submitBtn.onclick
  submitBtn.onclick = null
  submitBtn.addEventListener('click', ev => {
    // const s = getData()
    // prompt('Your answer:', s)
    if (!confirm('Are you sure to submit?')) {
      ev.preventDefault()
      return false
    }
    return bk(ev)
  })

  window.addEventListener('click', () => {
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

  createBtn('X', () => {
    hideMenu()
  })

  createOpenMenuBtn(() => {
    showMenu()
  })
  console.log('UI Init')

  return createBtn
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

      const btn = initUI()

      btn('Export my answer', () => {
        const s = getData()
        prompt('Your answer:', s)
      })
      btn('Import and replace my answer', () => {
        const s = prompt('Please paste')
        feedData(s)
      })
      btn('Restore my answer', () => {
        ksSetAll('s')
      })
      btn('Restore right answer', () => {
        ksSetAll('r')
      })

      ksSetAll('s')
      hookPage()
    }, 200)
  })

  // Jump to desktop version
  redir2desktop()
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
      const arr = val.split('|').map(x => x.trim()).filter(x => x)
      const right = p.meta.o.filter(x => arr.includes(x[1])).map(x => x[0]).join(',')
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
      const btn = initUI()

      const delta = jgParseResult()
      const map = _getj('s')
      for (const d of delta) {
        map[d[0]] = d[1]
      }
      _setj('r', map)

      btn('Export My Answer', () => {
        prompt('My answer:', generateLink(_gets('s')))
      })
      btn('Export Right Answer', () => {
        prompt('Right answer:', generateLink(_gets('r')))
      })
    }, 200)
  })
}

switch (getType()) {
  case 1:
    KSInit()
    break
  case 2:
    JGInit()
    break
}
