/* global GM */

/**
 * @typedef {string | number | boolean} Value
 */

module.exports = {
  /**
   * @param {string} name
   * @param {Value=} replace
   * @returns {Promise<Value>}
   */
  get (name, replace) {
    return GM.getValue(name, replace)
  },
  /**
   * @param {string} name
   * @param {Value} value
   * @returns {Promise<void>}
   */
  set (name, value) {
    return GM.setValue(name, value)
  },
  /**
   * @param {string} name
   * @returns {Promise<void>}
   */
  remove (name) {
    return GM.deleteValue(name)
  }
}
