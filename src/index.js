// @ts-check

/* global BUILD, GM, unsafeWindow */

// @ts-ignore
require('./reset')

console.log('欢迎使用%c答卷星', 'color: #1ea0fa')

// #region GLOBAL_VARIABLES

const { Base64 } = require('js-base64')
const toastr = require('toastr')

// @ts-ignore
const pkg = require('../package.json')

const ajax = require('./ajax')
const wjx = require('./reverseWjx')
const utils = require('./util')
const config = require('./config')

const parsers = require('./parsers')

require('./addstyle')

let problems = []
/** @type {string} */
let tid
/** @type {Element} */
let statusElem
/** @type {string} */
let lastAns = ''
/** @type {number} */
let lastConfigVer
const pageType = getPageType()
/** @type {Window} */
// @ts-ignore
const realWindow = unsafeWindow

// #endregion

// #region HELPERS

/**
 * @param {string} k
 */
function gets (k) {
  return localStorage.getItem(`fdd.${tid}.${k}`)
}

/**
 * @param {string} k
 */
function getj (k) {
  try {
    return JSON.parse(gets(k))
  } catch (e) {
    console.error(e)
    sets(k, '')
    return null
  }
}

/**
 * @param {string} k
 * @param {string} v
 */
function sets (k, v) {
  localStorage.setItem(`fdd.${tid}.${k}`, v)
}

/**
 * @param {string} k
 * @param {any} v
 */
function setj (k, v) {
  sets(k, JSON.stringify(v))
}

/**
 * @param {string} text
 */
function systemNotify (text) {
  // @ts-ignore
  GM.notification({ text, title: document.title, image: 'https://djx.zhangzisu.cn/static/answerstar_logo.png' })
}

/**
 * @returns {Promise<string | undefined>}
 */
async function randIP () {
  const fakeip = await config.get('fakeip', 'auto')
  if (fakeip === 'disabled') return undefined
  if (fakeip === 'auto') return utils.randIP()
  // @ts-ignore
  return fakeip
}

// #endregion

// #region BEFORE_EXEC

function antiAnticheat () {
  realWindow.onblur = null
  realWindow.onresize = null
  // @ts-ignore
  realWindow.intervalId && clearInterval(realWindow.intervalId)
  // @ts-ignore
  if (realWindow.screenfull) {
    // @ts-ignore
    realWindow.screenfull = {
      request: () => { },
      exit: () => { },
      toggle: () => { },
      raw: false,
      isFullscreen: () => true,
      element: () => document.documentElement,
      enabled: () => false,
      alert: (a) => toastr.info(a, '问卷星提醒')
    }
  }
}

function allowCopyPaste () {
  document.oncontextmenu = null
  document.ondragstart = null
  document.onselectstart = null
  document.querySelectorAll('textarea').forEach(x => { x.onpaste = null })
  document.querySelectorAll('input').forEach(x => { x.onpaste = null })
}

function redirToSecure () {
  if (location.href.includes('localhost')) return
  if (/^http:\/\//.test(location.href)) {
    location.href = location.href.replace(/http/, 'https')
  }
}

