/* eslint-disable */
const dateFormat = require('dateformat')

/**
 * @param {number} a
 * @param {boolean} skipValidate
 * @param {number | undefined} overrideT
 * @param {number | undefined} overrideStarttime
 */
function submit(a, skipValidate, overrideT, overrideStarttime) {
  if (overrideStarttime) {
    const d = new Date(overrideStarttime)
    unsafeWindow.starttime = dateFormat(d, 'yyyy/m/d H:MM:ss')
  }
  var d, e, f, g, h, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
  if (2 == a || (skipValidate || validate())) {
    if (submit_tip.innerHTML = validate_info_submit2,
      d = 1,
      0 == a ? PromoteUser("正在处理，请稍候...", 3e3, !0) : 2 == a ? (d = cur_page,
        hlv = "1") : 3 == a ? PromoteUser("正在验证，请稍候...", 3e3, !0) : (submit_tip.style.display = "block",
          submit_div.style.display = "none"),
      needCheckLeave = !1,
      answer_send = sent_to_answer(a),
      2 == a && prevsaveanswer == answer_send)
      return e = "已保存",
        1 == langVer && (e = "<div style='font-size:18px;'>&nbsp;&nbsp;Saved</div>"),
        spanSave && (spanSave.innerHTML = e),
        void 0;
    if (f = getXmlHttp(),
      f.onreadystatechange = function () {
        if (4 == f.readyState) {
          clearTimeout(timeoutTimer);
          var b = f.status;
          200 == b ? (afterSubmit(f.responseText, a),
            prevsaveanswer = answer_send) : processError(b, a, g)
        }
      }
      ,
      g = "submittype=" + a + "&curID=" + activityId + "&t=" + (overrideT ? overrideT : (new Date).valueOf()),
      source && (g += "&source=" + encodeURIComponent(source)),
      unsafeWindow.udsid && (g += "&udsid=" + unsafeWindow.udsid),
      unsafeWindow.fromsour && (g += "&fromsour=" + unsafeWindow.fromsour),
      nvvv && (g += "&nvvv=1"),
      unsafeWindow.wxUserId && (g += "&wxUserId=" + unsafeWindow.wxUserId),
      unsafeWindow.cProvince && (g += "&cp=" + encodeURIComponent(cProvince.replace("'", "")) + "&cc=" + encodeURIComponent(cCity.replace("'", "")) + "&ci=" + escape(cIp),
        0 == jiFen)) {
      h = cProvince + "," + cCity;
      try {
        setCookie("ip_" + cIp, h, null, "/", "", null)
      } catch (i) { }
    }
    for (hasTouPiao && (g += "&toupiao=t"),
      jiFen > 0 && (g += "&jf=" + jiFen),
      randomparm && (g += "&ranparm=" + randomparm),
      inviteid && (g += "&inviteid=" + encodeURIComponent(inviteid)),
      SJBack && (g += "&sjback=1"),
      unsafeWindow.cpid && (g += "&cpid=" + cpid),
      2 == a && (g += "&lastpage=" + d + "&lastq=" + MaxTopic),
      3 == a && (g += "&zbp=" + (cur_page + 1),
        needSubmitNotValid && (g += "&nsnv=1")),
      hasJoin && 0 != a && (g += "&nfjoinid=" + nfjoinid),
      unsafeWindow.sojumpParm && (j = unsafeWindow.sojumpParm,
        unsafeWindow.hasEncode || (j = encodeURIComponent(j)),
        g += "&sojumpparm=" + j),
      unsafeWindow.parmsign && (g += "&parmsign=" + encodeURIComponent(parmsign)),
      unsafeWindow.qdataList && qdataList.length > 0 && (g += "&aqsj=" + encodeURIComponent(qdataList.join(""))),
      tCode && "none" != tCode.style.display && "" != submit_text.value && (g += "&validate_text=" + encodeURIComponent(submit_text.value)),
      unsafeWindow.useAliVerify && (g += "&nc_csessionid=" + encodeURIComponent(nc_csessionid) + "&nc_sig=" + encodeURIComponent(nc_sig) + "&nc_token=" + encodeURIComponent(nc_token) + "&nc_scene=" + nc_scene + "&validate_text=geet"),
      g += "&starttime=" + encodeURIComponent(starttime),
      guid && (g += "&emailguid=" + guid),
      unsafeWindow.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)),
      unsafeWindow.sjts && (g += "&sjts=" + sjts),
      unsafeWindow.sjsign && (g += "&sjsign=" + encodeURIComponent(sjsign)),
      unsafeWindow.FromSj && (g += "&fromsj=1"),
      unsafeWindow.sourcelink && unsafeWindow.outuser && (g += unsafeWindow.sourcelink,
        unsafeWindow.outsign && (g += "&outsign=" + encodeURIComponent(outsign))),
      g += "&ktimes=" + ktimes,
      unsafeWindow.mobileRnum && (g += "&m=" + unsafeWindow.mobileRnum),
      unsafeWindow.rndnum && (g += "&rn=" + encodeURIComponent(rndnum)),
      rName && (k = rName.replace("(", "（").replace(")", "）"),
        setCookie("jcn" + activityId, k, getExpDate(0, 0, 30), "/", "", null)),
      unsafeWindow.relts && (g += "&relts=" + relts),
      unsafeWindow.relusername && (g += "&relusername=" + encodeURIComponent(relusername)),
      unsafeWindow.relsign && (g += "&relsign=" + encodeURIComponent(relsign)),
      unsafeWindow.relrealname && (g += "&relrealname=" + encodeURIComponent(relrealname)),
      unsafeWindow.reldept && (g += "&reldept=" + encodeURIComponent(reldept)),
      unsafeWindow.relext && (g += "&relext=" + encodeURIComponent(relext)),
      Password && (g += "&psd=" + encodeURIComponent(Password)),
      PasswordExt && (g += "&pwdext=" + encodeURIComponent(PasswordExt)),
      hasMaxtime && (g += "&hmt=1"),
      unsafeWindow.amt && (g += "&amt=" + amt),
      g += "&hlv=" + hlv,
      sourceDetail && (g += "&sd=" + sourceDetail),
      imgVerify && (g += "&btuserinput=" + encodeURIComponent(submit_text.value),
        g += "&btcaptchaId=" + encodeURIComponent(imgVerify.captchaId),
        g += "&btinstanceId=" + encodeURIComponent(imgVerify.instanceId)),
      unsafeWindow.access_token && unsafeWindow.openid && (g += "&access_token=" + encodeURIComponent(access_token) + "&qqopenid=" + encodeURIComponent(openid)),
      unsafeWindow.initMaxSurveyTime && (g += "&mst=" + unsafeWindow.initMaxSurveyTime),
      l = unsafeWindow.alipayAccount || unsafeWindow.cAlipayAccount,
      l && (g += "&alac=" + encodeURIComponent(l)),
      shopHT.length > 0 && (m = document.getElementById("shopcart"),
        m && "none" != m.style.display && (g += "&ishop=1")),
      modata && setCookie("jcm" + activityId, modata, getExpDate(0, 0, 30), "/", "", null),
      unsafeWindow.jqnonce && (g += "&jqnonce=" + encodeURIComponent(unsafeWindow.jqnonce),
        n = dataenc(unsafeWindow.jqnonce),
        g += "&jqsign=" + encodeURIComponent(n)),
      GetJpMatch(),
      jpMatchId && (g += "&jpm=" + jpMatchId),
      o = encodeURIComponent(answer_send),
      p = !1,
      q = "",
      r = "",
      s = 0; s < trapHolder.length; s++) {
      for (q = "",
        t = trapHolder[s].itemInputs,
        u = new Array,
        v = 0; v < t.length; v++)
        t[v].checked && u.push(t[v].value);
      for (u.sort(function (a, b) {
        return a - b
      }),
        v = 0; v < u.length; v++)
        q += u[v] + ",";
      if (w = trapHolder[s].getAttribute("trapanswer"),
        q && w && -1 == q.indexOf(w)) {
        p = !0,
          r = trapHolder[s].getAttribute("tikuindex");
        break
      }
    }
    p && (g += "&ite=1&ics=" + encodeURIComponent(r + ";" + q)),
      x = !1,
      y = "post",
      z = unsafeWindow.getMaxWidth || 1800,
      unsafeWindow.submitWithGet && o.length <= z && (x = !0),
      x ? (g += "&submitdata=" + o,
        g += "&useget=1",
        y = "get") : unsafeWindow.submitWithGet && (unsafeWindow.postIframe = 1),
      unsafeWindow.refDepartment && (g += "&rdept=" + encodeURIComponent(unsafeWindow.refDepartmentVal)),
      unsafeWindow.refUserId && (g += "&ruserid=" + encodeURIComponent(refUserIdVal)),
      unsafeWindow.deptId && unsafeWindow.corpId && (g += "&deptid=" + deptId + "&corpid=" + corpId),
      A = "/joinnew/processjq.ashx?" + g,
      f.open(y, A, !1),
      f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
      havereturn = !1,
      unsafeWindow.postIframe ? postWithIframe(A, a) : x ? 2 == errorTimes || unsafeWindow.getWithIframe ? GetWithIframe(A, a, g) : (1 == a && (timeoutTimer = setTimeout(function () {
        processError("ajaxget", a, g)
      }, 2e4)),
        f.send(null)) : (1 == a && (timeoutTimer = setTimeout(function () {
          processError("ajaxpost", a, g)
        }, 2e4)),
          f.send("submitdata=" + o))
  }
}

module.exports = {
  submit
}