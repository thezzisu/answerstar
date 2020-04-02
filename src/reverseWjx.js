/* eslint-disable no-undef */
/* eslint-disable no-global-assign */
/* eslint-disable camelcase */

const dateFormat = require('dateformat')

/**
 * @typedef {{ skipValidate?: boolean, overrideStarttime?: number, overrideT?: number, overrideIP?: string }} SubmitOptions
 *
 * @param {number} sType
 * @param {SubmitOptions} options
 */
function submit (sType, options) {
  if (options.overrideStarttime) {
    const d = new Date(options.overrideStarttime)
    unsafeWindow.starttime = dateFormat(d, 'yyyy/m/d H:MM:ss')
  }
  let lastPage
  if (sType === 2 || (options.skipValidate || validate())) {
    submit_tip.innerHTML = validate_info_submit2
    lastPage = 1
    if (sType === 0) {
      PromoteUser('正在处理，请稍候...', 3e3, true)
    } else if (sType === 2) {
      lastPage = cur_page
      hlv = '1'
    } else if (sType === 3) {
      PromoteUser('正在验证，请稍候...', 3e3, true)
    } else {
      submit_tip.style.display = 'block'
      submit_div.style.display = 'none'
    }
    needCheckLeave = false
    answer_send = sent_to_answer(sType)

    if (sType === 2 && prevsaveanswer === answer_send) {
      let e = '已保存'
      langVer === 1 && (e = "<div style='font-size:18px;'>&nbsp;&nbsp;Saved</div>")
      spanSave && (spanSave.innerHTML = e)
      return undefined
    }

    const f = getXmlHttp()
    f.onreadystatechange = function () {
      if (f.readyState === 4) {
        clearTimeout(timeoutTimer)
        var b = f.status
        if (b === 200) {
          afterSubmit(f.responseText, sType)
          prevsaveanswer = answer_send
        } else {
          processError(b, sType, xhrQuery)
        }
      }
    }
    let xhrQuery = 'submittype=' + sType + '&curID=' + activityId + '&t=' + (options.overrideT || (new Date()).valueOf())
    source && (xhrQuery += '&source=' + encodeURIComponent(source))
    unsafeWindow.udsid && (xhrQuery += '&udsid=' + unsafeWindow.udsid)
    unsafeWindow.fromsour && (xhrQuery += '&fromsour=' + unsafeWindow.fromsour)
    nvvv && (xhrQuery += '&nvvv=1')
    unsafeWindow.wxUserId && (xhrQuery += '&wxUserId=' + unsafeWindow.wxUserId)

    hasTouPiao && (xhrQuery += '&toupiao=t')
    jiFen > 0 && (xhrQuery += '&jf=' + jiFen)
    randomparm && (xhrQuery += '&ranparm=' + randomparm)
    inviteid && (xhrQuery += '&inviteid=' + encodeURIComponent(inviteid))
    SJBack && (xhrQuery += '&sjback=1')
    unsafeWindow.cpid && (xhrQuery += '&cpid=' + cpid)
    sType === 2 && (xhrQuery += '&lastpage=' + lastPage + '&lastq=' + MaxTopic)
    if (sType === 3) {
      xhrQuery += '&zbp=' + (cur_page + 1)
      needSubmitNotValid && (xhrQuery += '&nsnv=1')
    }
    hasJoin && sType !== 0 && (xhrQuery += '&nfjoinid=' + nfjoinid)
    unsafeWindow.parmsign && (xhrQuery += '&parmsign=' + encodeURIComponent(parmsign))
    unsafeWindow.qdataList && qdataList.length > 0 && (xhrQuery += '&aqsj=' + encodeURIComponent(qdataList.join('')))
    unsafeWindow.tCode && unsafeWindow.tCode.style.display !== 'none' && submit_text.value !== '' && (xhrQuery += '&validate_text=' + encodeURIComponent(submit_text.value))
    unsafeWindow.useAliVerify && (xhrQuery += '&nc_csessionid=' + encodeURIComponent(nc_csessionid) + '&nc_sig=' + encodeURIComponent(nc_sig) + '&nc_token=' + encodeURIComponent(nc_token) + '&nc_scene=' + nc_scene + '&validate_text=geet')
    xhrQuery += '&starttime=' + encodeURIComponent(starttime)
    guid && (xhrQuery += '&emailguid=' + guid)
    unsafeWindow.sjUser && (xhrQuery += '&sjUser=' + encodeURIComponent(sjUser))
    unsafeWindow.sjts && (xhrQuery += '&sjts=' + sjts)
    unsafeWindow.sjsign && (xhrQuery += '&sjsign=' + encodeURIComponent(sjsign))
    unsafeWindow.FromSj && (xhrQuery += '&fromsj=1')
    if (unsafeWindow.sourcelink && unsafeWindow.outuser) {
      xhrQuery += unsafeWindow.sourcelink
      unsafeWindow.outsign && (xhrQuery += '&outsign=' + encodeURIComponent(outsign))
    }
    xhrQuery += '&ktimes=' + ktimes
    unsafeWindow.mobileRnum && (xhrQuery += '&m=' + unsafeWindow.mobileRnum)
    unsafeWindow.rndnum && (xhrQuery += '&rn=' + encodeURIComponent(rndnum))
    if (rName) {
      const k = rName.replace('(', '（').replace(')', '）')
      setCookie('jcn' + activityId, k, getExpDate(0, 0, 30), '/', '', null)
    }
    unsafeWindow.relts && (xhrQuery += '&relts=' + relts)
    unsafeWindow.relusername && (xhrQuery += '&relusername=' + encodeURIComponent(relusername))
    unsafeWindow.relsign && (xhrQuery += '&relsign=' + encodeURIComponent(relsign))
    unsafeWindow.relrealname && (xhrQuery += '&relrealname=' + encodeURIComponent(relrealname))
    unsafeWindow.reldept && (xhrQuery += '&reldept=' + encodeURIComponent(reldept))
    unsafeWindow.relext && (xhrQuery += '&relext=' + encodeURIComponent(relext))
    Password && (xhrQuery += '&psd=' + encodeURIComponent(Password))
    PasswordExt && (xhrQuery += '&pwdext=' + encodeURIComponent(PasswordExt))
    hasMaxtime && (xhrQuery += '&hmt=1')
    unsafeWindow.amt && (xhrQuery += '&amt=' + amt)
    xhrQuery += '&hlv=' + hlv
    sourceDetail && (xhrQuery += '&sd=' + sourceDetail)
    if (unsafeWindow.imgVerify) {
      xhrQuery += '&btuserinput=' + encodeURIComponent(submit_text.value)
      xhrQuery += '&btcaptchaId=' + encodeURIComponent(unsafeWindow.imgVerify.captchaId)
      xhrQuery += '&btinstanceId=' + encodeURIComponent(unsafeWindow.imgVerify.instanceId)
    }
    unsafeWindow.access_token && unsafeWindow.openid && (xhrQuery += '&access_token=' + encodeURIComponent(access_token) + '&qqopenid=' + encodeURIComponent(openid))
    unsafeWindow.initMaxSurveyTime && (xhrQuery += '&mst=' + unsafeWindow.initMaxSurveyTime)

    const aliAcc = unsafeWindow.alipayAccount || unsafeWindow.cAlipayAccount
    aliAcc && (xhrQuery += '&alac=' + encodeURIComponent(aliAcc))

    if (shopHT.length > 0) {
      const m = document.getElementById('shopcart')
      m && m.style.display !== 'none' && (xhrQuery += '&ishop=1')
    }
    modata && setCookie('jcm' + activityId, modata, getExpDate(0, 0, 30), '/', '', null)
    if (unsafeWindow.jqnonce) {
      xhrQuery += '&jqnonce=' + encodeURIComponent(unsafeWindow.jqnonce)
      const n = dataenc(unsafeWindow.jqnonce)
      xhrQuery += '&jqsign=' + encodeURIComponent(n)
    }
    GetJpMatch()
    jpMatchId && (xhrQuery += '&jpm=' + jpMatchId)
    const xhrAnswer = encodeURIComponent(answer_send)
    let p = false
    let q = ''
    let r = ''

    for (let s = 0; s < trapHolder.length; s++) {
      q = ''
      const t = trapHolder[s].itemInputs
      const u = []
      for (let v = 0; v < t.length; v++) { t[v].checked && u.push(t[v].value) }
      u.sort(function (a, b) { return a - b })
      for (let v = 0; v < u.length; v++) { q += u[v] + ',' }
      const w = trapHolder[s].getAttribute('trapanswer')
      if (q && w && q.indexOf(w) === -1) {
        p = true
        r = trapHolder[s].getAttribute('tikuindex')
        break
      }
    }
    p && (xhrQuery += '&ite=1&ics=' + encodeURIComponent(r + ';' + q))

    let xhrUseGet = false
    let xhrMethod = 'post'
    const xhrQsLimit = unsafeWindow.getMaxWidth || 1800
    if (unsafeWindow.submitWithGet && xhrAnswer.length <= xhrQsLimit) {
      xhrUseGet = true
    }
    if (xhrUseGet) {
      xhrQuery += '&submitdata=' + xhrAnswer
      xhrQuery += '&useget=1'
      xhrMethod = 'get'
    } else {
      unsafeWindow.submitWithGet && (unsafeWindow.postIframe = 1)
    }
    unsafeWindow.refDepartment && (xhrQuery += '&rdept=' + encodeURIComponent(unsafeWindow.refDepartmentVal))
    unsafeWindow.refUserId && (xhrQuery += '&ruserid=' + encodeURIComponent(refUserIdVal))
    unsafeWindow.deptId && unsafeWindow.corpId && (xhrQuery += '&deptid=' + deptId + '&corpid=' + corpId)
    const joinUrl = '/joinnew/processjq.ashx?' + xhrQuery
    f.open(xhrMethod, joinUrl, false)
    f.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    if (options.overrideIP) {
      f.setRequestHeader('X-Forwarded-For', options.overrideIP)
      f.setRequestHeader('X-Real-IP', options.overrideIP)
    }

    havereturn = false
    if (unsafeWindow.postIframe) {
      postWithIframe(joinUrl, sType)
    } else {
      if (xhrUseGet) {
        if (errorTimes === 2 || unsafeWindow.getWithIframe) {
          GetWithIframe(joinUrl, sType, xhrQuery)
        } else {
          if (sType === 1) {
            timeoutTimer = setTimeout(function () {
              processError('ajaxget', sType, xhrQuery)
            }, 2e4)
          }
          f.send(null)
        }
      } else {
        if (sType === 1) {
          timeoutTimer = setTimeout(function () {
            processError('ajaxpost', sType, xhrQuery)
          }, 2e4)
        }
        f.send('submitdata=' + xhrAnswer)
      }
    }
  }
}

module.exports = {
  submit
}
