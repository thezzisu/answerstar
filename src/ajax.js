// @ts-check

const crypto = require('crypto-browserify')
const Buffer = require('buffer/').Buffer

/* global SECRET, ENDPOINT, GM */
// @ts-ignore
const TOKEN = Buffer.from(SECRET, 'hex')

function crypt (buf, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', TOKEN, iv)
  let result = cipher.update(buf, 'utf8', 'hex')
  result += cipher.final('hex')
  return result
}

// @ts-ignore
function genRandom () {
  const length = Math.floor(Math.random() * 16) + 16
  return crypto.randomBytes(length).toString('hex')
}

/**
 * @param {string} key
 * @param {string} value
 * @returns {Promise<string>}
 */
function store (key, value) {
  const iv = crypto.randomBytes(16)
  return new Promise((resolve, reject) => {
    // @ts-ignore
    GM.xmlHttpRequest({
      method: 'POST',
      // @ts-ignore
      url: ENDPOINT,
      data: JSON.stringify({
        j: iv.toString('hex'),
        z: crypt(JSON.stringify([Date.now(), key, value]), iv),
        m: genRandom()
      }),
      onload: function (res) {
        resolve(res.responseText)
      },
      onerror: function (res) {
        reject(new Error('上传失败'))
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
}

/**
 * @param {string} key
 * @returns {Promise<string>}
 */
function pick (key) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    GM.xmlHttpRequest({
      method: 'GET',
      // @ts-ignore
      url: ENDPOINT + '?i=' + key,
      onload: function (res) {
        resolve(res.responseText || '')
      },
      onerror: function (res) {
        reject(new Error('获取失败'))
      }
    })
  })
}

exports.store = store
exports.pick = pick

function getIPv4 () {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    GM.xmlHttpRequest({
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
    GM.xmlHttpRequest({
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

/**
 * @param {string} poster
 * @param {string} syntax
 * @param {string} content
 * @returns {Promise<string>}
 */
async function dumpToUbuntuPastebin (poster, syntax, content) {
  const data = `poster=${encodeURIComponent(poster)}&syntax=${encodeURIComponent(syntax)}&expiration=&content=${encodeURIComponent(content)}`
  return new Promise((resolve, reject) => {
    // @ts-ignore
    GM.xmlHttpRequest({
      method: 'POST',
      url: 'https://paste.ubuntu.com/',
      data,
      onload: function (res) {
        const match = /p\/(.+)\/$/.exec(res.finalUrl)
        if (!match) return reject(new Error('上传失败'))
        resolve(match[1])
      },
      onerror: function (res) {
        reject(new Error('上传失败'))
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  })
}

exports.ubuntuPastebin = dumpToUbuntuPastebin
