/* global unsafeWindow */

const fakeUA = 'Mozilla/5.0 (Linux; Android 9; CLT-AL00 Build/HUAWEICLT-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.93 Mobile Safari/537.36 MMWEBID/4649 MicroMessenger/7.0.10.1580(0x27000A55) Process/tools NetType/WIFI Language/zh_CN ABI/arm64'

Object.defineProperty(unsafeWindow.navigator, 'userAgent', {
  get: function () {
    return fakeUA
  }
})
