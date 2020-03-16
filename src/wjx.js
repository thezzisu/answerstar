console.log('WJX Detected')

const { Base64 } = require('js-base64')
const { pkg } = require('./common')
const ajax = require('./ajax')

let problems = []
/** @type {string} */
let tid
/** @type {Element} */
let statusElem

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
  localStorage.setItem(`fdd.${tid}.${k}`, v)
  updateStatus()
}

function _setj (k, v) {
  _sets(k, JSON.stringify(v))
  updateStatus()
}

function allowCopyPaste () {
  document.oncontextmenu = null
  document.ondragstart = null
  document.onselectstart = null
  document.querySelectorAll('textarea').forEach(x => { x.onpaste = null })
  document.querySelectorAll('input').forEach(x => { x.onpaste = null })
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
  } catch (e) { }
}

const sensibles = [
  /(姓名|名字|班级|教学班|行政班)[\s]*([(（].+[)）])?[\s]*(:|：)?$/
]

/**
 * @param {string} text
 */
function _utilsIsSensible (text) {
  text = text.trim()
  return sensibles.some(r => r.test(text))
}

function getType () {
  if (/ks\.wjx\.top\/wjx\/join\/uploadMultiple/.test(location.href)) return 3
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
    const possible = result.split('|').map(x => x.trim())
    const some = possible[Math.floor(Math.random() * possible.length)]
    elem.querySelector('textarea').value = some
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
      const list = [...c.querySelectorAll('ul > li').values()]
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
    const old = elem.querySelectorAll('.div_table_radio_question > ul > li > a.jqCheckbox.jqChecked')
    old.forEach(x => x.click())
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
function getStrByType (k) {
  const map = _getj(k)
  for (const id in map) {
    const p = problems.find(x => x.id === id)
    if (p && p.meta.s) delete map[id]
  }
  return JSON.stringify(map)
}

/**
 * @param {string} k
 */
function exportByType (k) {
  return generateLink(getStrByType(k))
}

/**
 * @param {string} val
 * @param {string} k
 */
function feedData (val, k) {
  const [ttid, pld] = val.split('$')
  if (ttid !== tid && !confirm('这不是这份试卷的答案。是否继续？')) return
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

function fastfuck () {
  _sets('sp', '')
  const submitBtn = document.getElementById('submit_button')
  submitBtn.click()
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

function updateStatus () {
  if (!statusElem) return
  const _ = s => _gets(s) ? '是' : '否'
  const content = [
    '苟利国家生死以 naÏve 岂因祸福避趋之',
    `版本: ${pkg.version} 共解析题目: ${(problems ? problems.length : 0)}`,
    `已保存我的答案: ${_('s')} 已保存正确答案: ${_('r')}`,
    `已经提交: ${_('sm')} 手速模式: ${_('sp')}`
  ]
  statusElem.innerHTML = content.join('\n')
}

function initUI () {
  const container = document.createElement('div')
  container.classList.add('fdd-menu-container')
  document.body.appendChild(container)
  let open = true

  function showMenu () {
    open = true
    container.style.display = ''
  }

  function hideMenu () {
    open = false
    container.style.display = 'none'
  }

  function createBtn (text, cb) {
    const b = document.createElement('button')
    b.textContent = text
    b.addEventListener('click', cb)
    container.appendChild(b)
    return b
  }

  function createBr () {
    const br = document.createElement('br')
    container.appendChild(br)
    return br
  }

  function create (tag) {
    const e = document.createElement(tag)
    container.appendChild(e)
    return e
  }

  statusElem = create('pre')
  statusElem.classList.add('fdd-menu-pre')
  updateStatus()

  createOpenMenuBtn(() => {
    open ? hideMenu() : showMenu()
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

      createBtn('导出我的答案', () => {
        ksGetAll()
        prompt('我的答案', exportByType('s'))
      })
      createBtn('导入我的答案', () => {
        const s = prompt('请输入')
        feedData(s, 's')
      })
      createBtn('填入我的答案', () => {
        ksSetAll('s', true)
      })
      createBtn('删除我的答案', () => {
        _sets('s', '')
      })
      createBr()
      createBtn('导入正确答案', () => {
        const s = prompt('请输入')
        feedData(s, 'r')
      })
      createBtn('提示正确答案', () => {
        ksDisplayAll('r')
      })
      createBtn('隐藏正确提示', () => {
        ksHideAll()
      })
      createBtn('填入正确答案', () => {
        ksSetAll('r', true)
      })
      createBr()
      createBtn('导出正确答案', () => {
        if (_gets('r')) {
          prompt('正确答案', exportByType('r'))
        } else {
          alert('还没有正确答案')
        }
      })
      createBtn('重新获取正确答案', () => {
        _sets('r', '')
        ajax.pick(tid).then(r => _sets('r', r)).catch(e => console.log(e))
      })
      createBtn('自暴自弃', () => {
        for (const p of problems) {
          if (p.type === 'c') {
            setC(p.elem, '1')
          } else if (p.type === 't') {
            setT(p.elem, '习习蛤蛤')
          }
        }
      })
      createBtn('切换手速模式', () => {
        _sets('sp', _gets('sp') ? '' : '1')
        if (_gets('sp')) {
          alert('刷新后将立即提交！请检查是否全部填写完成！')
        }
      })

      ksSetAll('s')
      _gets('sp') ? fastfuck() : hookPage()

      const fetchSTD = async () => {
        if (!_gets('r')) {
          let result
          try {
            result = await ajax.pick(tid)
          } catch (e) {
            console.log(e)
          }
          if (result) {
            _sets('r', result)
          }
        }
        setTimeout(() => {
          fetchSTD()
        }, 30 * 1000)
      }
      fetchSTD()
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
  let node = top.querySelector('div.data__key > div').lastChild
  if (node.tagName === 'DIV') {
    // Skip 答案解析
    node = node.previousSibling
  }
  if (node.tagName) throw new Error('No result found!')
  const val = node.textContent.trim()
  if (p.type === 'c') {
    if (p.meta.t === 0) {
      const right = p.meta.o.find(x => x[1] === val)[0]
      return [id, right]
    } else {
      const right = p.meta.o.filter(x => val.includes(x[1])).map(x => x[0]).join(',')
      return [id, right]
    }
  } else if (p.type === 't') {
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

      _sets('sm', '1')

      const { createBtn } = initUI()

      createBtn('导出我的答案', () => {
        prompt('我的答案:', exportByType('s'))
      })

      if (document.getElementById('divAnswer')) {
        try {
          const delta = jgParseResult()
          const map = _getj('s')
          for (const d of delta) {
            map[d[0]] = d[1]
          }
          let valid = true
          for (const p of problems) {
            if (!(p.id in map)) valid = false
          }

          if (valid) {
            _setj('r', map)
            createBtn('导出正确答案', () => {
              prompt('正确答案:', exportByType('r'))
            })

            ajax.store(tid, getStrByType('r')).then(() => console.log('Upload OK'))
          } else {
            alert('解析答案失败，请刷新页面')
          }
        } catch (e) {
          console.log(e)
        }
      }
    }, 100)
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
