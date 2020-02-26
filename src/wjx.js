console.log('WJX Detected')

if (/(ks\.wjx\.top\/m\/)/.test(window.location.href)) {
  window.location.href = window.location.href.replace(/m/, 'jq')
}

window.addEventListener('load', () => {
  setTimeout(() => {
    document.oncontextmenu = null
    document.ondragstart = null
    document.onselectstart = null
    console.log('FenDuoDuo is loaded')
  }, 200)
})