function redirToDesktop () {
  if (/wjx\.(top|cn)\/m\//.test(location.href)) {
    location.href = location.href.replace(/\/m\//, '/jq/')
  }
}

// #endregion

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
  if (/ks\.wjx\.top\/wjx\/join\/uploadMultiple/.test(location.href)) return 3
  if (/ks\.wjx\.top\/wjx\/join\/JoinActivityRank/.test(location.href)) return 4
  if (/(ks\.wjx\.top|www\.wjx\.cn)\/jq\//.test(location.href)) return 1
  if (/(ks\.wjx\.top|www\.wjx\.cn)\/wjx\/join\//.test(location.href)) return 2
}

function probParseAll () {
  const divs = document.querySelectorAll('.div_question')
  problems = [...divs.values()]
    .map(x => parsers.parse(x))
    .filter(x => x)
  const problemsMeta = problems.map(x => ({ id: x.id, type: x.type, meta: x.meta }))
  setj('p', problemsMeta)
}

function probGetAll () {
  const map = getj('s') || {}
  for (const p of problems) {
    const v = parsers.get(p.elem, p.type)
    if (v) map[p.id] = v
  }
  setj('s', map)
  return gets('s')
}

/**
 * @param {string} key
 * @param {boolean} override
 */
function probSetAll (key, override) {
  const map = getj(key) || {}
  for (const id in map) {
    const p = problems.find(x => x.id === id)
    if (p) {
      parsers.set(p.elem, p.type, map[id], override)
    } else {
      console.warn(`ID ${id} not found`)
    }
  }
}

/**
 * @param {string} key
 */
function probDisplayAll (key) {
  const map = getj(key) || {}
  for (const id in map) {
    const p = problems.find(x => x.id === id)
    if (p) {
      parsers.display(p.elem, p.type, map[id])
    } else {
      console.warn(`ID ${id} not found`)
    }
  }
}

function probHideAll () {
  for (const p of problems) {
    parsers.hide(p.elem, p.type)
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
  const map = getj(k)
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
      setj(k, result)
    } else {
      sets(k, safeDecode(pld))
    }
    toastr.info('导入成功')
  } catch (e) {
    toastr.error('导入错误: ' + e.message)
  }
}

/**
 * @param {string} k
 */
function exportResultToUbuntuPastebin (k) {
  const answer = getj(k) || {}
  const problemsToExport = problems.filter(x => !x.meta.s)
  const result = [
    // @ts-ignore
    `Powered by AnswerSTAR ${pkg.version}, build ${BUILD} > djx.zhangzisu.cn <`,
    `问卷编号：${tid} 问卷链接：https://ks.wjx.top/jq/${tid}.aspx 共${problemsToExport.length}题`
  ]
  const types = {
    c: '选择题',
    t: '填空题',
    b: '矩阵',
    g: '多项填空',
    s: '下拉选择'
  }
  for (const problem of problemsToExport) {
    result.push('')
    result.push('')
    result.push(`# 题目编号：${problem.id} 类型：${types[problem.type]}`)
    result.push(`${problem.meta.f}`)
    result.push('')
    const ans = answer[problem.id] || ''
    if (problem.type === 'c') {
      result.push(`# 选择类型：${problem.meta.t ? '多选' : '单选'}`)
      for (const option of problem.meta.o) {
        result.push(`[${ans.includes(option[0]) ? 'X' : ' '}] 选项编号：${option[0]} => ${option[1]}`)
      }
    } else if (problem.type === 't') {
      result.push(`=> ${ans}`)
    } else if (problem.type === 'g') {
      ans.split(',').forEach(v => result.push('· ' + v))
    }
  }
  toastr.info('导出中')
  return ajax.ubuntuPastebin('AnswerSTAR', 'text', result.join('\n'))
}

/**
 * @param {string} k
 */
function exportResultAndOpen (k) {
  exportResultToUbuntuPastebin(k)
    .then(pasteID => {
      window.open('https://paste.ubuntu.com/p/' + pasteID)
      toastr.success('导出成功')
    })
    .catch(e => {
      toastr.error('导出外链失败：' + e.message)
    })
}

/**
 * @param {string} html
 */
function createElementFromHTML (html) {
  var div = document.createElement('div')
  div.innerHTML = html.trim()
  return div.firstChild
}

async function hookPage () {
  const submitBtn = document.getElementById('submit_button')
  const bk = submitBtn.onclick
  submitBtn.onclick = null
  const validateSkip = () => {
    if (gets('bps')) return false
    return !confirm('确定提交？' + (gets('sm') ? '您已提交' : ''))
  }
  submitBtn.addEventListener('click', ev => {
    if (validateSkip()) {
      ev.preventDefault()
      return false
    }
    // @ts-ignore
    return bk(ev)
  })

  const createSubmit = (text, onclick, title) => {
    const elem = createElementFromHTML('<input type="button" class="submitbutton" value="' + text + '" onmouseout="this.className=\'submitbutton\';" onmouseover="this.className = \'submitbutton submitbutton_hover\'" style="padding: 0 24px; height: 32px;">')
    submitBtn.parentElement.appendChild(elem)
    elem.addEventListener('click', onclick)
    // @ts-ignore
    title && (elem.title = title)
    return elem
  }

  if (await config.get('fakeip') !== 'disabled') {
    createSubmit('传送提交', async () => {
      wjx.submit(1, { skipValidate: true, overrideIP: await randIP() })
    }, '伪造IP地址后提交')
  }
  createSubmit('强制提交', () => {
    wjx.submit(1, { skipValidate: true })
  }, '无视一切前端验证')

  let delayRunning = false
  createSubmit('延时提交', () => {
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
      if (typeof result !== 'number') throw new Error('非法表达式')
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
          wjx.submit(1, { skipValidate: true })
        }
        delayRunning = false
      },
      onCloseClick: () => { cancel = true }
    })
  }, '一定时间后模拟提交')

  createSubmit('高级提交', () => {
    const expr = prompt(
      '输入提交时上传的开始时间距离提交时间的差值(ms)，支持JS表达式。大概为问卷星显示作答用时多2s',
      '4000'
    )
    let time = -1
    try {
      // eslint-disable-next-line no-eval
      const result = eval(expr)
      if (typeof result !== 'number') throw new Error('非法表达式')
      if (!Number.isSafeInteger(result)) throw new Error('非法数字')
      time = result
    } catch (e) {
      toastr.error(`请检查后重新操作: ${e.message}`)
      return
    }
    wjx.submit(1, { skipValidate: true, overrideStarttime: Date.now() - time })
  }, '自定义作答时间')

  document.addEventListener('click', () => {
    probGetAll()
  })
}

