console.log('WJX Detected')

let problems = []
/** @type {string} */
let tid

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
  document.getElementById('btnNext')
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .style.display = 'none'
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
  localStorage.setItem(tid + '.p', JSON.stringify(problemsMeta))
  console.log(problems)
}

/**
 * @param {Element} elem
 */
function parseProb (elem) {
  let result
  if ((result = parseC(elem))) return result
  console.group('Unknow problem')
  console.log(elem)
  console.groupEnd()
}

/**
 * @param {Element} elem
 */
function parseC (elem) {
  const c = elem.querySelector('.div_table_radio_question')
  const id = elem.id.substr(3)
  if (c.querySelector('a.jqCheckbox') || c.querySelector('a.jqRadio')) {
    const cid = _utilsParseCID(elem)
    const o = [...elem.querySelectorAll('label').values()]
      .filter(x => x.htmlFor.startsWith(cid))
      .map(x => [x.htmlFor.substr(cid.length + 1), x.textContent.trim()])
    const t = c.querySelector('a.jqCheckbox') ? 1 : 0
    return { type: 'c', elem, id, meta: { o, t } }
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
  const checked = [...elem.querySelectorAll('a.jqChecked').values()]
  if (checked.length) {
    const b = _utilsParseCID(elem)
    return checked.map(x => x.rel.substr(b.length + 1)).join(',')
  } else {
    return ''
  }
}

/**
 * @param {Element} elem
 * @param {string} result
 */
function setC (elem, result) {
  if (!result) return
  const b = _utilsParseCID(elem)
  const options = result.split(',')
  for (const o of options) {
    const lab = elem.querySelector(`a[rel="${b}_${o}"]`)
    if (lab) {
      lab.click()
    }
  }
}

/**
 * @param {Element} elem
 * @param {string} type
 */
function get (elem, type) {
  switch (type) {
    case 'c': return getC(elem)
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
  }
}

function ksGetAll () {
  const m = localStorage.getItem(tid)
  const map = m ? JSON.parse(m) : Object.create(null)
  for (const p of problems) {
    const v = get(p.elem, p.type)
    if (v) map[p.id] = v
  }
  const v = JSON.stringify(map)
  localStorage.setItem(tid, v)
  return v
}

function ksSetAll () {
  const map = JSON.parse(localStorage.getItem(tid))
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
  return [tid, btoa(val)].join('$')
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
  localStorage.setItem(tid, atob(pld))
}

function hookPage () {
  const submitBtn = document.getElementById('submit_button')
  const bk = submitBtn.onclick
  submitBtn.onclick = null
  submitBtn.addEventListener('click', ev => {
    const s = getData()
    prompt('Your answer:', s)
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

  hideMenu()

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

      btn('Export', () => {
        const s = getData()
        prompt('Your answer:', s)
      })
      btn('Import', () => {
        const s = prompt('Please paste')
        feedData(s)
      })
      btn('Apply', () => {
        ksSetAll()
      })

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
  if (p.type === 'c' && p.meta.t === 0) {
    const val = top.querySelector('div.data__key > div > font').nextSibling.textContent.trim()
    const right = p.meta.o.find(x => x[1] === val)[0]
    return [id, right]
  }
}

function jgParseResult () {
  return [...document.querySelectorAll('img[alt="错误"]').values()]
    .map(x => jgParseFailedOne(x))
    .filter(x => x)
}

function jgRestoreProblems () {
  problems = JSON.parse(localStorage.getItem(tid + '.p'))
}

function JGInit () {
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Allow Copy/Paste
      allowCopyPaste()

      jgParseTid()
      jgRestoreProblems()
      initUI()

      const delta = jgParseResult()
      const map = JSON.parse(localStorage.getItem(tid))
      for (const d of delta) {
        map[d[0]] = d[1]
      }
      const value = JSON.stringify(map)
      localStorage.setItem(tid + '.r', value)
      prompt('Right answer:', generateLink(value))
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
