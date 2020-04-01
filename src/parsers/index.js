// @ts-check
const parsers = {
  c: require('./choice'),
  t: require('./text'),
  b: require('./basicInfo'),
  s: require('./select'),
  g: require('./gapfill')
}

/**
 * @param {Element} elem
 */
function parse (elem) {
  let result
  for (const type in parsers) {
    if ((result = parsers[type].parse(elem))) return result
  }
  console.group('Unknow problem')
  console.log(elem)
  console.groupEnd()
}

/**
 * @param {Element} elem
 * @param {string} type
 * @returns {string}
 */
function get (elem, type) {
  return parsers[type].get(elem)
}

/**
 * @param {Element} elem
 * @param {string} type
 */
function hide (elem, type) {
  return parsers[type].hide(elem)
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
  return parsers[type].set(elem, val)
}

/**
 * @param {Element} elem
 * @param {string} type
 * @param {string} val
 */
function display (elem, type, val) {
  hide(elem, type)
  return parsers[type].display(elem, val)
}

module.exports = {
  parse,
  get,
  set,
  display,
  hide,
  ...parsers
}
