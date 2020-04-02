/* eslint-disable */

function setFullScreen() {
  window.isWechat || !window.screenfull.isFullscreen() && window.screenfull.enabled() && window.screenfull.request()
}

if (maxCheatTimes > 0 && "true" === isRunning && !window.allowWeiXin) {
  function e() {
    var a = navigator.userAgent.toLowerCase();
    window.isWechat = "micromessenger" == a.match(/MicroMessenger/i)
  }
  function f(a, b) {
    !b && maxCheatTimes >= d && (d++,
      new Date,
      setCookie(activityId + "_" + "curCheatTime", d, getExpDate(0, 3, 0), "/", "", null)),
      PDF_close(),
      0 != d && (d > maxCheatTimes ? (hasSurveyTime = !0,
        hasMaxtime = !0,
        a ? (window.amt = 3,
          autoSubmit(a),
          submit_table.style.display = "none") : (window.amt = 3,
            autoSubmit("您切屏次数超过限制，不能继续作答，请提交现有答卷进度！"))) : popUpAlert("<div style='font-size:14px;text-align:center;'>为防止作弊，只允许在全屏模式下作答，退出全屏算一次切屏。<div style='height:8px;'></div>已切屏<span style='color:red;'>" + d + "</span>次，超过<span style='color:red;'>" + maxCheatTimes + "</span>次不允许再作答！</div>"))
  }
  var d, b = function () {
    for (var a, b, c = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], d = 0, e = c.length, f = {}; e > d; d++)
      if (a = c[d],
        a && a[1] in document) {
        for (d = 0,
          b = a.length; b > d; d++)
          f[c[0][d]] = a[d];
        return f
      }
    return !1
  }(), c = {
    request: function (a) {
      var c = b.requestFullscreen;
      a = a || document.documentElement,
        /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? a[c]() : a[c](Element.ALLOW_KEYBOARD_INPUT)
    },
    exit: function () {
      document[b.exitFullscreen]()
    },
    toggle: function (a) {
      this.isFullscreen ? this.exit() : this.request(a)
    },
    raw: b,
    isFullscreen: function () {
      return Boolean(document[b.fullscreenElement])
    },
    element: function () {
      return document[b.fullscreenElement]
    },
    enabled: function () {
      return Boolean(document[b.fullscreenEnabled])
    },
    alert: function (a) {
      PDF_launch("divForbidCheat", 520, 120),
        divchezchenz = document.getElementById("PDF_bg_chezchenz"),
        null != divchezchenz && (divchezchenz.style.height = screen.availHeight),
        divForbidCheat.innerHTML = ' <p style="font-size:18px;text-align:center;margin-top:36px">' + a + "</p>"
    }
  };
  if (b) {
    window.screenfull = c
    d = getCookie(activityId + "_" + "curCheatTime") || 0
    if (document.documentElement.addEventListener) {
      document.documentElement.addEventListener("click", setFullScreen, !1)
    } else {
      document.documentElement.attachEvent && document.documentElement.attachEvent("onclick", setFullScreen)
    }

    document.ready = function (a) {
      document.addEventListener ? document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, !1),
          a()
      }, !1) : document.attachEvent ? document.attachEvent("onreadystatechange", function () {
        "complete" == document.readyState && (document.detachEvent("onreadystatechange", arguments.callee),
          a())
      }) : document.lastChild == document.body && a()
    }

    document.ready(function () {
      window.isRunning && !window.allowWeiXin && (e(),
        window.isWechat || f("由于您切屏次数超过限制，系统为防止作弊不允许再作答！", !0))
    })
    c.enabled && (document.documentElement.addEventListener ? document.addEventListener(c.raw.fullscreenchange, function () {
      c.isFullscreen() || f()
    }) : document.documentElement.attachEvent && document.documentElement.attachEvent(c.raw.fullscreenchange, setFullScreen))

    window.onblur = function () {
      "iframe" == document.activeElement.tagName.toLowerCase() || fireConfirm || f(),
        fireConfirm = !1
    }
  } else {
    window.screenfull = !1
  }
}

var divForbidCheat = document.getElementById("divForbidCheat")
window.isWechat = !1
