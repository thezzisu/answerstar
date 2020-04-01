/* global unsafeWindow */

/** @type {HTMLFieldSetElement[]} */
const pageHolder = [...unsafeWindow.pageHolder]

// Show all pageHolder
pageHolder.forEach(ph => {
  ph.style.display = ''
})
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

const questions = pageHolder.map(x => x.questions).flat()
console.log(questions)
