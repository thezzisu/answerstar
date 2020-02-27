console.log('WJX Detected')

if (/(ks\.wjx\.top\/m\/)/.test(location.href)) {
  location.href = location.href.replace(/m/, 'jq')
}

const tid = /([0-9]+)\.aspx$/.exec(location.href)[1]

window.addEventListener('load', () => {
  setTimeout(() => {
    // Allow Copy/Paste
    document.oncontextmenu = null
    document.ondragstart = null
    document.onselectstart = null
    // Show in single page
    document.querySelectorAll('.fieldset').forEach(fs => { fs.style.display = '' })
    document.getElementById('submit_table').style.display = ''
    document.getElementById('btnNext')
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .style.display = 'none'

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

    function setAll () {
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

    function getData () {
      return [tid, btoa(getAll())].join('$')
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

    function ui () {
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

      createBtn('Export', () => {
        const s = getData()
        prompt('Your answer:', s)
      })

      createBtn('Import', () => {
        const s = prompt('Please paste')
        feedData(s)
      })

      createBtn('Apply', () => {
        setAll()
      })

      {
        const a = document.createElement('button')
        a.textContent = 'menu'
        a.style.zIndex = 998
        a.style.position = 'fixed'
        a.style.bottom = '32px'
        a.style.right = '32px'
        document.body.appendChild(a)
        a.addEventListener('click', () => {
          showMenu()
        })
      }
      console.log('UI Init')
    }

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
      getAll()
    })
  }, 200)
})