async function diffStatus () {
  if (pageType === 1) {
    const ans = gets('r')
    if (lastAns !== ans) {
      lastAns = ans
      toastr.warning('正确答案更新')
      systemNotify('正确答案更新')
    }
  }
  const v = await config.get('_v', 0)
  // @ts-ignore
  if (!lastConfigVer) lastConfigVer = v
  if (v !== lastConfigVer) location.reload()
}

async function updateStatus () {
  if (!statusElem) return
  const _ = s => gets(s) ? '是' : '否'
  const plen = problems ? problems.length : 0
  const slen = gets('r') ? Object.keys(getj('r') || {}).length : 0
  await diffStatus()
  const fakeip = await config.get('fakeip', 'auto')
  const nbc = await config.get('noboomconfirm', false)
  const content = [
    // @ts-ignore
    `版本\t: ${pkg.version}\t构建\t: ${BUILD}`,
    `题目\t: ${plen}\t答案\t: ${slen}`,
    `已经提交\t: ${_('sm')}\t伪造IP\t：${fakeip}`,
    `爆破确认\t: ${nbc ? '关闭' : '开启'}`,
    `已保存我的答案\t: ${_('s')}`,
    `禁用自动答案获取\t：${_('nol')}`
  ]
  statusElem.innerHTML = content.join('\n')
}

function createOpenMenuBtn (cb) {
  const a = document.createElement('button')
  a.textContent = 'menu'
  a.classList.add('fdd-menu-opener')
  document.body.appendChild(a)
  a.addEventListener('click', cb)
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

  createOpenMenuBtn(() => {
    open ? hideMenu() : showMenu()
  })
  console.log('UI Init')

  setInterval(() => {
    updateStatus()
  }, 500)

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
    sets('r', result)
  }
}

function getMetaDataStr () {
  const data = {}
  problems.filter(x => !x.meta.s).forEach(x => {
    data[x.id] = x.meta
  })
  return JSON.stringify(data)
}

// #region TEST_PAGE

function ksParseTID () {
  const match = /([0-9]+)\.aspx/.exec(location.href)
  tid = match[1]
}

/*
 * Test page
 */

