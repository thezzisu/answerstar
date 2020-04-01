/* eslint-disable no-undef */
/* eslint-disable no-global-assign */
/* eslint-disable camelcase */

const dateFormat = require('dateformat')

/**
 * @typedef {{ skipValidate?: boolean, overrideStarttime?: number, overrideT?: number, overrideIP?: string }} SubmitOptions
 *
 * @param {number} a
 * @param {SubmitOptions} options
 */
function submit (a, options) {
  if (options.overrideStarttime) {
    const d = new Date(options.overrideStarttime)
    unsafeWindow.starttime = dateFormat(d, 'yyyy/m/d H:MM:ss')
  }
  var d, e, f, g, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A
  if (a === 2 || (options.skipValidate || validate())) {
    submit_tip.innerHTML = validate_info_submit2
    d = 1
    if (a === 0) {
      PromoteUser('正在处理，请稍候...', 3e3, !0)
    } else if (a === 2) {
      d = cur_page
      hlv = '1'
    } else if (a === 3) {
      PromoteUser('正在验证，请稍候...', 3e3, !0)
    } else {
      submit_tip.style.display = 'block'
      submit_div.style.display = 'none'
    }
    needCheckLeave = !1
    answer_send = sent_to_answer(a)

    if (a === 2 && prevsaveanswer === answer_send) {
      e = '已保存'
      langVer === 1 && (e = "<div style='font-size:18px;'>&nbsp;&nbsp;Saved</div>")
      spanSave && (spanSave.innerHTML = e)
      return undefined
    }

    f = getXmlHttp()
    f.onreadystatechange = function () {
      if (f.readyState === 4) {
        clearTimeout(timeoutTimer)
        var b = f.status
        if (b === 200) {
          afterSubmit(f.responseText, a)
          prevsaveanswer = answer_send
        } else {
          processError(b, a, g)
        }
      }
    }
    g = 'submittype=' + a + '&curID=' + activityId + '&t=' + (options.overrideT || (new Date()).valueOf())
    source && (g += '&source=' + encodeURIComponent(source))
    unsafeWindow.udsid && (g += '&udsid=' + unsafeWindow.udsid)
    unsafeWindow.fromsour && (g += '&fromsour=' + unsafeWindow.fromsour)
    nvvv && (g += '&nvvv=1')
    unsafeWindow.wxUserId && (g += '&wxUserId=' + unsafeWindow.wxUserId)

    hasTouPiao && (g += '&toupiao=t')
    jiFen > 0 && (g += '&jf=' + jiFen)
    randomparm && (g += '&ranparm=' + randomparm)
    inviteid && (g += '&inviteid=' + encodeURIComponent(inviteid))
    SJBack && (g += '&sjback=1')
    unsafeWindow.cpid && (g += '&cpid=' + cpid)
    a === 2 && (g += '&lastpage=' + d + '&lastq=' + MaxTopic)
    if (a === 3) {
      g += '&zbp=' + (cur_page + 1)
      needSubmitNotValid && (g += '&nsnv=1')
    }
    hasJoin && a !== 0 && (g += '&nfjoinid=' + nfjoinid)
    if (unsafeWindow.sojumpParm) {
      j = unsafeWindow.sojumpParm
      unsafeWindow.hasEncode || (j = encodeURIComponent(j))
      g += '&sojumpparm=' + j
    }
    unsafeWindow.parmsign && (g += '&parmsign=' + encodeURIComponent(parmsign))
    unsafeWindow.qdataList && qdataList.length > 0 && (g += '&aqsj=' + encodeURIComponent(qdataList.join('')))
    unsafeWindow.tCode && unsafeWindow.tCode.style.display !== 'none' && submit_text.value !== '' && (g += '&validate_text=' + encodeURIComponent(submit_text.value))
    unsafeWindow.useAliVerify && (g += '&nc_csessionid=' + encodeURIComponent(nc_csessionid) + '&nc_sig=' + encodeURIComponent(nc_sig) + '&nc_token=' + encodeURIComponent(nc_token) + '&nc_scene=' + nc_scene + '&validate_text=geet')
    g += '&starttime=' + encodeURIComponent(starttime)
    guid && (g += '&emailguid=' + guid)
    unsafeWindow.sjUser && (g += '&sjUser=' + encodeURIComponent(sjUser))
    unsafeWindow.sjts && (g += '&sjts=' + sjts)
    unsafeWindow.sjsign && (g += '&sjsign=' + encodeURIComponent(sjsign))
    unsafeWindow.FromSj && (g += '&fromsj=1')
    if (unsafeWindow.sourcelink && unsafeWindow.outuser) {
      g += unsafeWindow.sourcelink
      unsafeWindow.outsign && (g += '&outsign=' + encodeURIComponent(outsign))
    }
    g += '&ktimes=' + ktimes
    unsafeWindow.mobileRnum && (g += '&m=' + unsafeWindow.mobileRnum)
    unsafeWindow.rndnum && (g += '&rn=' + encodeURIComponent(rndnum))
    if (rName) {
      k = rName.replace('(', '（').replace(')', '）')
      setCookie('jcn' + activityId, k, getExpDate(0, 0, 30), '/', '', null)
    }
    unsafeWindow.relts && (g += '&relts=' + relts)
    unsafeWindow.relusername && (g += '&relusername=' + encodeURIComponent(relusername))
    unsafeWindow.relsign && (g += '&relsign=' + encodeURIComponent(relsign))
    unsafeWindow.relrealname && (g += '&relrealname=' + encodeURIComponent(relrealname))
    unsafeWindow.reldept && (g += '&reldept=' + encodeURIComponent(reldept))
    unsafeWindow.relext && (g += '&relext=' + encodeURIComponent(relext))
    Password && (g += '&psd=' + encodeURIComponent(Password))
    PasswordExt && (g += '&pwdext=' + encodeURIComponent(PasswordExt))
    hasMaxtime && (g += '&hmt=1')
    unsafeWindow.amt && (g += '&amt=' + amt)
    g += '&hlv=' + hlv
    sourceDetail && (g += '&sd=' + sourceDetail)
    if (unsafeWindow.imgVerify) {
      g += '&btuserinput=' + encodeURIComponent(submit_text.value)
      g += '&btcaptchaId=' + encodeURIComponent(unsafeWindow.imgVerify.captchaId)
      g += '&btinstanceId=' + encodeURIComponent(unsafeWindow.imgVerify.instanceId)
    }
    unsafeWindow.access_token && unsafeWindow.openid && (g += '&access_token=' + encodeURIComponent(access_token) + '&qqopenid=' + encodeURIComponent(openid))
    unsafeWindow.initMaxSurveyTime && (g += '&mst=' + unsafeWindow.initMaxSurveyTime)
    l = unsafeWindow.alipayAccount || unsafeWindow.cAlipayAccount
    l && (g += '&alac=' + encodeURIComponent(l))
    if (shopHT.length > 0) {
      m = document.getElementById('shopcart')
      m && m.style.display !== 'none' && (g += '&ishop=1')
    }
    modata && setCookie('jcm' + activityId, modata, getExpDate(0, 0, 30), '/', '', null)
    if (unsafeWindow.jqnonce) {
      g += '&jqnonce=' + encodeURIComponent(unsafeWindow.jqnonce)
      n = dataenc(unsafeWindow.jqnonce)
      g += '&jqsign=' + encodeURIComponent(n)
    }
    GetJpMatch()
    jpMatchId && (g += '&jpm=' + jpMatchId)
    o = encodeURIComponent(answer_send)
    p = !1
    q = ''
    r = ''

    for (s = 0; s < trapHolder.length; s++) {
      q = ''
      t = trapHolder[s].itemInputs
      u = []
      for (v = 0; v < t.length; v++) { t[v].checked && u.push(t[v].value) }
      u.sort(function (a, b) { return a - b })
      for (v = 0; v < u.length; v++) { q += u[v] + ',' }
      w = trapHolder[s].getAttribute('trapanswer')
      if (q && w && q.indexOf(w) === -1) {
        p = !0
        r = trapHolder[s].getAttribute('tikuindex')
        break
      }
    }
    p && (g += '&ite=1&ics=' + encodeURIComponent(r + ';' + q))
    x = !1
    y = 'post'
    z = unsafeWindow.getMaxWidth || 1800
    unsafeWindow.submitWithGet && o.length <= z && (x = !0)
    if (x) {
      g += '&submitdata=' + o
      g += '&useget=1'
      y = 'get'
    } else {
      unsafeWindow.submitWithGet && (unsafeWindow.postIframe = 1)
    }
    unsafeWindow.refDepartment && (g += '&rdept=' + encodeURIComponent(unsafeWindow.refDepartmentVal))
    unsafeWindow.refUserId && (g += '&ruserid=' + encodeURIComponent(refUserIdVal))
    unsafeWindow.deptId && unsafeWindow.corpId && (g += '&deptid=' + deptId + '&corpid=' + corpId)
    A = '/joinnew/processjq.ashx?' + g
    f.open(y, A, !1)
    f.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    if (options.overrideIP) {
      f.setRequestHeader('X-Forwarded-For', options.overrideIP)
      f.setRequestHeader('X-Real-IP', options.overrideIP)
    }

    havereturn = !1
    if (unsafeWindow.postIframe) {
      postWithIframe(A, a)
    } else {
      if (x) {
        if (errorTimes === 2 || unsafeWindow.getWithIframe) {
          GetWithIframe(A, a, g)
        } else {
          if (a === 1) {
            timeoutTimer = setTimeout(function () {
              processError('ajaxget', a, g)
            }, 2e4)
          }
          f.send(null)
        }
      } else {
        if (a === 1) {
          timeoutTimer = setTimeout(function () {
            processError('ajaxpost', a, g)
          }, 2e4)
        }
        f.send('submitdata=' + o)
      }
    }
  }
}

module.exports = {
  submit
}
