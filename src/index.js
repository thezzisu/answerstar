// @ts-check

/* global BUILD */

console.log('欢迎使用%c答卷星', 'color: #1ea0fa')

const { Base64 } = require('js-base64')
const { pkg } = require('./utils/common')
const toastr = require('toastr')
const ajax = require('./ajax')
const bi = require('./basicInfo')
const sl = require('./select')
const t = require('./text')
const c = require('./choice')
const wjx = require('./reverseWjx')

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

function redirToSecure () {
  if (/^http:\/\//.test(location.href)) {
    location.href = location.href.replace(/http/, 'https')
  }
}

function redirToDesktop () {
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

function getPageType () {
  if (/wjx\.cn\/jq\//.test(location.href)) return 5
  if (/ks\.wjx\.top\/wjx\/join\/uploadMultiple/.test(location.href)) return 3
  if (/ks\.wjx\.top\/wjx\/join\/JoinActivityRank/.test(location.href)) return 4
  if (/ks\.wjx\.top\/jq\//.test(location.href)) return 1
  if (/ks\.wjx\.top\/wjx\/join\//.test(location.href)) return 2
}

function probParseAll () {
  const divs = document.querySelectorAll('.div_question')
  problems = [...divs.values()]
    .map(x => probParseOne(x))
    .filter(x => x)
  const problemsMeta = problems.map(x => ({ id: x.id, type: x.type, meta: x.meta }))
  _setj('p', problemsMeta)
}

/**
 * @param {Element} elem
 */
function probParseOne (elem) {
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

function probGetAll () {
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
function probSetAll (key, override) {
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
function probDisplayAll (key) {
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

function probHideAll () {
  for (const p of problems) {
    hide(p.elem, p.type)
  }
}

/**
 * @param {string} val
 */
function generateLink (val) {
  const addMeta = confirm('是否附加元数据(很长)？')
  if (addMeta) {
    return [tid, Base64.encodeURI(getMetaDataStr())].join('$')
  } else {
    return [tid, Base64.encodeURI(val)].join('$')
  }
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
function exportResultToClipboard (k) {
  return writeToClipboard(generateLink(getStrByType(k)))
}

function readFromClipboardFallback () {
  return prompt('请粘贴：', '')
}

async function readFromClipboardUnsafe () {
  if (navigator.clipboard) {
    return navigator.clipboard.readText()
  } else {
    return readFromClipboardFallback()
  }
}

async function readFromClipboard () {
  const text = await readFromClipboardUnsafe()
  if (!text.startsWith('djx!')) throw new Error('剪贴板中没有数据，请检查')
  return text.substr(4)
}

/**
 * @param {string} text
 */
function writeToClipboardFallback (text) {
  prompt('请复制：', text)
}

/**
 * @param {string} text
 */
function writeToClipboard (text) {
  text = 'djx!' + text
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => toastr.success('已导出至粘贴板'))
      .catch(e => toastr.error('导出失败'))
  } else {
    writeToClipboardFallback(text)
  }
}

/**
 * @param {string} encoded
 */
function safeDecode (encoded) {
  try {
    return Base64.decode(encoded)
  } catch (e) {
    return ''
  }
}

/**
 * @param {string} k
 */
async function importResultFromClipboard (k) {
  try {
    const val = await readFromClipboard()
    const [ttid, pld, md] = val.split('$')
    if (ttid !== tid) {
      // @ts-ignore
      const metastr = safeDecode(md) || await ajax.pick(ttid + '.md')
      if (!metastr) throw new Error('跨卷匹配需要元数据。请选择附加元数据的导出方法')
      const meta = JSON.parse(metastr)
      const data = JSON.parse(safeDecode(pld))
      const result = {}
      for (const id in data) {
        const m = meta[id]
        if (!m) continue
        const p = problems.find(x => x.meta.f === m.f)
        if (!p) continue
        if (p.type === 't') {
          result[p.id] = data[id]
        } else if (p.type === 'c') {
          const tids = data[id]
          const val = m.o.filter(x => tids.includes(x[0])).map(x => x[1]).join('|')
          const right = p.meta.o.filter(x => val.includes(x[1])).map(x => x[0]).join(',')
          if (!right) continue
          result[p.id] = right
        }
      }
      _setj(k, result)
    } else {
      _sets(k, safeDecode(pld))
    }
    toastr.info('导入成功')
  } catch (e) {
    toastr.error('导入错误: ' + e.message)
  }
}

function hookPage () {
  const submitBtn = document.getElementById('submit_button')
  const bk = submitBtn.onclick
  submitBtn.onclick = null
  let skipConfirm = false
  submitBtn.addEventListener('click', ev => {
    if (!skipConfirm && !confirm('确定提交？' + (_gets('sm') ? '您已提交' : ''))) {
      ev.preventDefault()
      return false
    }
    // @ts-ignore
    return bk(ev)
  })

  document.addEventListener('click', () => {
    probGetAll()
  })

  return () => {
    skipConfirm = true
    submitBtn.click()
  }
}

function fastfuck () {
  console.log('Fuck it!')
  _sets('sp', '')
  // @ts-ignore
  wjx.submit(1)
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

let lastSlen = -1

function diffSlen (slen) {
  if (lastSlen === -1) {
    lastSlen = slen
  } else if (lastSlen !== slen) {
    lastSlen = slen
    toastr.info('正确答案更新：共' + slen)
  }
}

function updateStatus () {
  if (!statusElem) return
  const _ = s => _gets(s) ? '是' : '否'
  const plen = problems ? problems.length : 0
  const slen = _gets('r') ? Object.keys(_getj('r')).length : 0
  diffSlen(slen)
  const content = [
    // @ts-ignore
    `版本\t: ${pkg.version}\t构建\t: ${BUILD}`,
    `题目\t: ${plen}\t答案\t: ${slen}`,
    `已经提交\t: ${_('sm')}\t手速模式\t: ${_('sp')}`,
    `已保存我的答案\t: ${_('s')}`,
    `禁用自动答案获取\t：${_('nol')}`
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
  updateStatus()

  createOpenMenuBtn(() => {
    open ? hideMenu() : showMenu()
  })
  console.log('UI Init')

  return { createBtn, createBr }
}

async function updateResult () {
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

function qiangbiStr () {
  const list = [
    '习卷江胡', '苟利国家', '谈笑风生', '垂死病中',
    '螳臂当车', '庆丰大帝', '小熊维尼', '州长夫人',
    '毛病百出', '积恶成习', '无可奉告', '另请高明',
    '亦可赛艇', '香港记者', '传统艺能', '会堂红歌',
    '锦城风光', '捌玖陆肆', '图样森破', '身经百战',
    '改革春风', '借你吉言', '火钳刘明', '影流之主',
    '蜜汁汉堡', '祖安钢琴', '下次一定', '你币没了',
    '金色传说', '十连保底', '还有一事', '吉良吉影',
    '副本零掉', '文艺复兴', '杰哥不要', '光头吴克'
  ]
  return list[Math.floor(Math.random() * list.length)]
}

function getMetaDataStr () {
  const data = {}
  problems.filter(x => !x.meta.s).forEach(x => {
    data[x.id] = x.meta
  })
  return JSON.stringify(data)
}

function ksParseTID () {
  const match = /([0-9]+)\.aspx/.exec(location.href)
  tid = match[1]
}

/*
 * Test page
 */

function KSInit () {
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Allow Copy/Paste
      allowCopyPaste()

      ksParseTID()
      // Show in single page
      showAllOnce()
      probParseAll()

      probSetAll('s', true)
      if (_gets('sp')) {
        fastfuck()
      } else {
        const { createBtn, createBr } = initUI()

        createBtn('导出我的答案', () => {
          probGetAll()
          exportResultToClipboard('s')
        })
        createBtn('导入我的答案', () => {
          importResultFromClipboard('s')
        })
        createBtn('填入我的答案', () => {
          probSetAll('s', true)
        })
        createBtn('删除我的答案', () => {
          _sets('s', '')
        })
        createBr()
        createBtn('导入正确答案', () => {
          importResultFromClipboard('r')
          _sets('nol', '1')
        })
        createBtn('提示正确答案', () => {
          probDisplayAll('r')
        })
        createBtn('隐藏正确提示', () => {
          probHideAll()
        })
        createBtn('填入正确答案', () => {
          probSetAll('r', true)
        })
        createBr()
        const submit = hookPage()
        createBtn('导出正确答案', () => {
          if (_gets('r')) {
            exportResultToClipboard('r')
          } else {
            toastr.error('还没有正确答案')
          }
        })
        createBtn('重新获取正确答案', () => {
          _sets('r', '')
          ajax.pick(tid).then(r => _sets('r', r)).catch(e => console.log(e))
        })
        createBtn('自动爆破', () => {
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
          if (!confirm('是否继续爆破？')) return
          submit()
        })
        createBtn('切换手速模式', () => {
          _sets('sp', _gets('sp') ? '' : '1')
          if (_gets('sp')) {
            toastr.warning('刷新后将立即提交！请检查是否全部填写完成！')
          }
        })
        createBr()
        let delayRunning = false
        createBtn('延时提交', () => {
          if (delayRunning) {
            toastr.error('已有延时提交进行')
            return
          }
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
            if (result <= 0) throw new Error('延时必须为正数')
            time = result
          } catch (e) {
            toastr.error(`请检查后重新操作: ${e.message}`)
            return
          }
          delayRunning = true
          let cancel = false
          toastr.warning('延时提交已启用', '', {
            tapToDismiss: false,
            timeOut: time,
            closeOnHover: false,
            progressBar: true,
            closeButton: true,
            onHidden: () => {
              if (cancel) {
                toastr.success('延时提交取消')
              } else {
                toastr.info('开始提交')
                submit()
              }
              delayRunning = false
            },
            onCloseClick: () => { cancel = true }
          })
        })
        createBtn('切换自动答案获取', () => {
          _sets('nol', _gets('nol') ? '' : '1')
        })
        createBr()
        const ipBtn = createBtn('', () => {
          setIpDisplay('获取中')
          ajax.getIPv4All().then(ip => setIpDisplay(ip))
        })
        /**
         * @param {string} t
         */
        const setIpDisplay = t => {
          toastr.info(ipBtn.innerText = 'IP地址：' + t)
        }
        ipBtn.click()
        createBr()
        // @ts-ignore
        if (BUILD === 'dev') {
          createBtn('覆盖正确答案', () => {
            _sets('r', _gets('s'))
          })
          createBtn('上传答案', () => {
            if (!_gets('r')) {
              toastr.error('没有答案')
              return
            }
            ajax.store(tid, getStrByType('r'))
              .then(() => {
                toastr.success('答案上传成功')
              })
              .catch(e => {
                toastr.error('答案上传失败')
              })
          })
        }
        ajax.store(tid + '.md', getMetaDataStr())
          .then(() => {
            toastr.success('元数据上传成功')
          })
          .catch(e => {
            toastr.error('元数据上传失败')
          })

        const fetchSTD = async () => {
          !_gets('nol') && await updateResult()
          setTimeout(() => {
            fetchSTD()
          }, 5 * 1000)
        }
        fetchSTD()
      }
    }, 50)
  })
}

/*
 * Test result page
 */

/**
 * @param {Element} elem
 */
function jgParseCorrectOne (elem) {
  const top = elem.parentElement.parentElement.parentElement
  const id = top.getAttribute('topic')
  const p = problems.find(x => x.id === id)
  if (!p) {
    console.warn('Problem not found: ' + id)
    return
  }
  return p.id
}

function jgParseCorrect () {
  return [...document.querySelectorAll('img[alt="正确"]').values()]
    .map(x => jgParseCorrectOne(x))
    .filter(x => x)
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
  if (node.tagName) return null
  const val = node.textContent.trim()
  if (p.type === 'c') {
    const right = p.meta.o.filter(x => val.includes(x[1])).map(x => x[0]).join(',')
    return [id, right]
  } else if (p.type === 't') {
    return [id, val]
  }
}

function jgParseFailed () {
  return [...document.querySelectorAll('img[alt="错误"]').values()]
    .map(x => jgParseFailedOne(x))
    .filter(x => x)
}

function jgRestoreProblems () {
  problems = _getj('p')
}

function jgParseTid () {
  const match = /q=([0-9]+)/.exec(location.search)
  tid = match[1]
}

function JGInit () {
  window.addEventListener('load', () => {
    setTimeout(async () => {
      // Allow Copy/Paste
      allowCopyPaste()

      jgParseTid()
      jgRestoreProblems()

      _sets('sm', '1')

      const { createBtn } = initUI()

      createBtn('导出我的答案', () => {
        exportResultToClipboard('s')
      })

      if (document.getElementById('divAnswer')) {
        try {
          await updateResult()
          const my = _getj('s')
          const map = _getj('r') || {}

          const correct = jgParseCorrect()
          for (const id of correct) {
            map[id] = my[id]
          }
          const delta = jgParseFailed()
          for (const d of delta) {
            map[d[0]] = d[1]
          }

          _setj('r', map)
          createBtn('导出正确答案', () => {
            exportResultToClipboard('r')
          })

          ajax.store(tid, getStrByType('r'))
            .then(() => {
              toastr.success('答案上传成功')
            })
            .catch(e => {
              toastr.error('答案上传失败')
            })
        } catch (e) {
          console.log(e)
        }
      }
    }, 50)
  })
}

/*
 * Common survey page
 */

function svParseTid () {
  const match = /([0-9]+)\.aspx/.exec(location.href)
  tid = match[1]
}

function SVInit () {
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Allow Copy/Paste
      allowCopyPaste()

      svParseTid()
      // Show in single page
      showAllOnce()
      probParseAll()

      probSetAll('s', true)
      if (_gets('sp')) {
        fastfuck()
      } else {
        const { createBtn, createBr } = initUI()

        createBtn('导出我的答案', () => {
          probGetAll()
          exportResultToClipboard('s')
        })
        createBtn('导入我的答案', () => {
          importResultFromClipboard('s')
        })
        createBtn('填入我的答案', () => {
          probSetAll('s', true)
        })
        createBtn('删除我的答案', () => {
          _sets('s', '')
        })
        createBr()
        const submit = hookPage()
        createBtn('自动爆破', () => {
          if (!confirm('确定继续？')) return
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
          submit()
        })
        createBtn('切换手速模式', () => {
          _sets('sp', _gets('sp') ? '' : '1')
          if (_gets('sp')) {
            toastr.warning('刷新后将立即提交！请检查是否全部填写完成！')
          }
        })

        let delayRunning = false
        createBtn('延时提交', () => {
          if (delayRunning) {
            toastr.error('已有延时提交进行')
            return
          }
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
            if (result <= 0) throw new Error('延时必须为正数')
            time = result
          } catch (e) {
            toastr.error(`请检查后重新操作: ${e.message}`)
            return
          }
          delayRunning = true
          let cancel = false
          toastr.warning('延时提交已启用', '', {
            tapToDismiss: false,
            timeOut: time,
            closeOnHover: false,
            progressBar: true,
            closeButton: true,
            onHidden: () => {
              if (cancel) {
                toastr.success('延时提交取消')
              } else {
                toastr.info('开始提交')
                submit()
              }
              delayRunning = false
            },
            onCloseClick: () => { cancel = true }
          })
        })
        createBr()
        const ipBtn = createBtn('', () => {
          setIpDisplay('获取中')
          ajax.getIPv4All().then(ip => setIpDisplay(ip))
        })
        /**
         * @param {string} t
         */
        const setIpDisplay = t => {
          toastr.info(ipBtn.innerText = 'IP地址：' + t)
        }
        ipBtn.click()
      }
    }, 50)
  })
}

redirToDesktop()
redirToSecure()

switch (getPageType()) {
  case 1:
    KSInit()
    break
  case 2:
    JGInit()
    break
  case 5:
    SVInit()
    break
}