function KSInit () {
  window.addEventListener('load', () => {
    setTimeout(async () => {
      // Allow Copy/Paste
      allowCopyPaste()
      antiAnticheat()

      ksParseTID()
      lastAns = gets('r')
      // Show in single page
      showAllOnce()
      probParseAll()
      utils.deleteAllCookies()

      setInterval(() => {
        const captcha = document.getElementById('captcha')
        captcha && (captcha.style.display = '')
      }, 100)

      if (gets('bps')) {
        const state = getj('bps')
        if (state.type === 'hasErr') {
          const cur = state.cur.toString()
          toastr.info(`爆破答案${cur}`, '自动爆破')
          for (const p of problems) {
            if (p.type === 'c') {
              if (!p.meta.t) {
                parsers.c.set(p.elem, cur)
              } else {
                parsers.c.set(p.elem, ['1', '2', '3', '4', '1,2', '1,3', '1,4', '2,3', '2,4', '3,4', '1,2,3', '1,2,4', '1,3,4', '2,3,4', '1,2,3,4'][state.cur])
              }
            } else if (p.type === 't') {
              parsers.t.set(p.elem, utils.randWord())
            } else if (p.type === 's') {
              parsers.s.set(p.elem, '1')
            } else if (p.type === 'b') {
              parsers.b.set(p.elem, `${utils.randWord()},1,20180101`)
            }
          }
          probSetAll('s', true) // To override sensiable problems
          probSetAll('r', true) // To override boomed problems
        } else if (state.type === 'onlyScore') {
          toastr.info(`爆破题目${state.cur}答案${state.pcur}`, '自动爆破')
          for (const p of problems) {
            if (p.type === 'c') {
              parsers.c.set(p.elem, '1')
            } else if (p.type === 't') {
              parsers.t.set(p.elem, utils.randWord())
            } else if (p.type === 's') {
              parsers.s.set(p.elem, '1')
            } else if (p.type === 'b') {
              parsers.b.set(p.elem, `${utils.randWord()},1,20180101`)
            }
          }
          const p = problems.find(x => x.id === state.arr[state.cur].id)
          parsers.c.set(p.elem, '' + state.pcur)
        }
        probGetAll()
        await hookPage()
        wjx.submit(1, {
          skipValidate: true,
          overrideStarttime: Date.now() - 30 * 1000 - Math.floor(Math.random() * 5000),
          overrideIP: await randIP()
        })
        return
      }

      probSetAll('s', true)

      const { createBtn, createBr } = initUI()

      createBtn('导入我的答案', () => {
        importResultFromClipboard('s')
      })
      createBtn('导出我的答案', () => {
        probGetAll()
        exportResultToClipboard('s')
      })
      createBtn('填入我的答案', () => {
        probSetAll('s', true)
      })
      createBr()
      createBtn('导入正确答案', () => {
        importResultFromClipboard('r')
        sets('nol', '1')
      })
      createBtn('导出正确答案', () => {
        if (gets('r')) {
          exportResultToClipboard('r')
        } else {
          toastr.error('还没有正确答案')
        }
      })
      createBtn('填入正确答案', () => {
        probSetAll('r', true)
      })
      createBr()
      createBtn('删除我的答案', () => {
        sets('s', '')
      })
      createBtn('提示正确答案', () => {
        probDisplayAll('r')
      })
      createBtn('隐藏正确提示', () => {
        probHideAll()
      })
      createBr()

      createBtn('开始自动爆破', async () => {
        const doConfirm = !await config.get('noboomconfirm', false)
        if (doConfirm) {
          toastr.info('刷新正确答案', '', { progressBar: true })
          await updateResult()
        }
        if (doConfirm && gets('r') && !confirm('已经有正确答案了，不要做无谓的牺牲！是否继续？')) return
        if (doConfirm && !confirm('是否继续爆破？建议使用隐式模式！')) return
        for (const p of problems) {
          if (p.type === 'c') {
            parsers.c.set(p.elem, '1')
          } else if (p.type === 't') {
            parsers.t.set(p.elem, utils.randWord())
          } else if (p.type === 's') {
            parsers.s.set(p.elem, '1')
          } else if (p.type === 'b') {
            parsers.b.set(p.elem, `${utils.randWord()},1,20180101`)
          }
        }
        setj('bps', {})
        toastr.warning('自动爆破开始')
        wjx.submit(1, {
          skipValidate: true,
          overrideStarttime: Date.now() - 30 * 1000 - Math.floor(Math.random() * 5000),
          overrideIP: await randIP()
        })
      })
      createBtn('开始手动爆破', async () => {
        const doConfirm = !await config.get('noboomconfirm', false)
        if (doConfirm) {
          toastr.info('刷新正确答案', '', { progressBar: true })
          await updateResult()
        }
        if (doConfirm && gets('r') && !confirm('已经有正确答案了，不要做无谓的牺牲！是否继续？')) return
        const cway = prompt('选择题答案生成(rand|[number])', '1')
        const tway = prompt('填空题答案生成(qiangbi|[text])', 'qiangbi')
        const slway = prompt('下拉选择答案生成(rand|[number])', '1')
        for (const p of problems) {
          if (p.type === 'c') {
            if (cway === 'rand') {
              if (p.meta.t) {
                // @ts-ignore
                parsers.c.set(p.elem, p.meta.o.filter(x => Math.random() < 0.5).map(x => x[0]).join(','))
              } else {
                parsers.c.set(p.elem, '' + Math.floor(Math.random() * p.meta.o.length) + 1)
              }
            } else {
              parsers.c.set(p.elem, cway)
            }
          } else if (p.type === 't') {
            parsers.t.set(p.elem, tway === 'qiangbi' ? utils.randWord() : tway)
          } else if (p.type === 's') {
            parsers.s.set(p.elem, slway === 'rand' ? '' + Math.floor(Math.random() * p.meta.l) : '1')
          } else if (p.type === 'b') {
            // @ts-ignore
            parsers.b.set(p.elem, [...new Array(p.meta.l)].map(x => utils.randWord()).join(','))
          }
        }
        if (doConfirm && !confirm('是否继续爆破？')) return
        wjx.submit(1, {
          skipValidate: true,
          overrideStarttime: Date.now() - 30 * 1000 - Math.floor(Math.random() * 5000),
          overrideIP: await randIP()
        })
      })
      createBtn('打印完整试卷', () => {
        print()
      })
      createBr()
      createBtn('切换自动答案获取', () => {
        sets('nol', gets('nol') ? '' : '1')
      })
      createBtn('刷新正确答案', () => {
        sets('r', '')
        ajax.pick(tid).then(r => sets('r', r)).catch(e => console.log(e))
      })
      createBtn('导出外链', () => {
        exportResultAndOpen('s')
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
      createBtn('打开设置', () => {
        window.open('http://djx.zhangzisu.cn/settings')
      })
      createBtn('强制显示题目', () => {
        showAllOnce()
      })
      // @ts-ignore
      if (BUILD === 'dev') {
        createBr()
        createBtn('删除在线答案', () => {
          ajax.store(tid, '')
            .then(() => {
              toastr.success('答案上传成功')
            })
            .catch(e => {
              toastr.error('答案上传失败')
            })
        })
        createBtn('覆盖正确答案', () => {
          sets('r', gets('s'))
        })
        createBtn('上传答案', () => {
          if (!gets('r')) {
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
          exportResultToUbuntuPastebin('r')
            .then(pasteID => {
              return ajax.store(tid + '.u', pasteID)
            })
            .then(() => {
              toastr.success('外链上传成功')
            })
            .catch(e => {
              toastr.error('外链上传失败')
            })
        })
      }

      await hookPage()

      ajax.store(tid + '.md', getMetaDataStr())
        .then(() => {
          toastr.success('元数据上传成功')
        })
        .catch(e => {
          toastr.error('元数据上传失败')
        })

      const fetchSTD = async () => {
        !gets('nol') && await updateResult()
        setTimeout(() => {
          fetchSTD()
        }, 5 * 1000)
      }
      fetchSTD()

      setTimeout(() => {
        if (document.getElementById('PDF_bg_chezchenz')) {
          document.getElementById('PDF_bg_chezchenz').remove()
        }
        if (document.getElementById('PDF_c_chezchenz')) {
          document.getElementById('PDF_c_chezchenz').remove()
        }
        if (document.getElementById('ctl00_ContentPlaceHolder1_JQ1_divWeiXin')) {
          document.getElementById('ctl00_ContentPlaceHolder1_JQ1_divWeiXin').remove()
        }
        if (document.getElementById('ctl00_ContentPlaceHolder1_JQ1_question')) {
          const e = document.getElementById('ctl00_ContentPlaceHolder1_JQ1_question')
          e.style.filter = 'none'
        }
      }, 500)
    }, 50)
  })
}

// #endregion

// #region RESULT_PAGE

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
  problems = getj('p')
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
      lastAns = gets('r')
      jgRestoreProblems()

      sets('sm', '1')
      let skipRegularParse = false

      if (gets('bps')) {
        const state = getj('bps')
        let success = false
        if (!state.type) {
          // First submit
          if (document.getElementById('divAnswer')) {
            const my = getj('s')
            const map = getj('r') || {}

            const correct = jgParseCorrect()
            for (const id in map) {
              if (map[id] === my[id] && !correct.includes(id)) {
                delete map[id]
              }
            }
            for (const id of correct) {
              map[id] = my[id]
            }
            const delta = jgParseFailed()
            for (const d of delta) {
              map[d[0]] = d[1]
            }

            setj('r', map)

            success = problems.filter(x => x.type === 'c' && !x.meta.s).every(x => x.id in map)

            state.type = 'hasErr'
            state.cur = 2
          } else {
            const cce = document.querySelector('.score-form-wrapper > div > div.score-form__details-wrapper > div > div:last-child > div.form__items--rt.figcaption > div > strong')
            if (cce) {
              const r = getj('r') || {}
              const can = problems.filter(x => x.type === 'c' && !x.meta.t && !x.meta.s && !(x.id in r))
              if (can.length === 0) {
                success = true
              } else {
                state.type = 'onlyScore'
                state.arr = can.map(x => ({ id: x.id, ans: [['1', parseInt(cce.textContent)]] }))
                state.cur = 0
                state.pcur = 2
              }
            } else {
              sets('bps', '')
              toastr.error('无法爆破')
              return
            }
          }
        } else {
          if (state.type === 'hasErr') {
            const my = getj('s')
            const map = getj('r') || {}

            const correct = jgParseCorrect()
            for (const id in map) {
              if (map[id] === my[id] && !correct.includes(id)) {
                delete map[id]
              }
            }
            for (const id of correct) {
              map[id] = my[id]
            }
            const delta = jgParseFailed()
            for (const d of delta) {
              map[d[0]] = d[1]
            }

            setj('r', map)

            success = problems.filter(x => x.type === 'c' && !x.meta.s).every(x => x.id in map)

            state.type = 'hasErr'

            const max = problems.filter(x => x.type === 'c' && !x.meta.s).map(x => x.meta.t ? 15 : x.meta.o.length).sort((a, b) => b - a)[0]
            if (++state.cur > max) success = true
          } else if (state.type === 'onlyScore') {
            const cc = parseInt(document.querySelector('.score-form-wrapper > div > div.score-form__details-wrapper > div > div:last-child > div.form__items--rt.figcaption > div > strong').textContent)
            const obj = state.arr[state.cur]
            obj.ans.push([getj('s')[obj.id], cc])
            obj.ans.sort((a, b) => b[1] - a[1])
            if (obj.ans[0][1] > obj.ans[1][1]) {
              const res = getj('r') || {}
              res[obj.id] = obj.ans[0][0]
              setj('r', res)
              state.pcur = 2
              state.cur++
              if (state.cur === state.arr.length) {
                success = true
              }
            } else {
              const len = problems.find(x => x.id === obj.id).meta.o.length
              if (++state.pcur >= len) {
                const res = getj('r') || {}
                if (!res[obj.id]) {
                  res[obj.id] = `${len}`
                  setj('r', res)
                }
                state.pcur = 2
                if (++state.cur === state.arr.length) {
                  success = true
                }
              }
            }
          }
        }
        if (success) {
          toastr.success('高级爆破成功')
          sets('bps', '')
          toastr.info('答案及外链上传中', '', { progressBar: true })
          ajax.store(tid, getStrByType('r'))
            .then(() => {
              toastr.success('答案上传成功')
            })
            // @ts-ignore
            .catch(e => {
              toastr.error('答案上传失败')
            })
          exportResultToUbuntuPastebin('r')
            .then(pasteID => ajax.store(tid + '.u', pasteID))
            .then(() => {
              toastr.success('外链上传成功')
            })
            .catch(e => {
              console.log(e)
              toastr.error('外链上传失败')
            })
          skipRegularParse = true
        } else {
          setj('bps', state)
          await utils.waitWithToast(5000, '等待下一轮爆破', '')
          location.href = `https://ks.wjx.top/jq/${tid}.aspx`
          return
        }
      }

      const { createBtn, createBr } = initUI()

      createBtn('导出我的答案', () => {
        exportResultToClipboard('s')
      })
      createBtn('导出我的答案外链', () => {
        exportResultAndOpen('s')
      })

      if (document.getElementById('divAnswer')) {
        try {
          if (!skipRegularParse) {
            toastr.info('刷新正确答案', '', { progressBar: true })
            await updateResult()
            const my = getj('s')
            const map = getj('r') || {}

            const correct = jgParseCorrect()
            for (const id in map) {
              if (map[id] === my[id] && !correct.includes(id)) {
                delete map[id]
              }
            }
            for (const id of correct) {
              map[id] = my[id]
            }
            const delta = jgParseFailed()
            for (const d of delta) {
              map[d[0]] = d[1]
            }

            setj('r', map)

            toastr.info('答案及外链上传中', '', { progressBar: true })
            ajax.store(tid, getStrByType('r'))
              .then(() => {
                toastr.success('答案上传成功')
              })
              .catch(e => {
                toastr.error('答案上传失败')
              })
            exportResultToUbuntuPastebin('r')
              .then(pasteID => {
                createBtn('导出正确答案外链', () => {
                  window.open('https://paste.ubuntu.com/p/' + pasteID)
                })
                return ajax.store(tid + '.u', pasteID)
              })
              .then(() => {
                toastr.success('外链上传成功')
              })
              .catch(e => {
                toastr.error('外链上传失败')
              })
          }

          createBr()
          createBtn('导出正确答案', () => {
            exportResultToClipboard('r')
          })
        } catch (e) {
          console.log(e)
        }
      }
    }, 50)
  })
}

