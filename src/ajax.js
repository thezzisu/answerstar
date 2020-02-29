const crypto = require('crypto-browserify')
const Buffer = require('buffer/').Buffer

/* global SECRET, ENDPOINT */
const TOKEN = Buffer.from(SECRET, 'hex')

function crypt (buf, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', TOKEN, iv)
  let result = cipher.update(buf, 'utf8', 'hex')
  result += cipher.final('hex')
  return result
}

function genRandom () {
  const length = Math.floor(Math.random() * 16) + 16
  return crypto.randomBytes(length).toString('hex')
}

/**
 * @param {string} key
 * @param {string} value
 */
async function store (key, value) {
  const iv = crypto.randomBytes(16)
  await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      j: iv.toString('hex'),
      z: crypt(JSON.stringify([Date.now(), key, value]), iv),
      m: genRandom()
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-fucker': genRandom()
    }
  })
}

/**
 * @param {string} key
 */
async function pick (key) {
  const resp = await fetch(ENDPOINT + '?i=' + key, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-fucker': genRandom()
    }
  })
  return resp.text()
}

// /**
//  * @param {string} key
//  * @param {string} value
//  * @returns {Promise<string>}
//  */
// function store (key, value) {
//   const iv = crypto.randomBytes(16)
//   const time = crypt(Date.now().toString(), iv)
//   return new Promise((resolve, reject) => {
//     GM_xmlhttpRequest({
//       method: 'GET',
//       url: ENDPOINT + '?i=' + key,
//       data: JSON.stringify({ j: iv.toString('hex'), z: time, m: key, x: value }),
//       onload: function (res) {
//         resolve(res.responseText)
//       },
//       onerror: function (res) {
//         reject(res.responseText)
//       },
//       headers: {
//         'Content-Type': 'application/json',
//         'x-fucker': crypto.randomBytes(32).toString('hex')
//       }
//     })
//   })
// }

// /**
//  * @param {string} key
//  * @returns {Promise<string>}
//  */
// function pick (key) {
//   return new Promise((resolve, reject) => {
//     GM_xmlhttpRequest({
//       method: 'GET',
//       url: ENDPOINT + '?i=' + key,
//       onload: function (res) {
//         resolve(res.responseText)
//       },
//       onerror: function (res) {
//         reject(res.responseText)
//       },
//       headers: {
//         'x-fucker': crypto.randomBytes(32).toString('hex')
//       }
//     })
//   })
// }

exports.store = store
exports.pick = pick
