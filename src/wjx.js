console.log('WJX Detected')

if (/(ks\.wjx\.top\/m\/)/.test(location.href)) {
  location.href = location.href.replace(/m/, 'jq')
}

const tid = /([0-9]+)\.aspx$/.exec(location.href)[1]

window.addEventListener('load', () => {
  setTimeout(() => {
    document.oncontextmenu = null
    document.ondragstart = null
    document.onselectstart = null
    console.log('FenDuoDuo is loaded')

    const divs = document.querySelectorAll('.div_question')
    const problems = [...divs.values()]
      .map(x => parseProbType(x))

    ui()

    /**
     * @param {Element} elem
     */
    function parseProbType (elem) {
      const c = elem.querySelector('.div_table_radio_question')
      const id = elem.id.substr(3)
      if (c.querySelector('a.jqCheckbox') || c.querySelector('a.jqRadio')) return { type: 'c', elem, id }
      return { type: 'unknow', elem, id }
    }

    /**
     * @param {Element} elem
     */
    function parseC (elem) {
      const input = elem.querySelector('input')
      return /^(.+)_/.exec(input.id)[1]
    }

    /**
     * @param {Element} elem
     */
    function getC (elem) {
      const checked = [...elem.querySelectorAll('a.jqChecked').values()]
      if (checked.length) {
        const b = parseC(elem)
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
      const b = parseC(elem)
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
      console.group('unknow element')
      console.log(`Type ${type}`)
      console.log(elem)
      console.groupEnd()
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
      console.group('unknow element')
      console.log(`Type ${type}`)
      console.log(elem)
      console.groupEnd()
    }

    function getAll () {
      const map = Object.create(null)
      for (const p of problems) {
        map[p.id] = get(p.elem, p.type)
      }
      return [tid, btoa(JSON.stringify(map))].join('$')
    }

    /**
     * @param {string} val
     */
    function setAll (val) {
      const [ttid, pld] = val.split('$')
      if (ttid !== tid) {
        alert('Not for this paper')
        return
      }
      const map = JSON.parse(atob(pld))
      for (const id in map) {
        const p = problems.find(x => x.id === id)
        if (p) {
          set(p.elem, p.type, map[id], false)
        } else {
          console.warn(`ID ${id} not found`)
        }
      }
    }

    function ui () {
      const a = document.createElement('div')
      a.style.width = '16px'
      a.style.height = '32px'
      a.style.zIndex = 999
      a.style.background = 'red'
      a.style.position = 'fixed'
      a.style.bottom = '32px'
      a.style.right = '48px'
      a.style.cursor = 'pointer'
      document.body.appendChild(a)
      a.addEventListener('click', () => {
        const s = getAll()
        prompt('Please copy', s)
      })
      const b = document.createElement('div')
      b.style.width = '16px'
      b.style.height = '32px'
      b.style.zIndex = 999
      b.style.background = 'green'
      b.style.position = 'fixed'
      b.style.bottom = '32px'
      b.style.right = '32px'
      b.style.cursor = 'pointer'
      document.body.appendChild(b)
      b.addEventListener('click', () => {
        const s = prompt('Please paste')
        setAll(s)
      })
      console.log('UI Init')
    }
  }, 200)
})