// #endregion

redirToDesktop()
redirToSecure()

switch (pageType) {
  case 1:
    KSInit()
    break
  case 2:
    JGInit()
    break
}

window.addEventListener('load', () => {
  [...document.querySelectorAll('span')]
    .filter(x => /lblpowerby/i.test(x.id))
    .forEach(x => {
      x.innerHTML =
        '<a href="https://djx.zhangzisu.cn/" target="_blank" class="link-444" title="答卷星_不止问卷填写/自动考试">答卷星</a>&nbsp;提供技术支持'
      const a = x.querySelector('a')
      a.addEventListener('click', ev => {
        if (ev.altKey) {
          ev.preventDefault()
          sets('bps', '')
          toastr.success('强制退出爆破成功')
          return false
        }
      })
    })

  document.querySelectorAll('a[href="https://www.wjx.cn/"]').forEach(x => {
    x.outerHTML = '<a href="http://djx.zhangzisu.cn/" title="答卷星_打爆问卷星" class="link-06f" target="_blank">djx.zhangzisu.cn</a>'
  })

  const cheatMoney = document.getElementById('ctl01_ContentPlaceHolder1_divAward')
  if (cheatMoney) {
    cheatMoney.innerHTML = `<div id="ctl01_ContentPlaceHolder1_divAwardTip" style="color: #F64141; font-size: 16px; margin: 24px 0 20px; text-align: center;">恭喜您获得了1次捐助机会！</div><div align="center">
    <img src="https://djx.zhangzisu.cn/static/beg_for_money.jpg" width="300px">
  </div>`
    cheatMoney.removeAttribute('tiptext')
    cheatMoney.removeAttribute('province')
    cheatMoney.removeAttribute('city')
    const ap = document.getElementById('ctl01_ContentPlaceHolder1_divPromoteComplete')
    ap && ap.remove()
  }
})

// @ts-ignore
if (location.href.includes('djx.zhangzisu.cn') || BUILD === 'dev') {
  // @ts-ignore
  realWindow._gm = GM
}
