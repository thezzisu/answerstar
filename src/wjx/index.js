// @ts-check

console.log('WJX Detected')

const { Base64 } = require('js-base64')
const { pkg } = require('../utils/common')
const ajax = require('./ajax')
const bi = require('./basicInfo')
const sl = require('./select')
const t = require('./text')
const c = require('./choice')

require('./addstyle')

let problems = []
/** @type {string} */
let tid
/** @type {Element} */
let statusElem

/**
 * @param {string} k
 */
function _gets (k) {
  return localStorage.getItem(`fdd.${tid}.${k}`)
}

/**
 * @param {string} k
 */
function _getj (k) {
  try {
    return JSON.parse(_gets(k))
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
 * @param {string} k
 * @param {string} v
 */
function _sets (k, v) {
  localStorage.setItem(`fdd.${tid}.${k}`, v)
  updateStatus()
}

/**
 * @param {string} k
 * @param {any} v
 */
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
  // @ts-ignore
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

function getType () {
  if (/ks\.wjx\.top\/wjx\/join\/uploadMultiple/.test(location.href)) return 3
  if (/ks\.wjx\.top\/wjx\/join\/JoinActivityRank/.test(location.href)) return 4
  if (/ks\.wjx\.top\/jq\//.test(location.href)) return 1
  if (/ks\.wjx\.top\/wjx\/join\//.test(location.href)) return 2
}

function ksParseTID () {
  const match = /([0-9]+)\.aspx/.exec(location.href)
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
  if ((result = c.parse(elem))) return result
  if ((result = t.parse(elem))) return result
  if ((result = bi.parse(elem))) return result
  if ((result = sl.parse(elem))) return result
  console.group('Unknow problem')
  console.log(elem)
  console.groupEnd()
}

/**
 * @param {Element} elem
 * @param {string} type
 */
function get (elem, type) {
  switch (type) {
    case 'c': return c.get(elem)
    case 't': return t.get(elem)
    case 'bi': return bi.get(elem)
    case 'sl': return sl.get(elem)
  }
  return ''
}

/**
 * @param {Element} elem
 * @param {string} type
 */
function hide (elem, type) {
  switch (type) {
    case 'c': return c.hide(elem)
    case 't': return t.hide(elem)
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
    case 'c': return c.set(elem, val)
    case 't': return t.set(elem, val)
    case 'bi': return bi.set(elem, val)
    case 'sl': return sl.set(elem, val)
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
    case 'c': return c.display(elem, val)
    case 't': return t.display(elem, val)
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
  let skipConfirm = false
  submitBtn.addEventListener('click', ev => {
    if (!skipConfirm && !confirm('Are you sure to submit?')) {
      ev.preventDefault()
      return false
    }
    // @ts-ignore
    return bk(ev)
  })

  document.addEventListener('click', () => {
    ksGetAll()
  })

  return () => {
    skipConfirm = true
    submitBtn.click()
  }
}

function fastfuck () {
  console.log('Fuck it!')
  _sets('sp', '')
  const submitBtn = document.getElementById('submit_button')
  submitBtn.click()
}

function createOpenMenuBtn (cb) {
  const a = document.createElement('button')
  a.textContent = 'menu'
  // @ts-ignore
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

function qiangbiStr () {
  const list = [
    '习卷江胡',
    '苟利国家',
    '谈笑风生',
    '垂死病中',
    '螳臂当车',
    '庆丰大帝',
    '小熊维尼',
    '州长夫人',
    '毛病百出',
    '积恶成习'
  ]
  return list[Math.floor(Math.random() * list.length)]
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

      ksSetAll('s', true)
      if (_gets('sp')) {
        fastfuck()
      } else {
        const { createBtn, createBr } = initUI()

        const ipBtn = createBtn('', () => {
          setIpDisplay('获取中')
          ajax.getIPv4All().then(ip => setIpDisplay(ip))
        })
        /**
         * @param {string} t
         */
        const setIpDisplay = t => {
          ipBtn.innerText = 'IP地址：' + t
        }
        ipBtn.click()
        createBr()

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
          if (_gets('r') && !confirm('已经有正确答案了，不要做无谓的牺牲！是否继续？')) return
          for (const p of problems) {
            if (p.type === 'c') {
              c.set(p.elem, '1')
            } else if (p.type === 't') {
              t.set(p.elem, qiangbiStr())
            } else if (p.type === 'sl') {
              sl.set(p.elem, '1')
            } else if (p.type === 'bi') {
              bi.set(p.elem, `${qiangbiStr()},1,20180101`)
            }
          }
        })
        createBtn('切换手速模式', () => {
          _sets('sp', _gets('sp') ? '' : '1')
          if (_gets('sp')) {
            alert('刷新后将立即提交！请检查是否全部填写完成！')
          }
        })

        const submit = hookPage()

        createBr()
        createBtn('延时提交', () => {
          const expr = prompt(
            '输入延时提交时间(ms)，支持JS表达式。确保所有空均填，否则提交失败。欲取消请刷新。',
            '5 * 60 * 1000'
          )
          let time = -1
          try {
            // eslint-disable-next-line no-eval
            const result = eval(expr)
            if (typeof result !== 'number') throw new Error('坏的表达式')
            if (!Number.isSafeInteger(result)) throw new Error('非法数字')
            time = result
          } catch (e) {
            alert(`错误：${e.message}，不会延时提交。请检查后重新操作。`)
            return
          }
          setTimeout(() => {
            submit()
          }, time)
        })

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
      }
    }, 50)
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
  // @ts-ignore
  if (node.tagName === 'DIV') {
    // Skip 答案解析
    node = node.previousSibling
  }
  // @ts-ignore
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
    }, 50)
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
