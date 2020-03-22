// @ts-check

// @ts-ignore
const crypto = require('crypto-browserify')
const Buffer = require('buffer/').Buffer

/* global SECRET, ENDPOINT, GM_xmlhttpRequest */
// @ts-ignore
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
  // @ts-ignore
  const result = await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      j: iv.toString('hex'),
      z: crypt(JSON.stringify([Date.now(), key, value]), iv),
      m: genRandom()
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (result.status !== 200) throw new Error('上传失败')
}

/**
 * @param {string} key
 */
async function pick (key) {
  // @ts-ignore
  const resp = await fetch(ENDPOINT + '?i=' + key, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
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

function getIPv4 () {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://v4.ipv6-test.com/api/myip.php',
      onload: function (res) {
        resolve(res.responseText)
      },
      onerror: function (res) {
        reject(new Error(res.responseText))
      }
    })
  })
}

exports.getIPv4 = getIPv4

/**
 * @param {string} ipv4
 */
function getIPv4Details (ipv4) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://ip-api.com/json/' + ipv4,
      onload: function (res) {
        resolve(res.responseText)
      },
      onerror: function (res) {
        reject(new Error(res.responseText))
      }
    })
  })
}

exports.getIPv4Details = getIPv4Details

async function getIPv4All () {
  try {
    const ip = await getIPv4()
    const info = JSON.parse(await getIPv4Details(ip))
    return `${ip} (${info.countryCode},${info.regionName},${info.city})`
  } catch (e) {
    return '获取失败'
  }
}

exports.getIPv4All = getIPv4All
