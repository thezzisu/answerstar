/* eslint-disable */

function forbidBackSpace(a) {
  var b = a || window.event
    , c = b.target || b.srcElement
    , d = c.type || c.getAttribute("type")
    , e = 8 == b.keyCode && "password" != d && "text" != d && "textarea" != d;
  return e ? !1 : void 0
}
function avoidCopy(a) {
  if (a = window.event || a,
    isKaoShi)
    return !1;
  var b;
  return a && (a.target ? b = a.target : a.srcElement && (b = a.srcElement),
    3 == b.nodeType && (b = b.parentNode),
    "INPUT" == b.tagName || "TEXTAREA" == b.tagName || "SELECT" == b.tagName) ? !0 : (document.selection && document.selection.empty && document.selection.empty(),
      !1)
}
function openlink(a, b) {
  var d, c = a.getAttribute("data-url") || a.getAttribute("href");
  return 0 == c.indexOf("http") && (PDF_close(),
    PDF_launch(c.replace(/&amp;/g, "&"), 800, 600)),
    d = window.event || b,
    stopPropa(d),
    !1
}
function showItemDesc(a, b, c) {
  var f, g, h, i, j, k, d = document.getElementById(a), e = document.getElementById("divDescPopData");
  e.innerHTML = d.innerHTML,
    f = trim(d.innerHTML),
    window.top != window && (ZheZhaoControl = b),
    0 == f.indexOf("http") ? PDF_launch(f.replace(/&amp;/g, "&"), 800, 600) : (g = document.getElementById("divDescPop"),
      h = g.getElementsByTagName("iframe")[0],
      h && (i = h.getAttribute("xsrc"),
        i && h.setAttribute("src", i)),
      g.style.display = "",
      g.style.width = "500px",
      j = e.offsetHeight + 20,
      k = 500,
      500 > j && j > 50 && (k = j),
      PDF_launch("divDescPop", 500, k)),
    stopPropa(c)
}
function getTop(a) {
  for (var b = a.offsetLeft, c = a.offsetTop; a = a.offsetParent;)
    b += a.offsetLeft,
      c += a.offsetTop;
  return {
    x: b,
    y: c
  }
}
function addEventSimple(a, b, c) {
  a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
}
function removeEventSimple(a, b, c) {
  a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
}
function Request(a) {
  var f, g, b = window.document.location.href, c = b.indexOf("?"), d = b.substr(c + 1), e = d.split("&");
  for (f = 0; f < e.length; f++)
    if (g = e[f].split("="),
      g[0].toUpperCase() == a.toUpperCase())
      return g[1];
  return ""
}
function openCityBox(a, b, c, d) {
  var e, f, g, i;
  if (txtCurCity = a,
    "1" == a.getAttribute("lastdata") && (txtCurCity.lastData = 1),
    ZheZhaoControl = txtCurCity,
    d = d || "",
    e = a.getAttribute("province"),
    f = "",
    e && (f = "&pv=" + encodeURIComponent(e)),
    3 == b)
    PDF_launch("/joinnew/setcitycounty.aspx?activityid=" + activityId + "&ct=" + b + f + "&pos=" + d, 450, 220);
  else if (5 == b)
    PDF_launch("/joinnew/setmenuselp.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, 470, 220);
  else if (7 == b)
    ZheZhaoControl = null,
      PDF_launch("/joinnew/setCascaderSelector.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, 520, 460);
  else if (6 == b) {
    if (ZheZhaoControl = null,
      g = "/wjx/join/amap.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d,
      document.documentElement.clientHeight || document.body.clientHeight,
      i = !1,
      a.parent && a.parent.dataNode && a.parent.dataNode._needOnly ? i = !0 : a.parent && "1" == a.parent.getAttribute("needonly") ? i = !0 : "1" == a.getAttribute("needonly") && (i = !0),
      i && (g += "&nc=1",
        a.value))
      return writeError(a.parent, "提示：定位后无法修改。", 0, !0),
        void 0;
    PDF_launch(g, 700, 800)
  } else
    4 == b ? (ZheZhaoControl = null,
      PDF_launch("/joinnew/school.aspx?activityid=" + activityId + f, 700, 558)) : PDF_launch("/joinnew/setcity.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, 470, 220)
}
function setChoice(a) {
  var b = getPreviousNode(a);
  b && (b.value = a.value),
    curdiv && updateProgressBar(curdiv.dataNode)
}
function setCityBox(a, b, c) {
  var d, e, f;
  b && "getlocalbtn" == txtCurCity.parentNode.className.toLowerCase() && (d = txtCurCity.parentNode.previousSibling,
    a && (d.style.display = "block",
      d.innerHTML = a,
      txtCurCity.parentNode.style.top = "0px")),
    txtCurCity.value = a,
    txtCurCity.relValue = c,
    e = txtCurCity.offsetWidth,
    f = 14 * a.length,
    "多级下拉" == curdiv.dataNode._verify && (txtCurCity.style.height = 22 * Math.ceil(f / 650) + "px"),
    f = f > 650 ? 650 : f,
    f > e && (txtCurCity.style.width = f + "px"),
    txtCurCity.onchange && txtCurCity.onchange()
}
function trim(a) {
  return a.replace(/(^\s*)|(\s*$)/g, "")
}
function isInt(a) {
  var b = /^-?[0-9]+$/;
  return b.test(a)
}
function replace_specialChar(a) {
  var b, c;
  for (b = 0; b < spChars.length; b++)
    c = new RegExp("(\\" + spChars[b] + ")", "g"),
      a = a.replace(c, spToChars[b]);
  return /^[A-Za-z\s\.,]+$/.test(a) && (a = a.replace(/\s+/g, " ")),
    a = a.replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/gi, ""),
    trim(a)
}
function isRadioImage(a) {
  return a && "0" != a && "1" != a && "101" != a ? !0 : !1
}
function isRadioRate(a) {
  return "" != a && "0" != a && "1" != a && "-1" != a
}
function changeHeight(a) {
  var c, d, e, b = parseInt(a.style.height);
  b && (a.initHeight || (a.initHeight = b),
    c = 18,
    d = 100,
    e = a.scrollHeight,
    e = e > c ? e : c,
    e = e > d ? d : e,
    e - b >= 10 && (a.style.height = e + "px"),
    (!a.value || a.value.length < 5) && (a.style.height = a.initHeight + "px"),
    curdiv && "matrix" == curdiv.dataNode._type && "302" == curdiv.dataNode._mode && window.setTipValueHandler && setTipValueHandler(a),
    window.monitorCloneTable && monitorCloneTable(a))
}
function fcInputboxFocus() { }
function lengthChange(a) {
  var b = a.value.length
    , c = a.size;
  b >= c && 80 >= c && (a.size = b + 2)
}
function fcInputboxBlur() {
  this.value ? this.style.color = "#000000" : (this.value = defaultOtherText,
    this.style.color = "#999999")
}
function isTextBoxEmpty(a) {
  return a = trim(a),
    "" == a || a == defaultOtherText ? !0 : !1
}
function setMatrixFill() {
  (!curMatrixError || curMatrixFill.fillvalue) && (divMatrixRel.style.display = "none")
}
function showMatrixFill(a, b) {
  var c, d, e, f, g, h, i;
  if (b) {
    if (curMatrixError)
      return;
    curMatrixError = a
  }
  curMatrixFill = a,
    c = "请注明...",
    d = a.getAttribute("req"),
    d && (c = "请注明...[必填]"),
    1 == langVer && (c = "Please specify"),
    e = a.fillvalue || a.getAttribute("fillvalue") || "",
    matrixinput.value = e,
    e || (matrixinput.value = c),
    f = getPreviousNode(a),
    g = getTop(f),
    h = g.y - 35,
    i = g.x - 190,
    divMatrixRel.style.top = h + "px",
    divMatrixRel.style.left = i + "px",
    divMatrixRel.style.display = ""
}
function refresh_validate() {
  imgCode && "none" != tCode.style.display && "none" != imgCode.style.display ? imgCode.src = "/wjx/join/AntiSpamImageGen.aspx?q=" + activityId + "&t=" + (new Date).valueOf() : 1 == window.useAliVerify ? (isCaptchaValid = !1,
    captchaOjb.reload()) : 2 == window.useAliVerify && (isCaptchaValid = !1,
      captchaOjb.reset())
}
function enter_clicksub(a) {
  a = a || window.event,
    a && 13 == a.keyCode && (ktimes++,
      submit(1))
}
function showSubmitTable(a) {
  submit_table.style.display = a ? "" : "none";
  var b = document.getElementById("captcha");
  b && (b.style.display = a ? "" : "none")
}
function Init() {
  var a, b, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, Db, Eb, Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb, Ob, Pb, Qb, Rb, Sb, Tb, Ub, Vb, Wb, Xb, Yb, Zb, $b, _b, ac;
  for (0 == cur_page && !displayPrevPage && pre_page && (pre_page.style.display = "none",
    pre_page.disabled = !0),
    pageHolder = $$tag("fieldset", survey),
    a = 0; a < pageHolder.length; a++)
    b = "true" == pageHolder[a].getAttribute("skip"),
      b && (pageHolder[a].skipPage = !0);
  submit_button.onmouseover = function () {
    ktimes++,
      this.className = "submitbutton submitbutton_hover",
      isPub && 0 == langVer && "" != document.getElementById("spanTest").style.display && "3" != hasJoin && (document.getElementById("spanTest").style.display = "",
        document.getElementById("submittest_button").onmouseover = function () {
          show_status_tip("您是发布者，可以进行试填问卷，试填的答卷不会参与结果统计！", 5e3),
            document.getElementById("submittest_button").onmouseover = null
        }
      )
  }
    ,
    submit_button.onclick = function () {
      return window.isWaiGuan ? (popUpAlert("提示：问卷预览页面，只能预览，不能提交！"),
        void 0) : (checkDisalbed() || submit(1),
          void 0)
    }
    ,
    isPub && (document.getElementById("submittest_button").onclick = function () {
      maxCheatTimes > 0 && (fireConfirm = !0),
        confirm("试填后的答卷不会参与结果统计，确定试填吗？") && submit(5)
    }
    ),
    keywordarray = (window.awardkeylist || "").split("┋"),
    window.qukeylist && (quarray = qukeylist.split("|"));
  try {
    checkTitleDescMatch()
  } catch (c) { }
  for ("3" == hasJoin && (d = document.getElementById("divEdtTip"),
    d && (d.style.display = "none"),
    submit_button.onclick = function () {
      checkDisalbed() || (maxCheatTimes > 0 && (fireConfirm = !0),
        window.confirm("确定编辑此答卷吗？") && (isEdtData = !0,
          submit(6)))
    }
  ),
    1 == totalPage && "true" == isRunning && "1" != hasJoin ? showSubmitTable(!0) : "true" != isRunning ? (e = document.getElementById("spanNotSubmit"),
      e && "" != trim(e.innerHTML) ? (1 == totalPage && "1" != hasJoin && showSubmitTable(!0),
        nextPageAlertText = e.innerHTML.replace(/<[^>]*>/g, ""),
        submit_button.onclick = function () {
          checkDisalbed() || (popUpAlert(nextPageAlertText),
            e.scrollIntoView())
        }
      ) : showSubmitTable(!1)) : showSubmitTable(!1),
    pre_page && (pre_page.onclick = show_pre_page),
    next_page && (next_page.onclick = show_next_page),
    tCode && "none" != tCode.style.display && "true" == isRunning && (submit_text.value = validate_info_submit_title3,
      addEventSimple(submit_text, "blur", function () {
        "" == submit_text.value && (submit_text.value = validate_info_submit_title3)
      }),
      addEventSimple(submit_text, "focus", function () {
        submit_text.value == validate_info_submit_title3 && (submit_text.value = "")
      }),
      imgCode.style.display = "none",
      0 != langVer && (imgCode.alt = ""),
      addEventSimple(submit_text, "click", function () {
        var a, b, c;
        needAvoidCrack || "none" != imgCode.style.display ? needAvoidCrack && !imgVerify && (a = document.getElementById("divCaptcha"),
          a.style.display = "",
          imgVerify = a.getElementsByTagName("img")[0],
          imgVerify.style.cursor = "pointer",
          imgVerify.onclick = function () {
            var a = new Date
              , b = a.getTime() + 6e4 * a.getTimezoneOffset()
              , c = window.location.host || "www.sojump.com"
              , d = "//" + c + "/botdetect/" + activityId + ".aspx?get=image&c=" + this.captchaId + "&t=" + this.instanceId + "&d=" + b;
            this.src = d
          }
          ,
          b = imgVerify.getAttribute("captchaid"),
          c = imgVerify.getAttribute("instanceid"),
          imgVerify.captchaId = b,
          imgVerify.instanceId = c,
          imgVerify.onclick()) : (imgCode.style.display = "",
            imgCode.onclick = refresh_validate,
            imgCode.onclick(),
            imgCode.title = validate_info_submit_title1)
      })),
    f = 0; f < pageHolder.length; f++) {
    for (g = $$tag("div", pageHolder[f]),
      hasJoin && (pageHolder[f].style.display = ""),
      h = new Array,
      i = new Array,
      j = 0,
      a = 0; a < g.length; a++)
      k = g[a].className.toLowerCase(),
        "div_question" == k ? (l = "1" == g[a].getAttribute("istrap"),
          g[a].onclick = divQuestionClick,
          g[a].onmouseover = function () {
            ktimes++
          }
          ,
          l ? (g[a].isTrap = !0,
            trapHolder.push(g[a]),
            initItem(g[a]),
            g[a].pageIndex = f + 1) : (g[a].indexInPage = j,
              h[j] = g[a],
              h[j].pageIndex = f + 1,
              j++,
              totalQ++)) : g[a].id && 0 == g[a].id.indexOf("divCut") && i.push(g[a]);
    pageHolder[f].questions = h,
      pageHolder[f].cuts = i
  }
  for (set_data_fromServer(qstr),
    m = new Array,
    n = !1,
    o = 0; o < pageHolder.length; o++) {
    for (p = pageHolder[o].questions,
      a = 0; a < p.length; a++) {
      if (q = p[a].dataNode,
        r = q._type,
        s = p[a].getAttribute("relation"),
        t = p[a].getAttribute("hasitemrelation"),
        u = p[a].getAttribute("isshop"),
        "1" == u && (p[a].isShop = !0,
          shopHT.push(p[a])),
        v = "",
        s && "0" != s) {
        if (v = -1 != s.indexOf("|") ? "|" : "$",
          "" != v && -1 != s.indexOf(v)) {
          for (w = s.split(v),
            f = 0; f < w.length; f++)
            if (x = w[f],
              x && -1 != x.indexOf(",")) {
              for (y = x.split(","),
                z = y[0],
                A = ";",
                -1 != y[1].indexOf(".") && (A = "."),
                B = y[1].split(A),
                C = 0; C < B.length; C++)
                D = z + "," + B[C],
                  B[C] - 0 < 0 && !n && B.length > 1 && (n = !0),
                  relationGroupHT[D] || (relationGroupHT[D] = new Array),
                  relationGroupHT[D].push(p[a]);
              relationQs[z] || (relationQs[z] = new Array),
                relationQs[z].push(p[a]),
                -1 == relationGroup.indexOf(z) && relationGroup.push(z)
            }
        } else {
          for (y = s.split(","),
            z = y[0],
            A = ";",
            -1 != y[1].indexOf(".") && (A = "."),
            B = y[1].split(A),
            C = 0; C < B.length; C++)
            D = z + "," + B[C],
              relationGroupHT[D] || (relationGroupHT[D] = new Array),
              relationGroupHT[D].push(p[a]);
          relationQs[z] || (relationQs[z] = new Array),
            relationQs[z].push(p[a]),
            -1 == relationGroup.indexOf(z) && relationGroup.push(z)
        }
        relationNotDisplayQ[q._topic] = "1"
      } else
        "0" == s && (relationNotDisplayQ[q._topic] = "1");
      if ("1" == t) {
        for (E = "none",
          f = 0; f < q._select.length; f++)
          if (F = q._select[f]._item_relation,
            F && "" != F) {
            if (v = -1 != F.indexOf("|") ? "|" : "$",
              H = "q" + q._topic + "_" + (f + 1),
              "" != v && -1 != F.indexOf(v)) {
              for (I = F.split(v),
                J = 0; J < I.length; J++)
                if (x = I[J],
                  x && -1 != x.indexOf(",")) {
                  for (y = x.split(","),
                    z = y[0],
                    A = ";",
                    -1 != y[1].indexOf(".") && (A = "."),
                    B = y[1].split(A),
                    C = 0; C < B.length; C++)
                    D = z + "," + B[C],
                      ItemrelationGroupHT[D] || (ItemrelationGroupHT[D] = new Array),
                      ItemrelationGroupHT[D].push(H);
                  ItemrelationQs[z] || (ItemrelationQs[z] = new Array),
                    ItemrelationQs[z].push(H),
                    -1 == ItemrelationGroup.indexOf(z) && ItemrelationGroup.push(z)
                }
            } else {
              if (y = F.split(","),
                2 != y.length)
                continue;
              for (z = y[0],
                A = ";",
                -1 != y[1].indexOf(".") && (A = "."),
                B = y[1].split(A),
                C = 0; C < B.length; C++)
                D = z + "," + B[C],
                  ItemrelationGroupHT[D] || (ItemrelationGroupHT[D] = new Array),
                  ItemrelationGroupHT[D].push(H);
              ItemrelationQs[z] || (ItemrelationQs[z] = new Array),
                ItemrelationQs[z].push(H),
                -1 == ItemrelationGroup.indexOf(z) && ItemrelationGroup.push(z)
            }
            relationNotDisplayItem[H] = "1"
          } else
            "none" != E || relationNotDisplayQ[q._topic] || (E = hasJoin && "none" == p[a].style.display ? "none" : "");
        p[a].style.display = E,
          "none" == E && (relationItemNotDisplayQ[q._topic] = "1")
      }
      if ("page" != r && "cut" != r && (questionsObject[q._topic] = p[a]),
        K = p[a].getAttribute("titletopic"),
        K && (L = questionsObject[K])) {
        for (L.dataNode._titleTopic || (L.dataNode._titleTopic = new Array),
          M = questionsObject[q._topic].getAttribute("id").replace("div", ""),
          L.dataNode._titleTopic.push(M),
          N = $$tag("input", L),
          O = 0; O < N.length; O++)
          N[O].onchange = itemClick;
        P = document.getElementById("divTitle" + M),
          P && (P.innerHTML = P.innerHTML.replace("[q" + K + "]", "<span id='spanTitleTopic" + M + "' style='text-decoration:underline;'></span>"))
      }
      if ("1" != p[a].getAttribute("hrq")) {
        if (("radio" == r || "check" == r) && ("radio" == r && isRadioImage(q._mode) ? initLikertItem(p[a]) : (initItem(p[a]),
          checkPeiE(p[a]))),
          "fileupload" == r) {
          for (Q = $$tag("iframe", p[a]),
            g = $$tag("div", p[a]),
            O = 0; O < g.length; O++)
            if ("uploadmsg" == g[O].className.toLowerCase()) {
              p[a].uploadmsg = g[O],
                g[O].style.color = "red";
              break
            }
          for (R = null,
            S = 0; S < Q.length; S++)
            if (Q[S].id && 0 == Q[S].id.indexOf("uploadFrame")) {
              R = Q[S];
              break
            }
          p[a].uploadFinish = function (a, b, c) {
            var e, f, g, h, d = this.uploadFrame.src.indexOf("&signSize") > -1;
            return this.uploadmsg.innerHTML = a,
              c && (this.uploadmsg.innerHTML += "<div><img src='" + c + "' alt='' /></div>"),
              this.fileName = b,
              isUploadingFile = !1,
              this.uploadFrame.style.display = "",
              d && c ? (this.uploadmsg.innerHTML = "",
                this.uploadFrame.style.display = "none",
                e = this,
                this.preDiv || (f = document.createElement("div"),
                  f.innerHTML = "<img style='max-width:80%;max-height:50px;vertical-align: middle;margin-right: 10px;' src=" + c + " /></div>",
                  g = document.createElement("a"),
                  g.style.float = "none",
                  g.style.display = "inline-block",
                  g.style.marginTop = "0",
                  g.href = "javascript:void(0)",
                  g.className = "icon deleteupload-icon",
                  g.title = "删除",
                  g.onclick = function () {
                    e.preDiv && e.uploadFrame.parentNode.removeChild(e.preDiv),
                      e.fileName = "",
                      e.preDiv = null,
                      isUploadingFile = !1,
                      e.uploadFrame.style.display = "",
                      e.uploadmsg.innerHTML = "",
                      updateProgressBar(e.dataNode),
                      jump(e, e.uploadFrame)
                  }
                  ,
                  f.appendChild(g),
                  this.preDiv = f,
                  this.uploadFrame.parentNode.insertBefore(f, this.uploadFrame)),
                updateProgressBar(this.dataNode),
                jump(this, this.uploadFrame),
                void 0) : (h = document.frames ? document.frames[this.uploadFrame.id] : document.getElementById(this.uploadFrame.id).contentWindow,
                  h.curdiv = this,
                  h._ext = this.dataNode._ext,
                  updateProgressBar(this.dataNode),
                  jump(this, this.uploadFrame),
                  void 0)
          }
            ,
            R && (p[a].uploadFrame = R,
              p[a].uploadFrame.allowTransparency = !0,
              T = document.frames ? document.frames[R.id] : document.getElementById(R.id).contentWindow,
              T.curdiv = p[a],
              T._ext = q._ext,
              U = R.getAttribute("fn"),
              U && "(空)" != U && p[a].uploadFinish("文件已经成功上传！", U))
        }
        if ("matrix" == r) {
          if (V = q._mode,
            q._hasjump && (V && 0 > V - 100 ? initLikertItem(p[a]) : initItem(p[a])),
            W = p[a].getAttribute("DaoZhi"),
            X = null,
            W) {
            for (Y = getTableTrHandler(p[a]),
              X = new Array,
              Z = Y[0].cells.length - 1,
              $ = 0; Z > $; $++)
              X[$] = Y[0].cells[$ + 1],
                X[$].itemInputs = new Array;
            for ($ = 0; Z > $; $++)
              for (_ = 0; _ < Y.length; _++)
                X[$].parent = p[a],
                  ab = Y[_].cells[$ + 1],
                  ab.parent = X[$],
                  ab.onclick = function () {
                    var a, b, c;
                    if (curMatrixItem != this.parent) {
                      if (a = this.parent.itemInputs)
                        for (b = 0; b < a.length; b++)
                          a[b].parentNode.style.background = "#edfafe";
                      if (curMatrixItem && curMatrixItem.daoZhi)
                        for (a = curMatrixItem.itemInputs,
                          b = 0; b < a.length; b++)
                          a[b].parentNode.style.background = "";
                      divMatrixItemClick.call(this.parent)
                    }
                    this.parent.parent && (c = this.parent.parent.dataNode,
                      c._maxvalue && (c._maxValue = c._maxvalue),
                      c._minvalue && (c._minValue = c._minvalue),
                      checkMinMax(this.getElementsByTagName("input")[0], this.parent.parent.dataNode, this.parent))
                  }
                  ,
                  X[$].daoZhi = !0,
                  bb = ab.getElementsByTagName("input")[0],
                  bb && X[$].itemInputs.push(bb)
          } else
            X = getTableTrHandler(p[a]);
          if (!W)
            for (O = 0; O < X.length; O++) {
              if ("303" != V)
                cb = "none" == X[O].style.display,
                  cb || (V && 0 > V - 100 ? initLikertItem(X[O]) : W || initItem(X[O]));
              else if (db = $$tag("select", X[O]),
                db.length > 0 && (X[O].itemSels = db),
                q._hasjump)
                for (eb = 0; eb < db.length; eb++)
                  db[eb].parent = X[O],
                    db[eb].onchange = function () {
                      var d, e, f, a = this.parent.parent, b = a.itemTrs, c = !1;
                      for (d = 0; d < b.length; d++)
                        if (e = b[d].itemSels) {
                          for (f = 0; f < e.length; f++)
                            if (e[f].value) {
                              c = !0;
                              break
                            }
                          if (c)
                            break
                        }
                      jumpAny(c, a)
                    }
                    ;
              X[O].parent = p[a],
                X[O].onclick = divMatrixItemClick
            }
          if ("301" == V || "102" == V) {
            if (fb = p[a].getAttribute("minvalue"),
              gb = p[a].getAttribute("maxvalue"),
              p[a].dataNode._minvalue = fb,
              p[a].dataNode._maxvalue = gb,
              "301" == V)
              for (p[a].dataNode._verify = "数字",
                "1" == p[a].getAttribute("digittype") && (p[a].dataNode._verify = "小数"),
                p[a].dataNode._minword = fb,
                p[a].dataNode._maxword = gb,
                hb = $$tag("textarea", p[a]),
                O = 0; O < hb.length; O++)
                hb[O].parent = p[a],
                  hb[O].onblur = function () {
                    txtChange(this)
                  }
          } else if ("302" == V) {
            for (hb = $$tag("textarea", p[a]),
              O = 0; O < hb.length; O++)
              hb[O].parent = p[a],
                hb[O].onblur = function () {
                  var b, a = this.parent;
                  txtChange(this),
                    b = validateMatrix(a.dataNode, this, this),
                    b && (a.errorControl = this,
                      writeError(a, verifyMsg, 3e3))
                }
                ;
            if (ib = p[a].getAttribute("minvalue"))
              for (jb = document.createElement("div"),
                kb = "增加",
                1 == langVer && (kb = "Add"),
                jb.innerHTML = "<i class='increase-icon'></i><span>" + kb + "</span>",
                jb.style.cursor = "pointer",
                lb = "divquestion" + p[a].dataNode._topic,
                mb = document.getElementById(lb),
                mb && mb.appendChild(jb),
                jb.className = "increase-btn",
                nb = p[a].getElementsByTagName("table")[0],
                ob = nb.tBodies[0].rows,
                pb = nb.tHead.getElementsByTagName("th"),
                pb[0].style.display = "none",
                jb.parent = p[a],
                p[a].addbtn = jb,
                jb.onclick = function () {
                  var g, a = this, b = this.parent, c = b.getElementsByTagName("table")[0], d = c.tBodies[0].rows, e = b.getAttribute("maxvalue"), f = 0;
                  for (g = 0; g < d.length; g++)
                    "" === d[g].style.display && f++;
                  for (g = 0; g < d.length; g++)
                    if (f + 1 == e && (a.className = "increase-btn disable-style"),
                      g == f) {
                      d[g].style.display = "",
                        d[g].previousSibling.getElementsByTagName("i")[0].style.display = "none";
                      break
                    }
                }
                ,
                O = 0; O < ob.length; O++)
                ob[O].cells[0].style.display = "none",
                  qb = document.createElement("th"),
                  qb.innerHTML = "<i class='delete-icon'></i>",
                  ob[O].appendChild(qb),
                  qb.style.width = "16px",
                  rb = qb.getElementsByTagName("i")[0],
                  O >= ib ? (ob[O].style.display = "none",
                    hasJoin && (sb = ob[O].getElementsByTagName("textarea")[0],
                      sb && sb.value && (ob[O].style.display = ""))) : rb.style.display = "none",
                  qb.parent = p[a],
                  rb.onclick = function () {
                    var h, a = this.parentNode.parent, b = a.addbtn, c = this.parentNode.parentNode.getAttribute("rindex"), d = this.parentNode.parentNode, e = this.parentNode.parentNode.previousSibling, f = this.parentNode.parentNode.parentNode.parentNode.tBodies[0].rows, g = 0;
                    for (h = 0; h < f.length; h++)
                      "" === f[h].style.display && g++;
                    d.style.display = "none",
                      c - ib > 0 && (e.getElementsByTagName("i")[0].style.display = ""),
                      g == f.length && (b.className = "increase-btn")
                  }
          }
          X.length > 0 && (p[a].itemTrs = X)
        }
        if ("sum" == r) {
          for (initItem(p[a]),
            X = $$tag("tr", p[a]),
            tb = new Array,
            O = 0; O < X.length; O++)
            ub = X[O].getAttribute("rowid"),
              ub && (X[O].parent = p[a],
                tb.push(X[O]));
          for (vb = p[a].itemInputs.length,
            wb = p[a].itemInputs,
            O = 0; vb > O; O++)
            wb[O].onblur = function () {
              txtChange(this)
            }
              ;
          tb.length > 0 && (p[a].itemTrs = tb),
            xb = p[a].getAttribute("rel"),
            p[a].relSum = document.getElementById(xb)
        }
        if ("check" == r && q.isSort) {
          for (yb = $$tag("li", p[a]),
            O = 0; O < yb.length; O++)
            yb[O].onclick = itemSortClick,
              yb[O].style.cursor = "pointer",
              yb[O].onmouseover = function () {
                this.style.background = "#efefef"
              }
              ,
              yb[O].onmouseout = function () {
                this.style.background = ""
              }
              ;
          for (zb = yb[0].parentNode.getAttribute("dval"),
            Ab = new Array,
            O = 0; O < p[a].itemInputs.length; O++)
            "checkbox" == p[a].itemInputs[O].type && Ab.push(p[a].itemInputs[O]);
          if (zb)
            for (Bb = zb.split(","),
              O = 0; O < Bb.length; O++)
              for (f = 0; f < yb.length; f++)
                if (Ab[f].value == Bb[O]) {
                  yb[f].onclick();
                  break
                }
        }
        if ("question" == r)
          Cb = $$tag("textarea", p[a]),
            Cb.length > 0 ? (q._needOnly && "3" == hasJoin && (Cb[0].isOnly = !0,
              Cb[0].prevvalue = Cb[0].value),
              Cb[0].onkeyup = function () {
                txtChange(this),
                  referTitle(this.parent, this.value)
              }
              ,
              Cb[0].onclick || (Cb[0].onclick = Cb[0].onkeyup),
              Cb[0].onblur = Cb[0].onchange = function () {
                txtChange(this, 1),
                  referTitle(this.parent, this.value)
              }
              ,
              Cb[0].parent = p[a],
              p[a].itemTextarea = Cb[0],
              hasJoin && "地图" == p[a].dataNode._verify && "" == p[a].itemTextarea.value && (p[a].itemTextarea.value = Cb[0].getAttribute("value") || ""),
              Cb[1] && (Db = getPreviousNode(Cb[1]),
                Db.par = p[a],
                window.nfjoinid && "2" != hasJoin && (Cb[0].disabled = !0,
                  Db.disabled = !0),
                Cb[1].par = p[a],
                p[a].needsms = !0,
                p[a].mobileinput = Cb[0],
                p[a].verifycodeinput = Cb[1],
                Cb[2] && (Db.txtCode = Cb[2]),
                Db.onclick = function () {
                  if (!this.disabled) {
                    var a = this.par;
                    return a.mobileinput.value = trim(a.mobileinput.value),
                      /^\d{11}$/.test(a.mobileinput.value) ? (a.issmsvalid && a.mobile == a.mobileinput.value || this.isSending || Db.txtCode && (this.repeat && maxCheatTimes > 0 && (fireConfirm = !0),
                        (!this.repeat || confirm("您输入的手机号码“" + a.mobileinput.value + "”确认准确无误吗？")) && Db.sendActivitySms("0000")),
                        void 0) : (popUpAlert("请输入正确的手机号码"),
                          void 0)
                  }
                }
                ,
                Db.sendActivitySms = function (a) {
                  var b, c, d, e, f;
                  this.isSending = !0,
                    this.disabled = !0,
                    b = this.par,
                    c = this,
                    d = getXmlHttp(),
                    d.onreadystatechange = function () {
                      var a, e, f, g;
                      4 == d.readyState && 200 == d.status && (a = d.responseText,
                        e = "",
                        f = !1,
                        0 == a.indexOf("true") ? (e = "成功发送，每天最多发送5次。如未收到，请检查手机号是否正确！",
                          f = !0,
                          g = a.split(","),
                          2 == g.length && (e += g[1]),
                          b.verifycodeinput.disabled = !1,
                          c.repeat = !0,
                          c.resent()) : "fast" == a ? (e = "发送频率过快",
                            c.resent()) : "no" == a ? e = "发布者短信数量不够" : "fail" == a ? e = "短信发送失败，每天最多发送5次！" : "error" == a ? e = "手机号码不正确" : "nopub" == a ? e = "问卷未运行，不能填写" : "repeat" == a ? (c.disabled = !1,
                              e = "此手机号之前已参与过，不能重复参与！") : e = a,
                        e && (b.errorMessage && (b.errorMessage.innerHTML = ""),
                          writeError(b, "提示：" + e, 3e3, f)),
                        e.indexOf("图形验证码") > -1 && (c.disabled = !1),
                        c.isSending = !1)
                    }
                    ,
                    e = b.dataNode._needOnly || b.mobileinput.getAttribute("needonly"),
                    f = "/joinnew/AnswerSmsHandler.ashx?q=" + activityId + "&mob=" + escape(b.mobileinput.value) + "&valcode=" + a + "&t=" + (new Date).valueOf(),
                    e && (f += "&qi=" + b.dataNode._topic),
                    window.nfjoinid && "2" != hasJoin && (f += "&joinid=" + window.nfjoinid),
                    d.open("get", f),
                    d.send(null)
                }
                ,
                Db.resent = function () {
                  var a = this
                    , b = 60
                    , c = setInterval(function () {
                      b--,
                        57 > b && (a.isSending = !1),
                        b > 0 ? a.innerHTML = "重发(" + b + "秒)" : (a.innerHTML = "发送验证码",
                          a.disabled = !1,
                          clearInterval(c))
                    }, 1e3)
                }
                ,
                Cb[1].onchange = Cb[1].onblur = function () {
                  var c, a = trim(this.value), b = this.par;
                  return 6 != a.length ? (b.errorMessage && (b.errorMessage.innerHTML = ""),
                    writeError(b, "提示：请输入6位数字！", 3e3, !0),
                    void 0) : /^\d+$/.exec(a) ? (b.issmsvalid && b.mobile == b.mobileinput.value || b.prevcode != a && (b.prevcode = a,
                      c = getXmlHttp(),
                      c.onreadystatechange = function () {
                        var a, d, e;
                        4 == c.readyState && 200 == c.status && (a = c.responseText,
                          b.issmsvalid = !1,
                          d = "",
                          e = !1,
                          "true" == a ? (b.issmsvalid = !0,
                            e = !0,
                            b.mobile = Cb[0].value,
                            d = "成功通过验证") : "send" == a ? d = "请先发送验证码，每天最多发送5次！" : "no" == a ? d = "验证码输入错误超过5次，无法再提交" : "error" == a && (d = "验证码输入错误"),
                          d && (b.errorMessage && (b.errorMessage.innerHTML = ""),
                            writeError(b, "提示：" + d, 3e3, e)))
                      }
                      ,
                      c.open("get", "/joinnew/AnswerSmsValidateHandler.ashx?q=" + activityId + "&mob=" + escape(b.mobileinput.value) + "&code=" + escape(a) + "&t=" + (new Date).valueOf()),
                      c.send(null)),
                      void 0) : (b.errorMessage && (b.errorMessage.innerHTML = ""),
                        writeError(b, "提示：请输入6位数字！", 3e3, !0),
                        void 0)
                }
              )) : "密码" == p[a].dataNode._verify && (Cb = $$tag("input", p[a]),
                Eb = Cb[0],
                Cb[0].parent = p[a],
                Eb.onkeyup = function () {
                  txtChange(this)
                }
                ,
                Eb.onclick || (Eb.onclick = Eb.onkeyup),
                p[a].itemTextarea = Cb[0],
                Cb[1] && (Cb[0].confirmPwd = Cb[1],
                  Cb[1].parent = p[a],
                  Cb[1].firstPwd = Eb,
                  Cb[1].onkeyup = function () {
                    Eb.needCheckConfirm = !0,
                      txtChange(this)
                  }
                ));
        else if ("gapfill" == r) {
          for (Cb = $$tag("input", p[a]),
            Fb = 0; Fb < Cb.length; Fb++)
            Cb[Fb].parent = p[a],
              Cb[Fb].onkeyup = function () {
                txtChange(this)
              }
              ,
              Cb[Fb].onclick || (Cb[Fb].onclick = Cb[Fb].onkeyup),
              Cb[Fb].onblur = Cb[Fb].onchange = function () {
                txtChange(this, 1),
                  referTitle(this.parent, this.value)
              }
              ,
              "3" == hasJoin && "1" == Cb[Fb].getAttribute("needonly") && (Cb[Fb].isOnly = !0);
          p[a].gapFills = Cb
        }
        for ("radio_down" == r && (Gb = $$tag("select", p[a]),
          Gb.length > 0 && (Gb[0].onchange = itemClick,
            Gb[0].parent = p[a],
            p[a].itemSel = Gb[0])),
          Hb = $$tag("div", p[a]),
          Ib = 0,
          Jb = null,
          O = 0; O < Hb.length; O++)
          "div_title_question" == Hb[O].className.toLowerCase() ? p[a].divTitle = Hb[O] : "slider" == Hb[O].className.toLowerCase() && ("matrix" == r || "sum" == r ? (Jb = Hb[O].parentNode.parentNode,
            Ib++) : "slider" == r && (Jb = p[a]),
            Jb.divSlider = Hb[O],
            Hb[O].parent = Jb,
            fb = Hb[O].getAttribute("minvalue"),
            gb = Hb[O].getAttribute("maxvalue"),
            p[a].dataNode._minvalue = fb,
            p[a].dataNode._maxvalue = gb,
            "sum" == r ? Kb = Jb.getElementsByTagName("input")[0] : (Lb = Hb[O].getAttribute("rel"),
              Kb = document.getElementById(Lb)),
            window.monitoringEmbeddingIframe && !firstImplementation && (firstImplementation = !0,
              monitoringEmbeddingIframe()),
            Mb = new neverModules.modules.slider({
              targetId: Hb[O].id,
              sliderCss: "imageSlider1",
              barCss: "imageBar1",
              min: parseInt(fb),
              max: parseInt(gb),
              sliderValue: Kb,
              hints: slider_hint,
              change: itemClick
            }),
            Mb.create(),
            Jb.sliderImage = Mb,
            Nb = Hb[O].getAttribute("defvalue"),
            Nb && isInt(Nb) && (Mb.setValue(parseInt(Nb)),
              Jb.divSlider.value = parseInt(Nb),
              "sum" == r && (p[a].sumLeft = hasJoin && Nb ? void 0 == p[a].sumLeft ? q._total - parseInt(Nb) : p[a].sumLeft - parseInt(Nb) : 0)),
            "1" == hasJoin && (Mb._slider.onclick = function () { }
              ,
              Mb._initMoveSlider = function () { }
            ));
        if ("matrix" == r && (Ob = new Array,
          X = p[a].itemTrs)) {
          for (O = 0; O < X.length; O++)
            _ = X[O].getAttribute("rindex"),
              parseInt(_) == _ && Ob.push(X[O]),
              "201" == p[a].dataNode._mode && "3" == hasJoin && "1" == X[O].getAttribute("needonly") && (X[O].isOnly = !0);
          Ob.length > 0 && (p[a].itemTrs = Ob)
        }
        q && q._hasjump && (cur_page = o,
          hasJoin ? jumpJoin(p[a], o, relationItemNotDisplayQ, relationNotDisplayQ, JumpNotDisplayQ) : clearAllOption(p[a]),
          cur_page = 0),
          q._referedTopics && m.push(p[a]),
          hasJoin && window.cancelInputClick && cancelInputClick(p[a])
      }
    }
    o > 0 && hasJoin && (pageHolder[o].style.display = "none")
  }
  if (completeLoaded = !0,
    window.monitoringEmbeddingIframe && !firstImplementation && monitoringEmbeddingIframe(),
    n && addtoactivitystat(),
    window.cepingCandidate) {
    for (Pb = cepingCandidate.split("&nbsp;&nbsp;&nbsp;"),
      Qb = new Object,
      Rb = 0; Rb < Pb.length; Rb++)
      Sb = Pb[Rb].replace(/(\s*)/g, "").replace(/&/g, "").replace(/\\/g, "").replace("&nbsp;", "").toLowerCase(),
        Qb[Sb] = "1";
    if (p = pageHolder[0].questions[0],
      window.allowPart) {
      if (Tb = 0,
        p.itemInputs)
        for (a = 0; a < p.itemInputs.length; a++)
          Ub = p.itemInputs[a].parentNode,
            Vb = Ub.getElementsByTagName("label")[0],
            Vb && (Wb = trim(Vb.innerHTML).toLowerCase(),
              Wb = Wb.replace(/(\s*)/g, "").replace(/&amp;/g, "").replace(/\\/g, "").replace("&nbsp;", ""),
              Qb[Wb] ? window.OneaTime && 0 == Tb && (Ub.onclick(),
                Tb++) : Ub.style.display = "none");
      Xb = document.getElementById("div1"),
        Xb.style.display = "",
        window.OneaTime && (document.getElementById("divTitle1").style.display = "none",
          document.getElementById("divquestion1").style.display = "none")
    } else {
      if (p.itemInputs)
        for (a = 0; a < p.itemInputs.length; a++)
          Ub = p.itemInputs[a].parentNode,
            Vb = Ub.getElementsByTagName("label")[0],
            Vb && (Wb = trim(Vb.innerHTML).toLowerCase(),
              Wb = Wb.replace(/(\s*)/g, "").replace(/&amp;/g, "").replace(/\\/g, "").replace("&nbsp;", ""),
              Qb[Wb] && (p.itemInputs[a].checked = !0));
      createItem(p),
        p.style.display = "none",
        p.isCepingQ = "1"
    }
  }
  if (window.totalCut && window.totalCut > 0)
    for (a = 0; a < window.totalCut; a++) {
      if (Yb = document.getElementById("divCut" + (a + 1)),
        s = Yb.getAttribute("relation"),
        s && "0" != s)
        if (v = "",
          v = -1 != s.indexOf("|") ? "|" : "$",
          "" != v && -1 != s.indexOf(v)) {
          for (w = s.split(v),
            f = 0; f < w.length; f++)
            if (x = w[f],
              x && -1 != x.indexOf(",")) {
              for (y = x.split(","),
                z = y[0],
                A = ";",
                -1 != y[1].indexOf(".") && (A = "."),
                B = y[1].split(A),
                z = y[0],
                C = 0; C < B.length; C++)
                D = z + "," + B[C],
                  relationGroupHT[D] || (relationGroupHT[D] = new Array),
                  relationGroupHT[D].push(Yb);
              relationQs[z] || (relationQs[z] = new Array),
                relationQs[z].push(Yb),
                -1 == relationGroup.indexOf(z) && relationGroup.push(z)
            }
        } else {
          for (y = s.split(","),
            z = y[0],
            A = ";",
            -1 != y[1].indexOf(".") && (A = "."),
            B = y[1].split(A),
            relationNotDisplayQ[Yb.getAttribute("topic")] = "1",
            C = 0; C < B.length; C++)
            D = z + "," + B[C],
              relationGroupHT[D] || (relationGroupHT[D] = new Array),
              relationGroupHT[D].push(Yb);
          -1 == relationGroup.indexOf(z) && relationGroup.push(z),
            relationQs[z] || (relationQs[z] = new Array),
            relationQs[z].push(Yb)
        }
      K = Yb.getAttribute("titletopic"),
        K && (L = questionsObject[K],
          L && (L.dataNode._titleTopic || (L.dataNode._titleTopic = new Array),
            Zb = Yb.getAttribute("topic"),
            L.dataNode._titleTopic.push(Zb),
            P = Yb.childNodes[0],
            P && (P.innerHTML = P.innerHTML.replace("[q" + K + "]", "<span id='spanTitleTopic" + Zb + "' style='text-decoration:underline;'></span>"))))
    }
  if (!window.cepingCandidate || window.allowPart)
    for (a = 0; a < m.length; a++)
      j = m[a],
        createItem(j);
  for (isLoadQues = !0,
    o = 0; o < pageHolder.length; o++)
    for (p = pageHolder[o].questions,
      a = 0; a < p.length; a++)
      q = p[a].dataNode,
        Zb = q._topic,
        relationQs[Zb] && relationJoin(p[a]),
        ItemrelationQs[Zb] && relationItemJoin(p[a]),
        hasJoin && referTitle(p[a]),
        $b = p[a].getAttribute("qingjing"),
        "" == p[a].style.display && $b && (_b = p[a].getElementsByTagName("input")[0],
          _b && (_b.checked = !0,
            displayRelationRaidoCheck(p[a], q)));
  for (isLoadQues = !1,
    o = 0; o < pageHolder.length; o++)
    for (p = pageHolder[o].questions,
      a = 0; a < p.length; a++)
      checkPeiE(p[a]);
  if (lastSavePage > 0 && totalPage > lastSavePage && (pageHolder[0].style.display = "none",
    cur_page = lastSavePage - 1,
    show_next_page(!0)),
    lastSaveQ >= 1 && (ac = document.getElementById("div" + lastSaveQ))) {
    for (ac.scrollIntoView(),
      ac.onclick(),
      joinedTopic = lastSaveQ,
      a = 1; lastSaveQ >= a; a++)
      progressArray[a + ""] = !0;
    showProgressBar()
  }
  0 == totalQ && showSubmitTable(!1),
    processMinMax(),
    showProgressBar(),
    window.jqLoaded && jqLoaded(),
    addtoForein(),
    addtoHistory()
}
function getMaxTimeStr(a) {
  var e, b = "", c = a, d = parseInt(c / 3600);
  return d ? (10 > d && (b += "0"),
    b += d + ":",
    c %= 3600) : b = "00:",
    e = parseInt(c / 60),
    e ? (10 > e && (b += "0"),
      b += e + ":",
      c %= 60) : b += "00:",
    0 > c && (c = 0),
    c ? (10 > c && (b += "0"),
      b += c) : b += "00",
    b
}
function autoSubmit(a) {
  var b, c, d, e;
  if (isAutoSubmit = !0,
    hasSurveyTime && (b = pageHolder[cur_page]._maxtime,
      !b || b - initMaxSurveyTime >= 0 || 1 >= maxSurveyTime))
    for (c = 0; totalPage - 1 > cur_page && (pageHolder[cur_page].hasExceedTime = !0,
      show_next_page(),
      !(c > totalPage));)
      c++;
  ktimes++,
    pageHolder[cur_page].hasExceedTime = !0,
    totalPage - 1 > cur_page ? (show_next_page(),
      isAutoSubmit = !1) : (pageHolder[cur_page].style.display = "none",
        submit_button.initVal && (submit_button.value = submit_button.initVal),
        submit_button.disabled = !1,
        d = "提示：您的作答时间已经超过最长时间限制，请直接提交答卷！",
        1 == langVer && (d = "Time is up,please submit!"),
        a && (d = a),
        !hasSurveyTime || "none" != tCode.style.display || !hasAnswer || a || allowWeiXin || hasAutoSubmit ? submit_div.divAlert || (e = document.createElement("div"),
          e.style.color = "red",
          e.style.fontSize = "16px",
          e.style.marginTop = "10px",
          e.innerHTML = d,
          e.style.textAlign = "center",
          submit_div.insertBefore(e, submit_table),
          submit_div.divAlert = e) : (isAutoSubmit = !1,
            hasAutoSubmit = !0,
            submit(1))),
    isAutoSubmit = !1
}
function processMinMax() {
  var a, b, c, d, e, f, g, h;
  window.Ischangeans || (maxTimer && clearInterval(maxTimer),
    minTimer && clearInterval(minTimer),
    "true" == isRunning && (a = pageHolder[cur_page]._maxtime,
      b = a,
      initCounterDate || (initCounterDate = new Date),
      c = new Date,
      d = document.getElementById("spanTimeTip"),
      window.hasSurveyTime && (initMaxSurveyTime || (initMaxSurveyTime = window.maxSurveyTime),
        (!b || window.maxSurveyTime < b) && (b = window.maxSurveyTime || 1),
        cur_page > 0 && b--,
        0 == b && (b = 1),
        d && (d.innerHTML = "剩余作答时间")),
      b && (1 == langVer && (d.innerHTML = "Remaining "),
        addEventSimple(window, "resize", resizeMaxTime),
        mmMaxTime(),
        hasMaxtime = !0,
        divMaxTime.style.display = "",
        e = divMaxTime.getElementsByTagName("b")[0],
        e && (e.innerHTML = ""),
        (!spanMaxTime.innerHTML || a) && (spanMaxTime.innerHTML = getMaxTimeStr(b)),
        maxTimer = setInterval(function () {
          var d = new Date
            , e = parseInt((d - c) / 1e3)
            , f = b - e;
          window.maxSurveyTime && window.maxSurveyTime--,
            window.initMaxSurveyTime && !a && (e = parseInt((d - initCounterDate) / 1e3),
              f = initMaxSurveyTime - e,
              maxSurveyTime = initMaxSurveyTime - e),
            spanMaxTime.innerHTML = getMaxTimeStr(f),
            0 >= f && (clearInterval(maxTimer),
              divMaxTime.style.display = "none",
              window.amt = 1,
              autoSubmit())
        }, 1e3)),
      f = pageHolder[cur_page]._mintime,
      g = !IsSampleService || IsSampleService && "t" == promoteSource || window.pubNeedApply,
      g || (f = 0),
      f && (pageHolder[cur_page]._istimer ? (h = f,
        next_page && (next_page.style.display = "none"),
        pre_page && (pre_page.style.display = "none"),
        minTimer = setInterval(function () {
          var a = new Date
            , b = parseInt((a - c) / 1e3);
          h = f - b,
            0 >= h && (clearInterval(minTimer),
              totalPage - 1 > cur_page ? show_next_page() : (popUpAlert("提示：您的作答时间已经超过最长时间限制，请直接提交答卷！"),
                pageHolder[cur_page].style.display = "none"))
        }, 1e3)) : (isSuper || (next_page && (next_page.disabled = !0),
          submit_button.disabled = !0),
          next_page && !next_page.initVal && (next_page.initVal = next_page.value),
          submit_button.initVal || (submit_button.initVal = submit_button.value),
          next_page && (next_page.value = f + minTimeTip),
          submit_button.value = f + minTimeTip,
          h = f,
          minTimer = setInterval(function () {
            var a = new Date
              , b = parseInt((a - c) / 1e3);
            h = f - b,
              next_page && (next_page.value = h + minTimeTip),
              submit_button.value = h + minTimeTip,
              0 >= h && (clearInterval(minTimer),
                next_page && (next_page.disabled = !1),
                submit_button.disabled = !1,
                next_page && (next_page.value = next_page.initVal),
                submit_button.value = submit_button.initVal)
          }, 1e3)))))
}
function resizeMaxTime() {
  resizedMax = !0,
    mmMaxTime()
}
function mmMaxTime() {
  var b, a = document.getElementById("mainCss");
  return a ? (b = getTop(a),
    divMaxTime.style.top = b.y + "px",
    divMaxTime.style.left = b.x - 120 + "px",
    void 0) : (divMaxTime.style.right = "50px",
      void 0)
}
function getPreviousNode(a) {
  var b = a.previousSibling;
  return b && 1 != b.nodeType && (b = b.previousSibling),
    b
}
function getNextNode(a) {
  var b = a.nextSibling;
  return b && 1 != b.nodeType && (b = b.nextSibling),
    b
}
function updateCart() {
  var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, a = "", b = 0, c = 0;
  for (d = 0; d < shopHT.length; d++)
    if (e = shopHT[d],
      "none" != e.style.display) {
      for (f = e.itemInputs,
        g = e.getAttribute("id").replace("div", ""),
        h = document.getElementById("divTotalPrice" + g),
        i = 0,
        j = 0; j < f.length; j++)
        k = f[j],
          isInt(k.value) || (k.value = 0),
          l = parseInt(k.value),
          0 != l && (m = k.parentNode.parentNode,
            n = $$tag("div", m)[0].innerHTML,
            o = $$tag("p", m)[0].getAttribute("price"),
            p = l * parseFloat(o),
            q = '<li class="productitem"><span class="fpname">' + n + '</span><span class="fpnum">x' + l + '</span><span class="fpprice">￥' + toFixed0d(p) + "</span></li>",
            a += q,
            b += p,
            i += p,
            c += l);
      h && (h.innerHTML = "￥" + i.toFixed(2).replace(".00", ""))
    }
  a = "<ul class='productslist'><li><span class='fpname' style='font-weight:bold; color:#333;font-size:14px; padding-bottom:16px;'>结算清单</span></li>" + a + "</ul>" + '<div class="ftotalprice" style="position:relative;"><span style="position:absolute;left:78%;color:#333">x' + c + '</span><span class="priceshow">￥' + toFixed0d(b) + "</span></div>",
    r = document.getElementById("shopcart"),
    r.innerHTML = a,
    r.style.display = b > 0 ? "" : "none"
}
function toFixed0d(a) {
  return a.toFixed(2).replace(".00", "")
}
function checkPeiE(a) {
  var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
  if (!hasPeiEFull && a.dataNode._requir) {
    if (c = "",
      d = "",
      "1" == a.getAttribute("peie") && "" == a.style.display && (e = !0,
        f = a.itemInputs,
        g = 0,
        "radio_down" == a.dataNode._type && (f = $$tag("option", a),
          g = 1),
        f))
      for (h = g; h < f.length; h++)
        if (i = f[h].disabled,
          !i) {
          e = !1;
          break
        }
    if (e && (hasPeiEFull = !0,
      j = a.getAttribute("id").replace("div", ""),
      window.cityPeiEQues))
      for (k = cityPeiEQues.split(";"),
        h = 0; h < k.length; h++)
        if (l = k[h].split("|"),
          3 == l.length && j == l[0]) {
          d = l[2],
            c = l[1];
          break
        }
    if ("1" == a.getAttribute("haspeie") && "" == a.style.display) {
      for (e = !0,
        f = a.itemInputs,
        g = 0,
        "radio_down" == a.dataNode._type && (f = $$tag("option", a),
          g = 1),
        h = g; h < f.length; h++) {
        if (m = f[h].getAttribute("attrpeie"),
          !m) {
          e = !1;
          break
        }
        for (n = m.split(";"),
          o = n[0].split("|"),
          p = "div" + o[0],
          q = document.getElementById(p),
          r = $$tag("input", q),
          s = 0,
          t = 0; t < r.length; t++)
          ("radio" == r[t].type || "checkbox" == r[t].type) && s++;
        if ("radio_down" == q.dataNode._type && (r = $$tag("option", q),
          s = r.length - 1),
          n.length < s) {
          e = !1;
          break
        }
      }
      e && (hasPeiEFull = !0)
    }
    u = 0,
      "1" == a.getAttribute("qingjing") && "" == a.style.display && (v = a.getElementsByTagName("ul")[0],
        v && "1" == v.getAttribute("full") && (hasPeiEFull = !0,
          u = 1)),
      hasPeiEFull && (w = document.getElementById("spanNotSubmit"),
        peiemsg = "此问卷配额已满，暂时不能填写！",
        window.isPromoteing && (x = a.getAttribute("id").replace("div", ""),
          y = getXmlHttp(),
          z = "/handler/endwjxactivitypromote.ashx?ActivityId=" + activityId + "&sjts=" + prsjts + "&sjsign=" + prsjsign + "&city=" + c + "&ruletype=" + d + "&quid=" + x,
          window.cityPeiEQues && (z += "&citypeie=" + encodeURIComponent(window.cityPeiEQues)),
          y.open("get", z),
          y.send(null)),
        u && (peiemsg = "此问卷情景题配额已满，不能填写。"),
        w ? w.innerHTML = peiemsg : (A = document.getElementById("divPeiE"),
          A.style.display = "",
          A.innerHTML = "<div style='background:#FFE4C8;color:#3E3E3E;border-radius:8px; padding:8px 15px; margin: 15px auto;width: 650px; text-align: left; clear: both; font-size:14px;'><span id='spanNotSubmit'>" + peiemsg + "</span></div>"))
  }
}
function initItem(a) {
  var c, d, e, f, g, h, i, j, k, l, n, o, p, q, r, b = $$tag("input", a);
  for (0 == b.length && (b = $$tag("textarea", a)),
    a.isShop && (c = a.getAttribute("maxvalue") || 0,
      c && (c = parseInt(c)),
      c && (a.dataNode._maxValue = c),
      d = a.getAttribute("minvalue") || 0,
      d && (d = parseInt(d)),
      d && (a.dataNode._minValue = d)),
    e = 0; e < b.length; e++)
    b[e].parent = a,
      a.isShop ? (f = getPreviousNode(b[e]),
        f.rel = b[e],
        g = getNextNode(b[e]),
        g.rel = b[e],
        isInt(g.rel.value) || (g.rel.value = 0),
        b[e].setAttribute("minnum", a.dataNode._select[e]._item_startpay),
        b[e].setAttribute("maxnum", a.dataNode._select[e]._item_limpur),
        g.onclick = function (a, d) {
          var e, f, g, h, i, j, k, l, m;
          if (isInt(this.rel.value) || (this.rel.value = 0),
            e = 0,
            f = "",
            c)
            for (g = 0; g < b.length; g++)
              h = b[g],
                h && isInt(h.value) && (h.value > 0 && this.rel != h ? e++ : ""),
                e >= c && (f = "最多可选" + c + "种商品",
                  this.rel.value = 0);
          (!c || c > e) && (i = parseInt(this.rel.value),
            j = !1,
            k = 0,
            l = this.rel.getAttribute("num"),
            a = this.rel.getAttribute("minnum"),
            d = this.rel.getAttribute("maxnum"),
            m = !0,
            l && (j = !0,
              k = parseInt(l)),
            a && (a = parseInt(a)),
            d && (d = parseInt(d)),
            a > 0 && i < parseInt(a) && (this.rel.value = parseInt(a),
              m = !1),
            d > 0 && i >= parseInt(d) && (f = "此商品限购" + d + "件，不能再增加！",
              this.rel.value = parseInt(d),
              m = !1),
            j && i >= k && (!(d > 0 && k > d) || a > k) && (f = "库存只剩" + k + "件，不能再增加！",
              0 >= k && (f = "已售完，无法添加"),
              this.rel.value = parseInt(k),
              m = !1),
            m && (this.rel.value = i + 1)),
            updateCart(),
            "" == f ? "" : popUpAlert(f)
        }
        ,
        f.onclick = function () {
          var a, b;
          if (isInt(this.rel.value) || (this.rel.value = 0),
            a = parseInt(this.rel.value),
            !(1 > a)) {
            if (b = this.rel.getAttribute("minnum"),
              b && parseInt(b) > 0 && a <= parseInt(b))
              return this.rel.value = 0,
                updateCart(),
                void 0;
            this.rel.value = a - 1,
              updateCart()
          }
        }
        ,
        b[e].onchange = b[e].onblur = function () {
          var g, h, i, a = this.getAttribute("num"), d = this.getAttribute("minnum"), e = this.getAttribute("maxnum"), f = "";
          if (a && (needlimit = !0,
            limitNumber = parseInt(a)),
            g = 0,
            c)
            for (h = 0; h < b.length; h++)
              i = b[h],
                i && isInt(i.value) && (i.value > 0 && this != i ? g++ : ""),
                g >= c && (f = "最多可选" + c + "种商品",
                  this.value = 0);
          (!c || c > g) && (d && (d = parseInt(d)),
            e && (e = parseInt(e)),
            (!isInt(this.value) || parseInt(this.value) - 1 < 0) && (this.value = d > 0 && this.value <= d ? d > limitNumber ? limitNumber : d : 0),
            d > 0 && this.value < parseInt(d) && (this.value = parseInt(d)),
            e > 0 && this.value >= parseInt(e) && (f = "此商品限购" + e + "件，不能再增加！",
              this.value = parseInt(e)),
            needlimit && this.value >= limitNumber && (!(e > 0 && limitNumber > e) || d > limitNumber) && (f = "库存只剩" + limitNumber + "件，不能再增加！",
              0 >= limitNumber && (f = "已售完，无法添加"),
              this.value = parseInt(limitNumber))),
            updateCart()
        }
      ) : (b[e].onclick || (b[e].onclick = itemClick),
        "TEXTAREA" == b[e].tagName && (b[e].onchange = b[e].onblur = itemClick),
        h = b[e].getAttribute("rel"),
        h && (i = null,
          "psibling" == h ? (i = getPreviousNode(b[e]),
            b[e].onclick = itemClick) : i = document.getElementById(h),
          i.itemText = b[e],
          b[e].choiceRel = i,
          b[e].onblur = fcInputboxBlur,
          a.dataNode && a.dataNode._referedTopics && (b[e].onchange = itemClick),
          b[e].value || (b[e].value = defaultOtherText),
          b[e].style.color = "#999999",
          j = b[e].getAttribute("req"),
          i.req = "true" == j ? !0 : !1),
        k = "",
        !a.dataNode || "radio" != a.dataNode._type && "check" != a.dataNode._type || (k = b[e].getAttribute("rimg"),
          k && (l = document.getElementById(k),
            l && (l.onclick = function () {
              var c, b = this.getAttribute("irel");
              b && (c = document.getElementById(b),
                c.parentNode.onclick())
            }
            ))),
        n = !(!a.dataNode || "radio" != a.dataNode._type && "check" != a.dataNode._type || a.dataNode.isSort || a.dataNode.isRate && "101" != a.dataNode._mode),
        a.isTrap || n ? (o = b[e].nextSibling,
          b[e].choiceRel ? (i = getPreviousNode(b[e]),
            i && (i.tagName && "label" == i.tagName.toLowerCase() && (i.style.display = "inline-block"),
              b[e].style.position = "static")) : null != o && (p = b[e].parentNode,
                k || (p.onmouseover = function () {
                  this.style.background = "#efefef"
                }
                  ,
                  p.onmouseout = function () {
                    this.style.background = ""
                  }
                ),
                b[e].checked && "radio" == b[e].type && (q = getPreviousNode(b[e]),
                  q && "a" == q.tagName.toLowerCase() && (a.prevARadio = q)),
                p.onclick = function () {
                  var d, e, f, g, c = this.getElementsByTagName("a")[0];
                  c && (a.hasConfirm || (d = c.getAttribute("rel"),
                    d && (e = document.getElementById(d),
                      e.disabled || (f = "radio" == e.type,
                        f ? (c.className = "jqRadio jqChecked",
                          e.checked = !0) : (e.checked = !e.checked,
                            c.className = e.checked ? "jqCheckbox jqChecked" : "jqCheckbox"),
                        g = null,
                        e.parent && (g = e.parent.parent || e.parent),
                        itemClick.call(e),
                        f && (g && g.prevARadio && g.prevARadio != c && (g.prevARadio.className = "jqRadio"),
                          g.prevARadio = c)))))
                }
              )) : "TR" != a.tagName || "radio" != b[e].type && "checkbox" != b[e].type || (r = b[e].parentNode,
                r.style.cursor = "pointer",
                hasJoin && b[e].checked && "radio" == b[e].type && (q = getPreviousNode(b[e]),
                  q && "a" == q.tagName.toLowerCase() && b[e].parent && (b[e].parent.prevARadio = q)),
                r.onclick = function (a) {
                  var e, b = this.getElementsByTagName("input"), c = b[0], d = getPreviousNode(c);
                  "checkbox" == c.type ? (c.checked = !c.checked,
                    c.onclick(),
                    d && (d.className = c.checked ? "jqCheckbox jqChecked" : "jqCheckbox"),
                    stopPropa(a)) : CheckMax(this, c) && (d && (d.className = "jqRadio jqChecked",
                      e = c.parent,
                      e.prevARadio && e.prevARadio != d && (e.prevARadio.className = "jqRadio"),
                      e.prevARadio = d),
                      c.checked = !0,
                      c.onclick(),
                      stopPropa(a))
                }
                ,
                r.onmouseover = function () {
                  this.style.background = "#efefef"
                }
                ,
                r.onmouseout = function () {
                  this.style.background = ""
                }
              ));
  b.length > 0 && (a.itemInputs = b)
}
function initLikertItem(a) {
  var e, f, b = $$tag("li", a), c = new Array;
  for (j = 0; j < b.length; j++)
    f = b[j].className.toLowerCase(),
      b[j].className && (f.indexOf("off") > -1 || f.indexOf("on") > -1) && (b[j].onclick = itemLiClick,
        b[j].onmouseover = itemMouseOver,
        b[j].onmouseout = itemMouseOut,
        b[j].parent = a,
        c.push(b[j]),
        f.indexOf("on") > -1 ? e = b[j] : f.indexOf("off") > -1 && e && (e.parent.holder = e.value));
  b.length > 0 && (e && (e.parent.holder = e.value),
    a.itemLis = c)
}
function referTitle(a, b) {
  var d, e, f, g, h, i, j, k, c = a.dataNode;
  if (c._titleTopic) {
    if (d = "",
      void 0 == b && a.itemInputs)
      for (e = 0; e < a.itemInputs.length; e++)
        a.itemInputs[e].checked && (f = getNextNode(a.itemInputs[e]),
          c.isSort && (f = a.itemInputs[e].parentNode.getElementsByTagName("label")[0]),
          d && (d += "&nbsp;"),
          d += f.innerHTML,
          g = a.itemInputs[e],
          g.itemText && (h = g.itemText.value,
            h && h != defaultOtherText && (d += "[" + h + "]")));
    else
      d = b || "";
    for (i = 0; i < c._titleTopic.length; i++)
      j = c._titleTopic[i],
        k = document.getElementById("spanTitleTopic" + j),
        k && (k.innerHTML = d,
          window.referTitleChangeTableTop && window.referTitleChangeTableTop(k))
  }
}
function getparentNode(a, b) {
  for (; a.parentNode.tagName.toLowerCase() != b;)
    a = a.parentNode;
  return a.parentNode
}
function createItem(a) {
  var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, b = a.dataNode, c = b._referedTopics.split(","), d = new Array;
  for (e = 0; e < a.itemInputs.length; e++)
    a.itemInputs[e].checked && d.push(a.itemInputs[e]);
  for (e = 0; e < c.length; e++)
    if (f = c[e],
      g = questionsObject[f],
      g && (h = !1,
        i = document.getElementById("divRef" + f))) {
      switch (j = 0,
      k = [],
      l = new Object,
      m = document.getElementById("lbl" + b._topic + "_1") ? !0 : !1,
      g.dataNode._type) {
        case "matrix":
        case "sum":
          if (window.cepingCandidate && !window.allowPart)
            continue;
          for (n = g.dataNode._mode,
            o = 0; o < a.itemInputs.length; o++)
            if (p = a.itemInputs[o],
              p.value && "checkbox" == p.type) {
              if (q = parseInt(p.value) - 1 + j,
                !g.itemTrs[q])
                break;
              g.itemTrs[q].style.display = p.checked ? "" : "none",
                window.processtable && processtable(g, q, p),
                p.checked && !g.itemTrs[q].hasInit && "matrix" == g.dataNode._type && (g.itemTrs[q].hasInit = !0,
                  n && 0 > n - 100 ? initLikertItem(g.itemTrs[q]) : initItem(g.itemTrs[q])),
                p.checked && (h = !0,
                  p.itemText && (r = p.itemText.value,
                    s = g.itemTrs[q].getElementsByTagName("th")[0],
                    s && (s.span || (s.span = document.createElement("span"),
                      s.appendChild(s.span)),
                      s.span.innerHTML = r && r != defaultOtherText ? "[<span style='color:red;'>" + r + "</span>]" : ""))),
                hasJoin && g.itemTrs[q].divSlider && (t = g.itemTrs[q].divSlider.getAttribute("defvalue"),
                  t && isInt(t) && g.itemTrs[q].sliderImage.setValue(parseInt(t))),
                m && (u = g.itemTrs[q].getAttribute("group"),
                  u && -1 == k.indexOf(u) && k.push(u),
                  u && p.checked && !l[u] && (l[u] = "1"))
            }
          1 == j && (g.itemTrs[0].style.display = h ? "" : "none"),
            i.style.display = h ? "none" : "",
            g.displayContent = h,
            window.isHiddenCloneDiv && isHiddenCloneDiv(g, h),
            window.setTableCloneDivWidth && window.setTableCloneDivWidth(g),
            g.referDiv = a;
          break;
        case "radio":
        case "check":
          for (v = g.itemInputs,
            w = new Object,
            o = 0; o < a.itemInputs.length; o++)
            p = a.itemInputs[o],
              p.checked && (w[p.value] = p);
          for (x = !1,
            o = 0; o < v.length; o++)
            x = !1,
              p = v[o],
              ("checkbox" == p.type || "radio" == p.type) && (y = w[p.value],
                z = p.parentNode,
                "li" != z.tagName.toLowerCase() && (z = getparentNode(z, "li")),
                y ? (z.style.display = "",
                  h = !0,
                  x = !0,
                  y.itemText && p.itemText && (p.itemText.value = y.itemText.value)) : z.style.display = "none",
                m && (u = z.getAttribute("group"),
                  u && -1 == k.indexOf(u) && k.push(u),
                  u && y && !l[u] && (l[u] = "1")),
                !x && "check" == g.dataNode._type && g.dataNode.isSort && clearItemOption(p, g));
          i.style.display = h ? "none" : "",
            g.displayContent = h
      }
      if (m)
        for (A = 0; A < k.length; A++)
          u = k[A],
            B = l[u],
            C = "lbl" + f + "_" + u,
            D = document.getElementById(C),
            D && (D.style.display = B ? "" : "none"),
            window.findLabelIDHandler && window.findLabelIDHandler(g, C, B)
    }
}
function divMatrixItemClick() {
  var a, b;
  if (curMatrixItem != this) {
    if (null != curMatrixItem && (curMatrixItem.style.background = curMatrixItem.prevBackColor || "",
      curMatrixItem.daoZhi))
      for (itemInputs = curMatrixItem.itemInputs,
        a = 0; a < itemInputs.length; a++)
        itemInputs[a].parentNode.style.background = "";
    curMatrixItem = this,
      this.parent && (b = this.parent.dataNode,
        updateProgressBar(b))
  }
}
function divQuestionClick() {
  if (curdiv != this) {
    showLeftBar(),
      curdiv = this,
      null != curMatrixItem && curMatrixItem.parent != curdiv && (curMatrixItem.style.background = curMatrixItem.prevBackColor || ""),
      null != curMatrixItem && curMatrixItem.parent == curdiv && (this.style.background = ""),
      this.removeError && this.removeError(),
      completeLoaded || (curdiv = null),
      this.itemTextarea && curdiv.parentNode && "none" != curdiv.parentNode.style.display && this.itemTextarea.focus();
    try {
      checkJpMatch(this)
    } catch (a) { }
  }
}
function showLeftBar() {
  window.divLeftBar && !hasDisplayed && (hasDisplayed = !0,
    divProgressImg && (divProgressImg.style.visibility = "visible",
      document.getElementById("loadprogress").style.visibility = "visible"),
    divSave && (divSave.parentNode.style.visibility = "visible",
      divSave.parentNode.style.marginTop = "5px"),
    divLeftBar.style.background = "#ffffff")
}
function updateProgressBar(a) {
  var b = a._topic;
  b > MaxTopic && (MaxTopic = b),
    progressArray[b] || (joinedTopic++,
      progressArray[b] = !0,
      showProgressBar(a)),
    setTimeout(function () {
      postHeight()
    }, 500)
}
function showProgressBar(a) {
  var b, c, d, e;
  window.divProgressImg && (loadcss || (loadcss = document.getElementById("loadcss")),
    loadprogress || (loadprogress = document.getElementById("loadprogress")),
    b = totalQ,
    c = joinedTopic,
    2 == progressBarType && (b = totalPage,
      c = cur_page + 1),
    d = 100 * (parseFloat(c) / b),
    d = d || 0,
    d >= 70 && a && a._topic == totalQ && (d = 100),
    e = d + "%",
    loadcss.style.height = e,
    loadprogress.innerHTML = 1 == progressBarType ? "&nbsp;&nbsp;" + d.toFixed(0) + "%" : "&nbsp;" + c + "/" + b + page_info,
    hrefSave && spanSave && clearInterval(saveInterval))
}
function checkMinMax(a, b, c) {
  var d, e, f, g, h;
  if (b._maxValue > 0 || b._minValue > 0) {
    for (d = c.itemInputs,
      e = 0,
      f = 0; f < d.length; f++)
      d[f].checked && e++;
    c.parent && (c = c.parent),
      c.divChecktip || (c.divChecktip = document.createElement("div"),
        c.appendChild(c.divChecktip),
        c.divChecktip.style.color = "#666"),
      g = "&nbsp;&nbsp;&nbsp;您已经选择了" + e + "项",
      b._maxValue > 0 && e > b._maxValue ? (0 == langVer && popUpAlert("此题最多只能选择" + b._maxValue + "项"),
        a.checked = !1,
        a.onclick && a.onclick(),
        h = getPreviousNode(a),
        h && "a" == h.tagName.toLowerCase() && (h.className = "jqCheckbox"),
        a.checked = !1,
        e--,
        g = "&nbsp;&nbsp;&nbsp;您已经选择了" + e + "项") : b._minValue > 0 && e < b._minValue && (g += ",<span style='color:red;'>少选择了" + (b._minValue - e) + "项</span>",
          a.checked && b._select[a.value - 1] && b._select[a.value - 1]._item_huchi && (g = "")),
      0 == langVer && (c.divChecktip.innerHTML = g)
  }
  return !1
}
function itemSortClick() {
  var c, d, e, f, g, h, i, j, a = this.getElementsByTagName("input")[0], b = a.parent.parent || a.parent;
  if (hasAnswer = !0,
    c = b.dataNode,
    updateProgressBar(c),
    d = a.checked,
    e = this.parentNode.getElementsByTagName("li"),
    f = this.getElementsByTagName("span")[0],
    d) {
    for (g = f.innerHTML,
      h = 0; h < e.length; h++)
      e[h].getElementsByTagName("input")[0].checked && (i = e[h].getElementsByTagName("span")[0],
        j = i.innerHTML,
        j - g > 0 && (i.innerHTML = j - 1));
    f.innerHTML = "",
      f.className = "sortnum",
      a.checked = !1
  } else {
    for (g = 1,
      h = 0; h < e.length; h++)
      e[h].getElementsByTagName("input")[0].checked && g++;
    f.innerHTML = g,
      f.className = "sortnum sortnum-sel",
      a.checked = !0
  }
  c._referedTopics && createItem(b),
    referTitle(b),
    displayItemRelationRaidoCheck(b, c),
    displayRelationRaidoCheck(b, c),
    this.inputLi = a,
    checkMinMax(this, c, b),
    jump(b, this),
    displaypeie(b)
}
function checkMatrixMaxValue(a, b) {
  var c, d, e;
  if (b && b.dataNode._maxvalue) {
    for (c = a.parentNode.parentNode.getElementsByTagName("input"),
      d = 0,
      e = 0; e < c.length; e++)
      c[e].checked && d++;
    if (d - b.dataNode._maxvalue > 0)
      return a.checked = !1,
        !0
  }
  return !1
}
function stopPropa(a) {
  a = a || window.event,
    a && (a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0)
}
function itemClick(a) {
  var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
  if (this.parent && (showLeftBar(),
    b = this.parent.parent || this.parent,
    !b.isTrap && !b.hasConfirm)) {
    if (hasAnswer = !0,
      c = b.dataNode,
      updateProgressBar(c),
      this.itemText && this.itemText.onclick && (this.checked ? this.itemText.onclick() : this.itemText.onblur && this.itemText.onblur()),
      "checkbox" == this.type)
      checkHuChi(b, this),
        this.itemText && (this.checked ? this.itemText.value = this.itemText.pvalue || "" : (this.itemText.pvalue = this.itemText.value,
          this.itemText.value = "")),
        c._referedTopics && createItem(b),
        referTitle(b),
        showAnswer(b),
        displayItemRelationRaidoCheck(b, c),
        displayRelationRaidoCheck(b, c),
        checkMinMax(this, c, b),
        jump(b, this),
        displaypeie(b),
        "matrix" == c._type && (checkMatrixMaxValue(this, b),
          divMatrixRel.style.display = "none",
          d = this.getAttribute("needfill"),
          d && this.checked && showMatrixFill(this),
          b.removeError && b.removeError(),
          stopPropa(a));
    else if ("radio" == this.type || "slider" == c._type || "matrix" == c._type && "201" != c._mode && "301" != c._mode && "302" != c._mode)
      e = !1,
        c._requir && !b.hasClearHref && "matrix" == c._type && "202" != c._mode && "102" != c._mode && (f = this.value,
          g = this.parentNode.parentNode.parentNode.parentNode,
          "table" == g.tagName.toLocaleLowerCase() && (h = g.getElementsByTagName("thead")[0],
            h && (i = h.getElementsByTagName("td"),
              i[f - 1] && (j = i[f - 1].getAttribute("itemmax"),
                j && window.cepingCandidate && "-1" != j.indexOf("%") && (k = parseInt(j.replace("%", "")),
                  l = cepingCandidate.split("&nbsp;&nbsp;&nbsp;"),
                  j = Math.ceil(l.length * k / 100)),
                j && j > 0 && (e = !0))))),
        !e && c._requir || b.hasClearHref || addClearHref(b),
        "radio" == this.type && ("matrix" == c._type ? (processRadioInput(this.parentNode.parentNode, this),
          divMatrixRel.style.display = "none",
          d = this.getAttribute("needfill"),
          d && showMatrixFill(this),
          b.removeError && b.removeError()) : processRadioInput(b, this),
          referTitle(b),
          showAnswer(b)),
        displayItemRelationRaidoCheck(b, c),
        displayRelationRaidoCheck(b, c),
        jump(b, this),
        displaypeie(b),
        (0 == popUpindex && "matrix" == c._type || "matrix" != c._type && 0 == itempopUpindex && c._mode && "0" != c._mode) && processSamecount(b, this);
    else if ("matrix" == c._type && "201" == c._mode) {
      for (m = b.itemTrs,
        n = 0,
        p = 0; p < m.length; p++)
        if ("none" != m[p].style.display) {
          if (n = validateMatrix(c, m[p], m[p].itemInputs[0]),
            n && !o) {
            o = m[p].itemInputs[0];
            break
          }
          txtChange(m[p], m[p].itemInputs[0])
        }
      if (b.removeError && b.removeError(),
        o && (b.errorControl = o,
          validate_ok = writeError(b, verifyMsg, 3e3)),
        b.dataNode._hasjump) {
        for (q = !1,
          p = 0; p < m.length; p++)
          if (r = m[p].itemInputs[0],
            "" != trim(r.value)) {
            q = !0;
            break
          }
        jumpAny(q, b)
      }
      stopPropa(a)
    } else if ("sum" == c._type)
      this.parent.sliderImage ? sumClick(b, this.parent.sliderImage.sliderValue) : sumClick(b, this);
    else if ("text" == this.type)
      processTextR(this, b, c),
        stopPropa(a);
    else if ("SELECT" == this.nodeName) {
      if ("check" == c._type)
        return;
      b.focus(),
        jump(b, this),
        displayRelationDropDown(b, c),
        s = this.options[this.selectedIndex].text,
        -2 == this.value && (s = ""),
        referTitle(b, s),
        displaypeie(b)
    }
    postHeight()
  }
}
function showAnswer(a) {
  if (window.isChuangGuan && "1" == a.getAttribute("ceshi") && !a.confirmButton) {
    var b = document.createElement("a");
    b.style.margin = "10px 0 0 20px",
      b.className = "sumitbutton cancle",
      a.insertBefore(b, a.lastChild),
      a.confirmButton = b,
      b.innerHTML = "确认",
      b.onclick = function () {
        var b, c, d, e, f, g, h, i, j, k;
        if (hasConfirmBtn || (maxCheatTimes > 0 && (fireConfirm = !0),
          confirm("确认后答案将无法修改，确认吗？"))) {
          for (a.hasConfirm = !0,
            hasConfirmBtn = !0,
            b = !0,
            c = "",
            d = a.itemInputs,
            e = 0; e < d.length; e++)
            f = "1" == d[e].getAttribute("ans"),
              f ? (d[e].checked || (b = !1),
                g = getNextNode(d[e]),
                h = "",
                g && (h = g.innerHTML),
                /^[A-Z][\.、．\s]/.test(h) && (h = h.substring(0, 1)),
                c && (c += ","),
                c += h) : d[e].checked && (b = !1),
              g = getNextNode(d[e]),
              "label" == g.tagName.toLowerCase() && g.removeAttribute("for");
          a.correctAnswer || (i = document.createElement("div"),
            i.style.margin = "10px 0 0 20px",
            i.style.fontSize = "16px",
            a.insertBefore(i, a.lastChild),
            a.correctAnswer = i),
            j = b ? "<span style='color:green;'>回答正确</span>" : "<span style='color:red;'>回答错误，正确答案为：" + c + "</span>",
            a.correctAnswer.innerHTML = j,
            k = document.getElementById("divjx" + a.id.replace("div", "")),
            k && (k.style.display = "")
        }
      }
  }
}
function processSamecount(a, b) {
  var c, d, e, f, g, h, i, j, k, l;
  if (window.IsSampleService && "t" == promoteSource)
    if (c = a.dataNode,
      "matrix" == c._type) {
      for (d = b.value,
        e = a.getElementsByTagName("input"),
        f = 0,
        g = 0; g < e.length; g++)
        if (e[g].checked && e[g].value == d && f++,
          f > 4) {
          popUpindex++,
            popUpAlert("你有连续多个答案相同，如果你是随意答题，请返回修改，以免答卷提交后无法通过审核");
          break
        }
    } else
      for (h = c._mode,
        d = b.value,
        i = parseInt(a.id.replace("div", "")) - 1,
        f = 0,
        g = i; g >= 1 && (j = document.getElementById("div" + g),
          k = j.dataNode,
          "radio" == k._type && k._mode == h); g--) {
        if (e = j.getElementsByTagName("input"),
          e.length > 0) {
          for (l = 0; l < e.length; l++)
            if (e[l].checked && e[l].value == d) {
              f++;
              break
            }
        } else
          e = j.getElementsByTagName("li"),
            e[d].className.toLowerCase().indexOf("on") > -1 && !e[d + 1].className.toLowerCase().indexOf("on") > -1 && f++;
        if (f > 3) {
          itempopUpindex++,
            popUpAlert("你有连续多个答案相同，如果你是随意答题，请返回修改，以免答卷提交后无法通过审核"),
            stopPropa();
          break
        }
      }
}
function processRadioInput(a, b) {
  a.prevRadio && a.prevRadio.itemText && a.prevRadio != b && (a.prevRadio.itemText.pvalue = a.prevRadio.itemText.value,
    a.prevRadio.itemText.value = ""),
    b.itemText && b != a.prevRadio && (b.itemText.value = b.itemText.pvalue || ""),
    a.prevRadio = b
}
function processTextR(a, b, c) {
  var d, e;
  if (a.choiceRel) {
    if (a.choiceRel.disabled)
      return;
    if (a.value == defaultOtherText && (a.value = ""),
      1 == c._mode && "checkbox" == a.choiceRel.type)
      a.choiceRel.checked || a.parentNode.click();
    else {
      if (a.choiceRel.checked = !0,
        "matrix" == c._type && "102" == c._mode && (d = checkMatrixMaxValue(a.choiceRel, b)))
        return a.blur && a.blur(),
          void 0;
      a.style.color = "#000000",
        a.style.background = "",
        c._referedTopics && createItem(b),
        referTitle(b),
        "checkbox" == a.choiceRel.type ? (a.pvalue && !a.value && (a.value = a.pvalue),
          e = getPreviousNode(a.choiceRel),
          e && "a" == e.tagName.toLowerCase() && (e.className = "jqCheckbox jqChecked"),
          checkHuChi(b, a.choiceRel),
          checkMinMax(a.choiceRel, c, b)) : "radio" == a.choiceRel.type && ("matrix" == c._type ? processRadioInput(a.parentNode.parentNode, a.choiceRel) : (e = getPreviousNode(a.choiceRel),
            e && "a" == e.tagName.toLowerCase() && (e.className = "jqRadio jqChecked",
              b && b.prevARadio && b.prevARadio != e && (b.prevARadio.className = "jqRadio"),
              b.prevARadio = e),
            processRadioInput(b, a.choiceRel))),
        displayRelationRaidoCheck(b, c),
        jump(b, a.choiceRel)
    }
  }
}
function checkHuChi(a, b) {
  var c, d, e, f, g;
  if (b.checked && (c = a.dataNode,
    c.hasHuChi))
    for (d = a.itemInputs,
      e = c._select[b.value - 1]._item_huchi,
      f = 0; f < d.length; f++)
      "checkbox" == d[f].type && d[f] != b && d[f].checked && (e ? (d[f].parentNode.onclick && d[f].parentNode.onclick(),
        d[f].checked = !1) : (g = c._select[d[f].value - 1]._item_huchi,
          g && (d[f].parentNode.onclick && d[f].parentNode.onclick(),
            d[f].checked = !1)))
}
function relationItemJoin(a) {
  var b, c;
  "none" != a.style.display && (b = a.dataNode,
    c = b._type,
    ("radio" == c || "check" == c) && displayItemRelationRaidoCheck(a, b))
}
function relationJoin(a) {
  var b, c, d, e;
  if ("none" != a.style.display || relationQs[a.dataNode._topic])
    if (b = a.dataNode,
      c = b._type,
      "radio" == c || "check" == c) {
      if (a.getAttribute("qingjing")) {
        if (d = a.dataNode._topic,
          !relationQs[d])
          return;
        for (e = 0; e < relationQs[d].length; e++)
          relationQs[d][e].style.display = "none"
      }
      displayRelationRaidoCheck(a, b)
    } else
      "radio_down" == c && displayRelationDropDown(a, b)
}
function displayItemRelationRaidoCheck(a, b) {
  var d, e, f, g, h, i, j, c = b._topic;
  if (ItemrelationQs[c]) {
    if (a.hasDisplayByItemRelation = new Object,
      d = -1,
      a.itemLis) {
      for (e = a.itemLis,
        f = 0; f < e.length; f++)
        e[f].className.indexOf("on") > -1 && (d = f + 1);
      for (f = 0; f < e.length; f++)
        g = !1,
          h = e[f].value,
          i = c + "," + h,
          d > -1 && h == d && (g = !0),
          displayByItemRelation(a, i, g)
    } else
      for (e = a.itemInputs,
        f = 0; f < e.length; f++)
        g = !1,
          h = e[f].value,
          i = c + "," + h,
          e[f].checked && (g = !0),
          ItemrelationGroupHT[i] && displayByItemRelation(a, i, g),
          j = c + ",-" + h,
          -1 != ItemrelationGroup.indexOf(a.dataNode._topic) && displayByItemRelation(a, j, g, !0),
          displayByItemRelationNotSelect(a, j, g, e);
    loopJoinProgressQ(c)
  }
}
function displayRelationRaidoCheck(a, b) {
  var d, e, f, g, h, i, j, c = b._topic;
  if (relationQs[c]) {
    if (a.hasDisplayByRelation = new Object,
      d = -1,
      a.itemLis) {
      for (e = a.itemLis,
        f = 0; f < e.length; f++)
        e[f].className.indexOf("on") > -1 && (d = f + 1);
      for (f = 0; f < e.length; f++)
        g = !1,
          h = e[f].value,
          i = c + "," + h,
          d > -1 && h == d && (g = !0),
          displayByRelation(a, i, g)
    } else
      for (e = a.itemInputs,
        f = 0; f < e.length; f++)
        g = !1,
          h = e[f].value,
          i = c + "," + h,
          e[f].checked && (g = !0),
          displayByRelation(a, i, g),
          j = c + ",-" + h,
          -1 != relationGroup.indexOf(a.dataNode._topic) && (relationGroupHT[j] || relationGroupHT[j.replace(",", ",-")],
            displayByRelation(a, j, g, !0)),
          displayByRelationNotSelect(a, j, g, e);
    loopJoinProgressQ(c)
  }
}
function loopJoinProgressQ(a, b) {
  var c, d, e;
  if (relationQs[a])
    for (c = 0; c < relationQs[a].length; c++)
      d = relationQs[a][c],
        d.dataNode && (e = d.dataNode._topic,
          "none" != d.style.display || progressArray[e] || (progressArray[e] = "jump",
            joinedTopic++),
          loopJoinProgressQ(e, b))
}
function displayRelationDropDown(a, b) {
  var d, e, f, g, h, i, c = b._topic;
  if (relationQs[c]) {
    for (d = a.itemSel,
      e = a.itemSel.value,
      a.hasDisplayByRelation = new Object,
      f = 0; f < d.length; f++)
      g = !1,
        h = d[f].value,
        i = c + "," + h,
        h == e && (g = !0),
        displayByRelation(a, i, g);
    loopJoinProgressQ(c)
  }
}
function checkDisplay(a) {
  var c, d, e, f, g, h, i, j, k, l, m, o, b = !1;
  for (c in a)
    for (d = 0; d < a[c].length; d++)
      if (e = a[c][d].replace("q", "").split("_"),
        2 == e.length)
        if (f = questionsObject[e[0]].getAttribute("id").replace("div", ""),
          g = e[1].replace("-", ""),
          h = document.getElementById("q" + f + "_" + g),
          i = document.getElementById("div" + f),
          j = document.getElementById("q" + f),
          k = i.getAttribute("qingjing"),
          1 == k) {
          if ("" == i.style.display && h && h.checked) {
            b = !0;
            break
          }
        } else {
          if (h && e[1] > 0 == h.checked) {
            b = !0;
            break
          }
          if (!h && j && e[1] == j.value) {
            b = !0;
            break
          }
          if (!h && i && (l = i.itemInputs || i.itemLis)) {
            for (m = -1,
              o = 0; o < l.length; o++)
              l[o].className && l[o].className.toLowerCase().indexOf("on") > -1 && (m = o + 1);
            if (e[1] == m) {
              b = !0;
              break
            }
          }
        }
  return b
}
function checkOneQusOrItemRelation(a) {
  var c, d, e, f, g, i, j, k, l, m, n, o, q, b = !1;
  for (c = 0; c < a.length; c++)
    if (d = a[c].replace("q", "").split("_"),
      2 == d.length)
      if (e = questionsObject[d[0]].getAttribute("id").replace("div", ""),
        f = d[1].replace("-", ""),
        g = document.getElementById("q" + e + "_" + f),
        document.getElementById("q" + e),
        i = document.getElementById("div" + e),
        j = i.getAttribute("qingjing"),
        1 == j) {
        if ("" == i.style.display && g && g.checked) {
          b = !0;
          break
        }
      } else {
        if (k = !1,
          d[1] < 0 && g && i && (l = i.getElementsByTagName("input")))
          for (m = 0; m < l.length; m++)
            if (l[m].checked) {
              k = !0;
              break
            }
        if (g && d[1] > 0 == g.checked) {
          if (b = !0,
            d[1] < 0 && !k) {
            b = !1;
            break
          }
          break
        }
        if (!g && i)
          if (n = i.itemInputs || i.itemLis) {
            for (o = -1,
              q = 0; q < n.length; q++)
              n[q].className && n[q].className.toLowerCase().indexOf("on") > -1 && (o = q + 1);
            if (d[1] == o) {
              b = !0;
              break
            }
          } else if (i.itemSel && d[1] == i.itemSel.value) {
            b = !0;
            break
          }
      }
  return b
}
function checkOneQusAndItemRelation(a) {
  var c, d, e, f, g, i, j, k, l, m, n, p, b = !0;
  for (c = 0; c < a.length; c++)
    if (d = a[c].replace("q", "").split("_"),
      2 == d.length) {
      if (e = questionsObject[d[0]].getAttribute("id").replace("div", ""),
        f = d[1].replace("-", ""),
        g = document.getElementById("q" + e + "_" + f),
        document.getElementById("q" + e),
        i = document.getElementById("div" + e),
        j = !1,
        k = i.getElementsByTagName("input"))
        for (l = 0; l < k.length; l++)
          if (k[l].checked) {
            j = !0;
            break
          }
      if (g && d[1] > 0 != g.checked) {
        b = !1;
        break
      }
      if (g && d[1] < 0 && !j) {
        b = !1;
        break
      }
      if (!g && i)
        if (m = i.itemInputs || i.itemLis) {
          for (n = -1,
            p = 0; p < m.length; p++)
            m[p].className && m[p].className.toLowerCase().indexOf("on") > -1 && (n = p + 1);
          if (d[1] != n) {
            b = !1;
            break
          }
        } else if (i.itemSel && d[1] == i.itemSel.value) {
          b = !0;
          break
        }
    }
  return b
}
function displayByItemRelation(a, b, c, d) {
  var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, e = a.dataNode._topic;
  if (-1 != ItemrelationGroup.indexOf(e) && (f = "",
    g = ItemrelationGroupHT[b] || ItemrelationGroupHT[b.replace(",", ",-")]))
    for (h = 0; h < g.length; h++)
      if (i = new Object,
        j = g[h],
        k = j.replace("q", "").split("_"),
        l = questionsObject[k[0]].getAttribute("id").replace("div", ""),
        m = k[1].replace("-", ""),
        n = document.getElementById("q" + l + "_" + m),
        n && (o = n.parentNode,
          "LI" == o.nodeName || (o = n.parentNode.parentNode,
            "LI" == o.nodeName || (o = n.parentNode.parentNode.parentNode,
              o && "LI" == o.nodeName)))) {
        p = o.getAttribute("itemrelation"),
          p && (f = -1 != p.indexOf("|") ? "|" : "$"),
          q = p.split(f);
        for (r in ItemrelationGroupHT)
          for (s = 0; s < ItemrelationGroupHT[r].length; s++)
            t = ItemrelationGroupHT[r][s],
              j == t && (u = r.split(",")[0],
                i[u] || (i[u] = new Array),
                i[u].push("q" + r.replace(",", "_")));
        if (v = !1,
          "$" == f) {
          v = !1;
          for (w in i)
            if (x = !1,
              y = isOrChooseLogic(q, w),
              x = y ? checkOneQusOrItemRelation(i[w]) : checkOneQusAndItemRelation(i[w])) {
              v = !0;
              break
            }
        } else {
          v = !0;
          for (w in i)
            if (x = !1,
              y = isOrChooseLogic(q, w),
              x = y ? checkOneQusOrItemRelation(i[w]) : checkOneQusAndItemRelation(i[w]),
              !x) {
              v = !1;
              break
            }
        }
        z = v ? "" : "none",
          checkDisplayques(j, z),
          v || loopHideItemRelation(j)
      }
  if (A = ItemrelationHT[b])
    for (B = 0; B < A.length; B++)
      C = A[B],
        a.hasDisplayByItemRelation[C] || (n = document.getElementById(C),
          n && (o = n.parentNode,
            ("LI" == o.nodeName || (o = n.parentNode.parentNode,
              "LI" == o.nodeName || (o = n.parentNode.parentNode.parentNode,
                o && "LI" == o.nodeName))) && (c || "none" == o.style.display ? c && (checkDisplayques(C, ""),
                  d || (a.hasDisplayByItemRelation[C] = "1"),
                  relationNotDisplayItem[C] && (relationNotDisplayItem[C] = "")) : loopHideItemRelation(A[B]))))
}
function displayByItemRelationNotSelect(a, b, c, d) {
  var f, g, h, i, j, k, l, m, n, o, p, q, r, e = ItemrelationHT[b];
  if (e)
    for (f = 0; f < e.length; f++)
      if (g = c,
        h = e[f],
        !a.hasDisplayByItemRelation[h] && (i = document.getElementById(h),
          i && (j = i.parentNode,
            "LI" == j.nodeName || (j = i.parentNode.parentNode,
              "LI" == j.nodeName || (j = i.parentNode.parentNode.parentNode,
                j && "LI" == j.nodeName))))) {
        if (k = j.getAttribute("itemrelation"),
          k.indexOf(";") > -1 && (l = !1,
            m = k.split(","),
            2 == m.length)) {
          for (n = m[1].split(";"),
            o = new Object,
            p = 0; p < n.length; p++)
            n[p] - 0 < 0 && (q = n[p].replace("-", ""),
              o[q] = "1");
          for (p = 0; p < d.length; p++)
            if (r = d[p].value,
              o[r] && d[p].checked) {
              l = !0;
              break
            }
          g = l ? !0 : !1
        }
        g && "none" != j.style.display ? loopHideItemRelation(h) : g || (checkDisplayques(h, ""),
          a.hasDisplayByItemRelation[h] = "1",
          relationNotDisplayItem[h] && (relationNotDisplayItem[h] = ""))
      }
}
function loopHideItemRelation(a) {
  var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r;
  if (!isLoadQues && (b = a.split("_"),
    2 == b.length)) {
    if (c = b[0].replace("q", ""),
      d = ItemrelationQs[c])
      for (e = 0; e < d.length; e++)
        f = d[e],
          loopHideItemRelation(f, !1);
    if (g = document.getElementById(a),
      g && (h = questionsObject[c],
        i = clearItemOption(g, h),
        i && (jumpAny(!1, h),
          j = g.parentNode,
          "LI" == j.nodeName || (j = g.parentNode.parentNode,
            "LI" == j.nodeName || (j = g.parentNode.parentNode.parentNode,
              j && "LI" == j.nodeName))))) {
      if (k = !0,
        l = j.getAttribute("itemrelation"),
        l && "0" != l && -1 != l.indexOf("$")) {
        m = new Object;
        for (n in ItemrelationGroupHT)
          for (o = 0; o < ItemrelationGroupHT[n].length; o++)
            p = "",
              ItemrelationGroupHT[n][o] && (p = ItemrelationGroupHT[n][o].replace("_", ",").replace("q", "")),
              a == p && (q = n.split(",")[0],
                m[q] || (m[q] = new Array),
                m[q].push("q" + n.replace(",", "_")));
        r = checkDisplay(m),
          r && (k = !1)
      }
      k && (checkDisplayques(a, "none"),
        "" == relationNotDisplayItem[a] && (relationNotDisplayItem[a] = "1"))
    }
  }
}
function clearItemOption(a, b) {
  var c, d, e, f, g, h;
  if (!a.checked)
    return !1;
  if (c = getPreviousNode(a),
    c && "a" == c.tagName.toLowerCase())
    a.checked = !1,
      c.className = c.className.replace("jqChecked", "");
  else if (d = getNextNode(a),
    d && "span" == d.tagName.toLowerCase())
    for (e = a.parentNode.parentNode.parentNode,
      f = e.getElementsByTagName("li"),
      g = 0; g < f.length; g++)
      h = f[g].getElementsByTagName("span")[0],
        f[g].getElementsByTagName("input")[0].checked && (f[g].getElementsByTagName("input")[0].checked = !1,
          h.innerHTML = "",
          h.className = "sortnum");
  return checkMinMax(a, b.dataNode, b),
    !0
}
function checkDisplayques(a, b) {
  var g, h, i, j, k, l, c = a.replace("q", "").split("_"), d = questionsObject[c[0]].getAttribute("id").replace("div", ""), e = c[1].replace("-", ""), f = document.getElementById("q" + d + "_" + e);
  if (f && (g = document.getElementById("div" + d),
    g && ("none" != b && !g.dataNode._hasjump || isLoadQues || clearItemOption(f, g),
      h = f.parentNode,
      ("LI" == h.nodeName || (h = f.parentNode.parentNode,
        "LI" == h.nodeName || (h = f.parentNode.parentNode.parentNode,
          h && "LI" == h.nodeName))) && h.style.display != b && (h.style.display = b,
            c = a.replace("q", "").split("_"),
            2 == c.length && !relationNotDisplayQ[d])))) {
    if (i = g.itemInputs,
      "" == b)
      "none" == g.style.display && (g.style.display = "");
    else {
      for (j = "none",
        k = 0; k < i.length; k++)
        if (l = i[k].parentNode,
          ("LI" == l.nodeName || (l = i[k].parentNode.parentNode,
            "LI" == l.nodeName || (l = i[k].parentNode.parentNode.parentNode,
              l && "LI" == l.nodeName))) && "" == l.style.display) {
          j = "";
          break
        }
      g.style.display = j
    }
    relationQs[d] && displayRelationRaidoCheck(g, g.dataNode)
  }
}
function displayByRelation(a, b, c, d) {
  var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, e = a.dataNode._topic;
  if (-1 != relationGroup.indexOf(e) && (f = "",
    g = relationGroupHT[b] || relationGroupHT[b.replace(",", ",-")]))
    for (h = 0; h < g.length; h++) {
      i = new Object,
        j = "",
        j = g[h].dataNode ? g[h].dataNode._topic : g[h].getAttribute("topic"),
        k = g[h].getAttribute("relation"),
        k && (f = -1 != k.indexOf("|") ? "|" : "$"),
        l = k.split(f);
      for (m in relationGroupHT)
        for (n = 0; n < relationGroupHT[m].length; n++)
          o = "",
            o = relationGroupHT[m][n].dataNode ? relationGroupHT[m][n].dataNode._topic : relationGroupHT[m][n].getAttribute("topic"),
            j == o && (p = m.split(",")[0],
              i[p] || (i[p] = new Array),
              i[p].push("q" + m.replace(",", "_")));
      if (q = !1,
        "$" == f) {
        q = !1;
        for (r in i)
          if (s = !1,
            t = isOrChooseLogic(l, r),
            s = t ? checkOneQusOrItemRelation(i[r]) : checkOneQusAndItemRelation(i[r])) {
            q = !0;
            break
          }
      } else {
        q = !0;
        for (r in i)
          if (s = !1,
            t = isOrChooseLogic(l, r),
            s = t ? checkOneQusOrItemRelation(i[r]) : checkOneQusAndItemRelation(i[r]),
            !s) {
            q = !1;
            break
          }
      }
      u = questionsObject[j],
        u ? (v = q ? "" : "none",
          checkDisplayItemques(u, v),
          q ? (loopShowRelation(u),
            "jump" == progressArray[j] && (progressArray[j] = !1,
              joinedTopic--)) : loopHideRelation(u)) : (w = document.getElementById("divCut" + j.replace("c", "")),
                w && (w.style.display = q ? "" : "none",
                  relationNotDisplayQ[j] = q ? "" : "1"))
    }
  if (x = relationHT[b])
    for (y = 0; y < x.length; y++)
      z = "",
        z = x[y].dataNode ? x[y].dataNode._topic : x[y].getAttribute("topic"),
        a.hasDisplayByRelation[z] || (c || "none" == x[y].style.display ? c && (checkDisplayItemques(x[y], ""),
          "1" == x[y].getAttribute("isshop") && updateCart(x[y]),
          "1" == x[y].getAttribute("qingjing") && displayRelationRaidoCheck(x[y], x[y].dataNode),
          d || (a.hasDisplayByRelation[z] = "1"),
          "jump" == progressArray[z] && (progressArray[z] = !1,
            joinedTopic--),
          relationNotDisplayQ[z] && (relationNotDisplayQ[z] = "")) : loopHideRelation(x[y]));
  window.zunxiangParas && j && window.zunxiangSetDefauts("q" + j, j, !1)
}
function displayByRelationNotSelect(a, b, c, d) {
  var f, g, h, i, j, k, l, m, n, o, p, e = relationHT[b];
  if (e)
    for (f = 0; f < e.length; f++)
      if (g = c,
        h = "",
        h = e[f].dataNode ? e[f].dataNode._topic : e[f].getAttribute("topic"),
        !a.hasDisplayByRelation[h]) {
        if (i = e[f].getAttribute("relation"),
          i.indexOf(";") > -1 && (j = !1,
            k = i.split(","),
            2 == k.length)) {
          for (l = k[1].split(";"),
            m = new Object,
            n = 0; n < l.length; n++)
            o = l[n].replace("-", ""),
              m[o] = "1";
          for (n = 0; n < d.length; n++)
            if (p = d[n].value,
              m[p] && d[n].checked) {
              j = !0;
              break
            }
          g = j ? !0 : !1
        }
        g && "none" != e[f].style.display ? loopHideRelation(e[f]) : g || (checkDisplayItemques(e[f], ""),
          a.hasDisplayByRelation[h] = "1",
          "jump" == progressArray[h] && (progressArray[h] = !1,
            joinedTopic--),
          relationNotDisplayQ[h] && (relationNotDisplayQ[h] = ""))
      }
}
function loopShowRelation(a) {
  var c, d, b = "";
  if (b = a.dataNode ? a.dataNode._topic : a.getAttribute("topic"),
    c = relationQs[b])
    for (d = 0; d < c.length; d++)
      loopShowRelation(c[d], !1);
  "1" == a.getAttribute("isshop") ? updateCart(a) : "1" == a.getAttribute("qingjing") && displayRelationRaidoCheck(a, a.dataNode),
    "jump" == progressArray[b] && (progressArray[b] = !1,
      joinedTopic--)
}
function loopHideRelation(a) {
  var b, c, d, e, f, g, h, i, j, k, l, m;
  if (!isLoadQues) {
    if (b = "",
      b = a.dataNode ? a.dataNode._topic : a.getAttribute("topic"),
      c = relationQs[b])
      for (d = 0; d < c.length; d++)
        loopHideRelation(c[d], !1);
    if (e = clearAllOption(a)) {
      if (jumpAny(!1, a),
        f = !0,
        g = a.getAttribute("relation"),
        g && "0" != g && -1 != g.indexOf("$")) {
        h = new Object;
        for (i in relationGroupHT)
          for (j = 0; j < relationGroupHT[i].length; j++)
            k = "",
              k = relationGroupHT[i][j].dataNode ? relationGroupHT[i][j].dataNode._topic : relationGroupHT[i][j].getAttribute("topic"),
              b == k && (l = i.split(",")[0],
                h[l] || (h[l] = new Array),
                h[l].push("q" + i.replace(",", "_")));
        m = checkDisplay(h),
          m && (f = !1)
      }
      f && (checkDisplayItemques(a, "none"),
        "1" == a.getAttribute("isshop") && updateCart(a),
        "" == relationNotDisplayQ[b] && (relationNotDisplayQ[b] = "1"))
    }
  }
}
function checkDisplayItemques(a, b) {
  var c = a.getAttribute("id").replace("div", "");
  return relationNotDisplayQ[c] = "none" == b ? "1" : "",
    a.style.display == b ? ("" == b && window.monitoringEmbeddingIframeSwitch && monitoringEmbeddingIframeSwitch(a),
      void 0) : (a.style.display = b,
        a.dataNode ? "" == b ? (window.monitoringEmbeddingIframeSwitch && monitoringEmbeddingIframeSwitch(a),
          void 0) : (ItemrelationQs[a.dataNode._topic] && displayItemRelationRaidoCheck(a, a.dataNode),
            void 0) : void 0)
}
function sumClick(a, b, c) {
  var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, d = a.getElementsByTagName("input"), e = a.dataNode;
  if (updateProgressBar(e),
    d) {
    for (f = d.length,
      g = e._total,
      h = g,
      i = 0,
      l = b.value,
      parseInt(l) < 0 && (b.value = ""),
      m = new Array,
      n = 0; f > n; n++)
      o = d[n].value,
        p = a.itemTrs[n],
        q = p.sliderImage,
        "none" != p.style.display ? (j = d[n],
          k = q,
          d[n].sIndex = n,
          m.push(d[n]),
          o && trim(o) ? isInt(o) ? (h -= parseInt(o),
            void 0 == q._value ? q.setValue(parseInt(l), !0) : c && d[n] == b && q.setValue(parseInt(l), !0)) : (d[n].value = "",
              i++) : "none" == p.style.display || i++) : (o = "",
                d[n].value = "");
    if (1 == i && h >= 0 && (k.setValue(h, !0),
      j.value = h,
      h = 0),
      r = "",
      0 == i && 0 != h && (s = parseInt(j.value) + h,
        s >= 0 ? j != b ? (k.setValue(s, !0),
          j.value = s,
          h = 0) : 2 == m.length && (t = g - parseInt(j.value),
            u = m[0].sIndex,
            a.itemTrs[u].sliderImage.setValue(t),
            m[0].value = t,
            h = 0) : r = "，<span style='color:red;'>" + sum_warn + "</span>"),
      0 == h)
      for (n = 0; f > n; n++)
        d[n].value || (d[n].value = "0");
    a.sumLeft = h,
      a.relSum && (a.relSum.innerHTML = sum_total + "<b>" + g + "</b>" + sum_left + "<span style='color:red;font-bold:true;'>" + (g - h) + "</span>" + r),
      jump(a, this)
  }
}
function jump(a, b) {
  var c = a.dataNode
    , d = c._anytimejumpto
    , e = c._hasjump
    , f = c._referTopic;
  e && !f && (d > 0 ? jumpAnyChoice(a) : 0 == d && "radio" != c._type && "radio_down" != c._type ? jumpAnyChoice(a) : jumpByChoice(a, b))
}
function jumpAnyChoice(a, b) {
  var e, f, c = a.itemInputs || a.itemLis || a.itemTrs || a.gapFills, d = !1;
  if (c)
    for (e = 0; e < c.length; e++) {
      if (c[e].checked)
        d = !0;
      else if (c[e].className.indexOf("on") > -1)
        d = !0;
      else if (c[e].divSlider && c[e].divSlider.value)
        d = !0;
      else if ("TEXTAREA" == c[e].tagName && "" != trim(c[e].value))
        d = !0;
      else if ("text" == c[e].type && "" != trim(c[e].value))
        d = !0;
      else if (c[e].itemSels)
        for (f = 0; f < c[e].itemSels.length; f++)
          if (c[e].itemSels[f]) {
            d = !0;
            break
          }
      if (d)
        break
    }
  else
    a.itemSel ? d = a.itemSel.selectedIndex > 0 ? !0 : !1 : a.divSlider ? d = void 0 != a.divSlider.value && null != a.divSlider.value ? !0 : !1 : a.itemTextarea ? d = "" != trim(a.itemTextarea.value) : a.uploadFrame && (d = a.fileName ? !0 : !1);
  jumpAny(d, a, b)
}
function jumpByChoice(a, b) {
  var d, c = a.dataNode;
  "-2" == b.value ? processJ(a.indexInPage - 0, 0, !1, a.pageIndex) : "-1" == b.value || "" == b.value ? processJ(a.indexInPage - 0, 0, !1, a.pageIndex) : "radio" != c._type && "radio_down" != c._type || parseInt(b.value) != b.value || (d = c._select[b.value - 1]._item_jump,
    processJ(a.indexInPage - 0, d - 0, !1, a.pageIndex))
}
function txtChange(a, b) {
  var d, e, f, g, h, i, j, k, l, m, n, o, p, c = a.parent.parent || a.parent;
  updateProgressBar(c.dataNode),
    hasAnswer = !0,
    c.removeError && c.removeError(),
    d = c.dataNode._verify,
    e = c.dataNode._needOnly || a.getAttribute("needonly"),
    f = a.value,
    !f && b && b.value && (f = b.value),
    f || (f = ""),
    f = trim(f),
    g = !0,
    "3" == hasJoin && a.prevvalue == a.value && (a.isOnly = !0,
      g = !1),
    e && "" != f && "地图" != d && b && g && !c.needsms && (h = getXmlHttp(),
      h.onreadystatechange = function () {
        4 == h.readyState && 200 == h.status && ("false1" == unescape(h.responseText) ? (a.isOnly = !1,
          writeError(c, validate_only, 3e3)) : a.isOnly = !0)
      }
      ,
      i = c.dataNode._topic,
      j = a.getAttribute("gapindex"),
      j && (i = 1e4 * parseInt(i) + parseInt(j)),
      k = "/joinnew/AnswerOnlyHandler.ashx?q=" + activityId + "&at=" + encodeURIComponent(f) + "&qI=" + i + "&o=true&t=" + (new Date).valueOf(),
      window.nfjoinid && "2" != hasJoin && (k += "&joinid=" + nfjoinid),
      h.open("get", k),
      h.send(null)),
    ("matrix" != c.dataNode._type || "201" != c.dataNode._mode) && ("matrix" == c.dataNode._type && "303" == c.dataNode._mode && (d = "数字"),
      "matrix" == c.dataNode._type && "302" == c.dataNode._mode && "" != f && window.hideTip && hideTip(a),
      "" != f && d && "0" != d && (c.removeError && c.removeError(),
        l = c.dataNode,
        m = c.getAttribute("issample"),
        n = !0,
        m && "t" != promoteSource && (n = !1),
        n && (o = verifyMinMax(a, d, l._minword, l._maxword),
          "" != o && (validate_ok = writeError(c, o, 3e3)),
          "密码" == d && a && a.firstPwd && (d = "确认密码"),
          o = verifydata(a, d, c.dataNode),
          "" != o && (validate_ok = writeError(c, o, 3e3)))),
      "gapfill" == c.dataNode._type && (p = 0,
        p = validateMatrix(c.dataNode, a, a),
        p && (c.errorControl = a,
          writeError(c, verifyMsg, 3e3))),
      "sum" == c.dataNode._type ? sumClick(c, a, 1) : jumpAny("" != f, c))
}
function jumpAny(a, b, c) {
  var d = b.dataNode;
  d && d._hasjump && (a ? processJ(b.indexInPage - 0, d._anytimejumpto - 0, c, b.pageIndex) : processJ(b.indexInPage - 0, 0, c, b.pageIndex))
}
function processJ(a, b, c, d) {
  var f, g, h, i, j, k, l, n, o, e = a + 1;
  for (d -= 1,
    f = d,
    g = 1 == b || -1 == b,
    h = 0,
    i = d; i < pageHolder.length; i++) {
    for (j = pageHolder[i].questions,
      g && (f = i),
      !h && j[a] && j[a].dataNode && (h = parseInt(j[a].dataNode._topic)),
      k = e; k < j.length; k++)
      l = j[k].dataNode._topic,
        (l == b || g) && (f = i),
        "1" != j[k].getAttribute("nhide") && (b > l || g ? (j[k].style.display = "none",
          JumpNotDisplayQ[l] = 1,
          progressArray[l] || (joinedTopic++,
            progressArray[l] = "jump"),
          clearAllOption(j[k])) : (relationNotDisplayQ[l] || relationItemNotDisplayQ[l] || (j[k].style.display = ""),
            "jump" == progressArray[l] && (joinedTopic--,
              progressArray[l] = !1),
            j[k].dataNode._hasjump && !c && clearAllOption(j[k])));
    for (k = 0; k < pageHolder[i].cuts.length; k++)
      n = pageHolder[i].cuts[k],
        l = n.getAttribute("qtopic"),
        l && (h && h >= l || e >= l || (b > l || g ? n.style.display = "none" : (o = n.getAttribute("topic"),
          relationNotDisplayQ[o] || (n.style.display = ""))));
    e = 0
  }
  1 == b && (joinedTopic = totalQ),
    showProgressBar()
}
function addClearHref(a) {
  if (!window.isKaoShi) {
    a.dataNode;
    var c = document.createElement("a");
    c.title = validate_info_submit_title2,
      c.className = "link-999",
      c.style.marginLeft = "25px",
      c.innerHTML = "[" + type_radio_clear + "]",
      c.href = "javascript:void(0);",
      a.hasClearHref = !0,
      a.divTitle.appendChild(c),
      a.clearHref = c,
      c.onclick = function () {
        clearAllOption(a),
          referTitle(a),
          jumpAny(!1, a)
      }
  }
}
function clearAllOption(a) {
  var c, d, e, f, g, h, i, j, b = !1;
  if (a.itemSel)
    b = !0,
      a.itemSel.selectedIndex = 0,
      displayRelationDropDown(a, a.dataNode);
  else if (a.divSlider && void 0 != a.divSlider.value)
    a.sliderImage.setValue(a.dataNode._minvalue, !0),
      a.divSlider.value = void 0;
  else if (a.itemTextarea)
    a.itemTextarea.value && (b = !0),
      a.itemTextarea.value = "";
  else if (a.uploadFrame)
    a.fileName && (b = !0),
      a.uploadmsg.innerHTML = "",
      a.fileName = !1;
  else if (a.dataNode && "check" == a.dataNode._type && a.dataNode.isSort) {
    if (c = a.getElementsByTagName("li"),
      !c)
      return !1;
    for (d = 0; d < c.length; d++)
      e = c[d].getElementsByTagName("span")[0],
        e && c[d].getElementsByTagName("input")[0].checked && (c[d].getElementsByTagName("input")[0].checked = !1,
          e.innerHTML = "",
          e.className = "sortnum")
  } else {
    if (f = a.itemInputs || a.itemLis || a.itemTrs,
      !f)
      return !1;
    if ("1" == a.getAttribute("qingjing"))
      return !1;
    for (a.hasClearHref = !1,
      a.clearHref && (a.clearHref.parentNode.removeChild(a.clearHref),
        a.clearHref = null),
      g = 0; g < f.length; g++)
      if (f[g].checked)
        b = !0,
          f[g].checked = !1,
          h = getPreviousNode(f[g]),
          h && "a" == h.tagName.toLowerCase() && (h.className = h.className.replace("jqChecked", ""));
      else if (0 == f[g].className.toLowerCase().indexOf("on"))
        b = !0,
          f[g].className = "off" + a.dataNode._mode;
      else if (f[g].parent && f[g].parent.holder)
        b = !0,
          f[g].parent.holder = 0;
      else if (f[g].divSlider && f[g].divSlider.value)
        b = !0,
          f[g].sliderImage.setValue(a.dataNode._minvalue, !0),
          f[g].divSlider.value = void 0;
      else if ("TEXTAREA" == f[g].tagName && "" != trim(f[g].value))
        b = !0,
          f[g].value = "";
      else if ("text" == f[g].type && "" != trim(f[g].value))
        b = !0,
          f[g].value = "";
      else if (i = f[g].itemInputs || f[g].itemLis)
        for (j = 0; j < i.length; j++)
          i[j].checked ? (b = !0,
            i[j].checked = !1,
            h = getPreviousNode(i[j]),
            h && "a" == h.tagName.toLowerCase() && (h.className = h.className.replace("jqChecked", ""))) : 0 == i[j].className.toLowerCase().indexOf("on") ? i[j].className = "off" + a.dataNode._mode : i[j].parent && i[j].parent.holder && (i[j].parent.holder = 0);
    a.holder && (a.holder = 0),
      b && (displayItemRelationRaidoCheck(a, a.dataNode),
        displayRelationRaidoCheck(a, a.dataNode))
  }
  return b
}
function itemMouseOver() {
  var b, c, d, a = this.parent.parent || this.parent;
  if (a.dataNode.isRate)
    for (b = this.parent.itemLis.length,
      c = "on",
      d = 0; b > d; d++)
      c = d < this.value ? "on" : "off",
        this.parent.itemLis[d].className = c + a.dataNode._mode
}
function itemMouseOut() {
  var b, c, d, e, a = this.parent.parent || this.parent;
  if (a.dataNode.isRate)
    for (b = this.parent.itemLis.length,
      c = "on",
      d = this.parent.holder || 0,
      e = 0; b > e; e++)
      c = d > e ? "on" : "off",
        this.parent.itemLis[e].className = c + a.dataNode._mode
}
function itemLiClick() {
  var c, a = this.parent.parent || this.parent, b = a.dataNode;
  if (("matrix" != b._type || CheckMax(this.parentNode.parentNode, this, !0)) && (updateProgressBar(b),
    b.isRate)) {
    for (this.parent.holder = this.value,
      c = 0; c < this.value; c++)
      this.parent.itemLis[c].className = "on" + b._mode;
    b._requir || a.hasClearHref || addClearHref(a),
      displayItemRelationRaidoCheck(a, b),
      displayRelationRaidoCheck(a, b),
      jump(a, this),
      0 == itempopUpindex && processSamecount(a, this)
  }
}
function set_data_fromServer(a) {
  var c, d, f, g, h, i, j, k, l, m, n, o, b = new Array;
  for (b = a.split("¤"),
    c = b[0],
    d = c.split("§"),
    hasTouPiao = "true" == d[0],
    useSelfTopic = "true" == d[1],
    f = 0,
    g = !0,
    h = 0,
    i = 1; i < b.length; i++)
    switch (j = new Object,
    k = b[i].split("§"),
    k[0]) {
      case "page":
        g ? g = !1 : f++,
          h = 0,
          "true" == k[2] ? pageHolder[f]._iszhenbie = !0 : "time" == k[2] && (pageHolder[f]._istimer = !0),
          pageHolder[f]._mintime = k[3] ? parseInt(k[3]) : "",
          pageHolder[f]._maxtime = k[4] ? parseInt(k[4]) : "";
        break;
      case "question":
        j._type = trim(k[0]),
          j._topic = trim(k[1]),
          j._height = trim(k[2]),
          j._maxword = trim(k[3]),
          j._requir = "true" == k[4] ? !0 : !1,
          j._norepeat = "true" == k[5] ? !0 : !1,
          j._hasjump = "true" == trim(k[6]) ? !0 : !1,
          j._anytimejumpto = trim(k[7]),
          j._verify = trim(k[8]),
          j._needOnly = "true" == k[9] ? !0 : !1,
          j._hasList = "true" == k[10] ? !0 : !1,
          j._listId = k[11] ? parseInt(k[11]) : -1,
          j._minword = k[12],
          pageHolder[f].questions[h].dataNode = j,
          h++;
        break;
      case "slider":
        j._type = trim(k[0]),
          j._topic = trim(k[1]),
          j._requir = "true" == k[2] ? !0 : !1,
          j._minvalue = trim(k[3]),
          j._maxvalue = trim(k[4]),
          j._hasjump = "true" == trim(k[5]) ? !0 : !1,
          j._anytimejumpto = trim(k[6]),
          pageHolder[f].questions[h].dataNode = j,
          h++;
        break;
      case "fileupload":
        j._type = trim(k[0]),
          j._topic = trim(k[1]),
          j._requir = "true" == k[2] ? !0 : !1,
          j._maxsize = trim(k[3]),
          j._ext = trim(k[4]),
          j._hasjump = "true" == trim(k[5]) ? !0 : !1,
          j._anytimejumpto = trim(k[6]),
          pageHolder[f].questions[h].dataNode = j,
          h++;
        break;
      case "gapfill":
        j._type = trim(k[0]),
          j._topic = trim(k[1]),
          j._requir = "true" == k[2] ? !0 : !1,
          j._gapcount = trim(k[3]),
          j._hasjump = "true" == trim(k[4]) ? !0 : !1,
          j._anytimejumpto = trim(k[5]),
          pageHolder[f].questions[h].dataNode = j,
          h++;
        break;
      case "sum":
        j._type = trim(k[0]),
          j._topic = trim(k[1]),
          j._requir = "true" == k[2] ? !0 : !1,
          j._total = parseInt(k[3]),
          j._hasjump = "true" == trim(k[4]) ? !0 : !1,
          j._anytimejumpto = trim(k[5]),
          j._referTopic = k[6],
          pageHolder[f].questions[h].dataNode = j,
          h++;
        break;
      case "radio":
      case "check":
      case "radio_down":
      case "matrix":
        for (j._type = trim(k[0]),
          j._topic = trim(k[1]),
          j._numperrow = trim(k[2]),
          j._hasvalue = "true" == k[3] ? !0 : !1,
          j._hasjump = "true" == k[4] ? !0 : !1,
          j._anytimejumpto = k[5],
          j._mode = trim(k[9]),
          "check" != k[0] ? (j._requir = "true" == k[6] ? !0 : !1,
            j.isSort = !1,
            j.isRate = isRadioRate(j._mode)) : (l = k[6].split(","),
              j._minValue = 0,
              j._maxValue = 0,
              j._requir = "true" == l[0] ? !0 : !1,
              "" != l[1] && (j._minValue = Number(l[1])),
              "" != l[2] && (j._maxValue = Number(l[2])),
              j.isSort = "" != j._mode && "0" != j._mode,
              j.isRate = !1),
          j._isTouPiao = "true" == k[7] ? !0 : !1,
          j._verify = trim(k[8]),
          j._referTopic = k[10],
          j._referedTopics = k[11],
          m = 12,
          j._select = new Array,
          n = m; n < k.length; n++)
          j._select[n - m] = new Object,
            o = k[n].split("〒"),
            j._select[n - m]._item_radio = "true" == o[0] ? !0 : !1,
            j._select[n - m]._item_value = trim(o[1]),
            j._select[n - m]._item_jump = trim(o[2]),
            j._select[n - m]._item_relation = trim(o[3]),
            j._select[n - m]._item_huchi = "true" == o[4],
            j._select[n - m]._item_huchi && (j.hasHuChi = !0),
            8 == o.length && (j._select[n - m]._item_shopunit = o[5],
              j._select[n - m]._item_limpur = o[6],
              j._select[n - m]._item_startpay = o[7]);
        pageHolder[f].questions[h].dataNode = j,
          h++
    }
}
function show_pre_page() {
  var b, c, d, e, f, g;
  if (cur_page > 0 && pageHolder[cur_page - 1].hasExceedTime)
    return popUpAlert("上一页填写超时，不能返回上一页"),
      void 0;
  for (showSubmitTable(!1),
    next_page.style.display = "",
    pageHolder[cur_page].style.display = "none",
    cur_page--,
    window.isKaoShi,
    b = cur_page; b >= 0 && pageHolder[b].skipPage; b--)
    cur_page--;
  for (b = cur_page; b >= 0; b--) {
    for (c = pageHolder[b].questions,
      d = !1,
      e = 0; e < c.length; e++)
      if (f = c[e],
        "none" != f.style.display) {
        d = !0;
        break
      }
    if (g = !1,
      !d && pageHolder[b].cuts && pageHolder[b].cuts.length > 0)
      for (e = 0; e < pageHolder[b].cuts.length; e++)
        if ("none" != pageHolder[b].cuts[e].style.display) {
          g = !0;
          break
        }
    if (d || g || !(cur_page > 0))
      break;
    cur_page--
  }
  0 == cur_page && pre_page && (pre_page.style.display = "none",
    pre_page.disabled = !0),
    showDesc(),
    pageHolder[cur_page].style.display = "",
    c = pageHolder[cur_page].questions,
    pageHolder[cur_page].scrollIntoView(),
    postHeight()
}
function checkDisalbed() {
  if (curdiv = null,
    !submit_button.disabled)
    return !1;
  if (divMinTime.innerHTML) {
    var a = divMinTime.innerHTML.replace(/<.+?>/gim, "");
    popUpAlert(a)
  }
  return !0
}
function dataenc(a) {
  var c, d, e, b = ktimes % 10;
  for (0 == b && (b = 1),
    c = [],
    d = 0; d < a.length; d++)
    e = a.charCodeAt(d) ^ b,
      c.push(String.fromCharCode(e));
  return c.join("")
}
function show_next_page(a) {
  if (next_page && (next_page.disabled = !0),
    curdiv = null,
    1 != pubNoCheck) {
    if (1 != a && !validate())
      return isPub && null == pubNoCheck ? (maxCheatTimes > 0 && (fireConfirm = !0),
        window.confirm("您填写的数据不符合要求，由于您是发布者，可以选择直接跳到下一页（此次填写的答卷将不能提交），是否确定？") ? (pubNoCheck = !0,
          document.getElementById("submittest_button").onclick = submit_button.onclick = function () {
            checkDisalbed() || popUpAlert("由于您选择了跳过了数据检查，所以此次填写的答卷无法提交！如果您需要提交答卷，请刷新此页面并再次填写问卷。")
          }
          ,
          to_next_page(),
          void 0) : (pubNoCheck = !1,
            next_page.disabled = !1,
            void 0)) : (next_page.disabled = !1,
              void 0)
  } else if (1 == pubNoCheck)
    return to_next_page(),
      void 0;
  needSubmitNotValid && "true" == isRunning && 1 != a ? submit(3) : pageHolder[cur_page]._iszhenbie && "true" == isRunning && 1 != a && !isAutoSubmit ? submit(3) : (to_next_page(),
    1 != a && allowSaveJoin && "true" == isRunning && guid && (saveNeedAlert = !1,
      submit(2))),
    window.zunxiangAutoClick && window.zunxiangAutoClick()
}
function to_next_page() {
  var a, c, d, f, g, h, i;
  for (0 == cur_page && nextPageAlertText && popUpAlert(nextPageAlertText),
    pre_page.style.display = displayPrevPage,
    pre_page.disabled = !1,
    pageHolder[cur_page].style.display = "none",
    cur_page++,
    next_page.disabled = !1,
    a = cur_page; a < pageHolder.length && pageHolder[a].skipPage; a++)
    cur_page++;
  for (window.isKaoShi,
    a = cur_page; a < pageHolder.length; a++) {
    for (c = pageHolder[a].questions,
      d = !1,
      f = 0; f < c.length; f++)
      if (g = c[f],
        "none" != g.style.display) {
        d = !0;
        break
      }
    if (h = !1,
      !d && pageHolder[a].cuts && pageHolder[a].cuts.length > 0)
      for (f = 0; f < pageHolder[a].cuts.length; f++)
        if ("none" != pageHolder[a].cuts[f].style.display) {
          h = !0;
          break
        }
    if (d || h || !(cur_page < pageHolder.length - 1))
      break;
    cur_page++
  }
  for (i = !0,
    a = cur_page + 1; a < pageHolder.length; a++)
    pageHolder[a].skipPage || (i = !1);
  cur_page >= pageHolder.length - 1 || i ? (next_page.style.display = "none",
    "1" != hasJoin && showSubmitTable(!0)) : cur_page < pageHolder.length - 1 && (next_page.style.display = ""),
    divMaxTime && (divMaxTime.style.display = "none"),
    showDesc(),
    window.divPromote && (divPromote.style.display = cur_page > 0 ? "none" : ""),
    pageHolder[cur_page].style.display = "",
    window.monitoringEmbeddingIframe && monitoringEmbeddingIframe(),
    pageHolder[cur_page].scrollIntoView(),
    showProgressBar(),
    processMinMax(),
    postHeight()
}
function showDesc() {
  if (window.divDec) {
    var a = document.getElementById(window.divDec);
    a && (a.style.display = cur_page > 0 ? "none" : "")
  }
}
function processError(a, b, c) {
  var d, e, f;
  havereturn || (havereturn = !0,
    d = "",
    e = encodeURIComponent(answer_send),
    e.length > 1800 ? d = c + "&submitdata=exceed" : (d = c,
      -1 == c.indexOf("submitdata=") && (d += "&submitdata=" + e),
      -1 == c.indexOf("useget=") && (d += "&useget=1"),
      -1 == c.indexOf("iframe=") && (d += "&iframe=1")),
    errorTimes++,
    1 != errorTimes || hasSendErrorMail || (d += "&nsd=1",
      hasSendErrorMail = !0),
    f = document.createElement("img"),
    f.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/submiterror/track.gif?APIVersion=0.6.0&activity=" + activityId + "&starttime=" + encodeURIComponent(starttime) + "&status=" + a + "&errortimes=" + errorTimes + "&ua=" + encodeURIComponent(navigator.userAgent) + "&answer=" + encodeURIComponent(answer_send) + "&submittype=" + b + "&url=" + encodeURIComponent(c),
    PDF_launch("/wjx/join/jqerror.aspx?" + d + "&status=" + encodeURIComponent(a) + "&et=" + errorTimes, 400, 120),
    refresh_validate(),
    submit_tip.style.display = "none",
    submit_div.style.display = "block"),
    prevsaveanswer = "",
    window.submitWithGet || (window.submitWithGet = 1),
    timeoutTimer && clearTimeout(timeoutTimer)
}
function submit(a) {
  var b, d, e, f, g, h, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
  if (2 == a || validate()) {
    if (1 == a) {
      if (window.useAliVerify) {
        if (!isCaptchaValid)
          return b = document.getElementById("captcha"),
            document.getElementById("captcha").style.display = "",
            b.hasInit || (b.hasInit = !0,
              1 == useAliVerify ? captchaOjb.init() : captchaOjb.init(nc_option)),
            !1
      } else if (tCode && "none" != tCode.style.display && ("" == submit_text.value || submit_text.value == validate_info_submit_title3)) {
        popUpAlert(validate_info_submit1);
        try {
          submit_text.focus(),
            submit_text.click()
        } catch (c) { }
        return !1
      }
      hasAutoSubmit = !0
    }
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
      g = "submittype=" + a + "&curID=" + activityId + "&t=" + (new Date).valueOf(),
      source && (g += "&source=" + encodeURIComponent(source)),
      window.udsid && (g += "&udsid=" + window.udsid),
      window.fromsour && (g += "&fromsour=" + window.fromsour),
      nvvv && (g += "&nvvv=1"),
      window.wxUserId && (g += "&wxUserId=" + window.wxUserId),
      window.cProvince && (g += "&cp=" + encodeURIComponent(cProvince.replace("'", "")) + "&cc=" + encodeURIComponent(cCity.replace("'", "")) + "&ci=" + escape(cIp),
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
      window.cpid && (g += "&cpid=" + cpid),
      2 == a && (g += "&lastpage=" + d + "&lastq=" + MaxTopic),
      3 == a && (g += "&zbp=" + (cur_page + 1),
        needSubmitNotValid && (g += "&nsnv=1")),
      hasJoin && 0 != a && (g += "&nfjoinid=" + nfjoinid),
      window.sojumpParm && (j = window.sojumpParm,
        window.hasEncode || (j = encodeURIComponent(j)),
        g += "&sojumpparm=" + j),
      window.parmsign && (g += "&parmsign=" + encodeURIComponent(parmsign)),
      window.qdataList && qdataList.length > 0 && (g += "&aqsj=" + encodeURIComponent(qdataList.join(""))),
      tCode && "none" != tCode.style.display && "" != submit_text.value && (g += "&validate_text=" + encodeURIComponent(submit_text.value)),
      window.useAliVerify && (g += "&nc_csessionid=" + encodeURIComponent(nc_csessionid) + "&nc_sig=" + encodeURIComponent(nc_sig) + "&nc_token=" + encodeURIComponent(nc_token) + "&nc_scene=" + nc_scene + "&validate_text=geet"),
      g += "&starttime=" + encodeURIComponent(starttime),
      guid && (g += "&emailguid=" + guid),
      window.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)),
      window.sjts && (g += "&sjts=" + sjts),
      window.sjsign && (g += "&sjsign=" + encodeURIComponent(sjsign)),
      window.FromSj && (g += "&fromsj=1"),
      window.sourcelink && window.outuser && (g += window.sourcelink,
        window.outsign && (g += "&outsign=" + encodeURIComponent(outsign))),
      g += "&ktimes=" + ktimes,
      window.mobileRnum && (g += "&m=" + window.mobileRnum),
      window.rndnum && (g += "&rn=" + encodeURIComponent(rndnum)),
      rName && (k = rName.replace("(", "（").replace(")", "）"),
        setCookie("jcn" + activityId, k, getExpDate(0, 0, 30), "/", "", null)),
      window.relts && (g += "&relts=" + relts),
      window.relusername && (g += "&relusername=" + encodeURIComponent(relusername)),
      window.relsign && (g += "&relsign=" + encodeURIComponent(relsign)),
      window.relrealname && (g += "&relrealname=" + encodeURIComponent(relrealname)),
      window.reldept && (g += "&reldept=" + encodeURIComponent(reldept)),
      window.relext && (g += "&relext=" + encodeURIComponent(relext)),
      Password && (g += "&psd=" + encodeURIComponent(Password)),
      PasswordExt && (g += "&pwdext=" + encodeURIComponent(PasswordExt)),
      hasMaxtime && (g += "&hmt=1"),
      window.amt && (g += "&amt=" + amt),
      g += "&hlv=" + hlv,
      sourceDetail && (g += "&sd=" + sourceDetail),
      imgVerify && (g += "&btuserinput=" + encodeURIComponent(submit_text.value),
        g += "&btcaptchaId=" + encodeURIComponent(imgVerify.captchaId),
        g += "&btinstanceId=" + encodeURIComponent(imgVerify.instanceId)),
      window.access_token && window.openid && (g += "&access_token=" + encodeURIComponent(access_token) + "&qqopenid=" + encodeURIComponent(openid)),
      window.initMaxSurveyTime && (g += "&mst=" + window.initMaxSurveyTime),
      l = window.alipayAccount || window.cAlipayAccount,
      l && (g += "&alac=" + encodeURIComponent(l)),
      shopHT.length > 0 && (m = document.getElementById("shopcart"),
        m && "none" != m.style.display && (g += "&ishop=1")),
      modata && setCookie("jcm" + activityId, modata, getExpDate(0, 0, 30), "/", "", null),
      window.jqnonce && (g += "&jqnonce=" + encodeURIComponent(window.jqnonce),
        n = dataenc(window.jqnonce),
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
      z = window.getMaxWidth || 1800,
      window.submitWithGet && o.length <= z && (x = !0),
      x ? (g += "&submitdata=" + o,
        g += "&useget=1",
        y = "get") : window.submitWithGet && (window.postIframe = 1),
      window.refDepartment && (g += "&rdept=" + encodeURIComponent(window.refDepartmentVal)),
      window.refUserId && (g += "&ruserid=" + encodeURIComponent(refUserIdVal)),
      window.deptId && window.corpId && (g += "&deptid=" + deptId + "&corpid=" + corpId),
      A = "/joinnew/processjq.ashx?" + g,
      f.open(y, A, !1),
      f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
      havereturn = !1,
      window.postIframe ? postWithIframe(A, a) : x ? 2 == errorTimes || window.getWithIframe ? GetWithIframe(A, a, g) : (1 == a && (timeoutTimer = setTimeout(function () {
        processError("ajaxget", a, g)
      }, 2e4)),
        f.send(null)) : (1 == a && (timeoutTimer = setTimeout(function () {
          processError("ajaxpost", a, g)
        }, 2e4)),
          f.send("submitdata=" + o))
  }
}
function postWithIframe(a, b, c) {
  var d, e;
  1 == b && (timeoutTimer = setTimeout(function () {
    processError(answer_send, "postiframe", b, c)
  }, 2e4)),
    d = document.createElement("div"),
    d.style.display = "none",
    d.innerHTML = "<iframe id='mainframe' name='mainframe' style='display:none;' > </iframe><form target='mainframe' id='frameform' action='' method='post' enctype='application/x-www-form-urlencoded'><input  value='' id='submitdata' name='submitdata' type='hidden'><input type='submit' value='提交' ></form>",
    document.body.appendChild(d),
    document.getElementById("submitdata").value = answer_send,
    e = document.getElementById("frameform"),
    e.action = a + "&iframe=1",
    e.submit()
}
function GetWithIframe(a, b, c) {
  var d, e, f;
  1 == b && (timeoutTimer = setTimeout(function () {
    processError(answer_send, "getiframe", b, c)
  }, 2e4)),
    d = document.createElement("div"),
    d.style.display = "none",
    e = a + "&iframe=1",
    d.innerHTML = "<iframe id='mainframe' name='mainframe'> </iframe>",
    document.body.appendChild(d),
    f = document.getElementById("mainframe"),
    f.src = e
}
function getExpDate(a, b, c) {
  var d = new Date;
  return "number" == typeof a && "number" == typeof b && "number" == typeof b ? (d.setDate(d.getDate() + parseInt(a)),
    d.setHours(d.getHours() + parseInt(b)),
    d.setMinutes(d.getMinutes() + parseInt(c)),
    d.toGMTString()) : void 0
}
function processRedirect(a) {
  var f, g, h, i, b = a[1], c = a[3] || "", d = a[2], e = a[4] || "";
  b && "?" != b[0] ? -1 == b.toLowerCase().indexOf("http://") && -1 == b.toLowerCase().indexOf("https://") && (b = "http://" + b) : b = window.location.href,
    f = !1,
    b.indexOf("{output}") > -1 && (window.sojumpParm ? b = b.replace("{output}", sojumpParm) : e && (b = b.replace("{output}", e)),
      f = !0),
    (window.sojumpParm || e) && (g = c.split(","),
      h = "sojumpindex=" + g[0],
      h = b.indexOf("?") > -1 ? "&" + h : "?" + h,
      g[1] && (h += "&totalvalue=" + g[1]),
      g[2] && (h += "&valuesign=" + encodeURIComponent(g[2])),
      -1 == b.toLowerCase().indexOf("sojumpparm=") && !f && window.sojumpParm && (h += "&sojumpparm=" + sojumpParm),
      -1 == b.toLowerCase().indexOf("pingzheng=") && !f && e && (h += "&pingzheng=" + e),
      b += h),
    i = 1e3,
    d && "不提示" != d && 0 == window.jiFenBao && (PromoteUser(d, 5e3, !0),
      i = 2e3);
  try {
    setCookie(activityId + "_save", "", getExpDate(-1, 0, 0), "/", "", null),
      maxCheatTimes > 0 && setCookie(activityId + "_" + "curCheatTime", 0, getExpDate(-1, 0, 0), "/", "", null)
  } catch (j) { }
  setTimeout(function () {
    location.replace(b)
  }, i)
}
function addtolog() {
  var b = document.createElement("img")
    , c = window.isVip ? 1 : 0
    , d = window.cqType || 0;
  b.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/activityfinish/track.gif?APIVersion=0.6.0&activity=" + activityId + "&source=0&weixin=0&vip=" + c + "&qtype=" + d
}
function addtoactivitystat() {
  var a = document.createElement("img");
  a.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/activitystat/track.gif?APIVersion=0.6.0&activity=" + activityId + "&type=rel"
}
function addtoForein() {
  if (window.curProvince && window.survey) {
    var a = document.createElement("img");
    window.LogStoreLocal ? 1 : 0,
      a.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/foreinvisit/track.gif?APIVersion=0.6.0&activity=" + activityId + "&jointimes=" + window.currJT + "&title=" + encodeURIComponent(document.title) + "&p=" + encodeURIComponent(curProvince) + "&c=" + encodeURIComponent(curCity) + "&ip=" + encodeURIComponent(curIp) + "&fh=" + (window.curFuHe || 0) + "&cr=" + (window.curCheckResult || 0)
  }
}
function addtoHistory() {
  var a, b;
  window.addtoHis && window.survey && (a = window.LogStoreLocal ? 1 : 0,
    b = document.createElement("img"),
    b.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/activityhistory/track.gif?APIVersion=0.6.0&activity=" + activityId + "&forein=" + (window.isForein || 0) + "&ip=" + encodeURIComponent(window.curIp || "") + "&test=" + a)
}
function afterSubmit(a, b) {
  var c, d, e, f, g, i, j, k, n, o, p, q, r, s, t;
  if (havereturn = !0,
    errorTimes = 0,
    document.getElementById("PDF_bg_chezchenz") && PDF_close(),
    clearTimeout(timeoutTimer),
    c = a.split("〒"),
    d = c[0],
    0 == b)
    14 == d ? (e = c[1],
      f = "/joinnew/previewanswer.aspx?activityid=" + activityId + "&sg=" + e + "&t=" + (new Date).valueOf(),
      window.open(f),
      setTimeout(function () {
        popUpAlert("您的答卷还没有提交，请不要忘记提交答卷！")
      }, 1e4)) : popUpAlert("请点击预览答卷按钮");
  else if (2 == b) {
    if (14 == d) {
      if (e = c[1],
        g = window.location.href.toLowerCase(),
        g = g.indexOf("?") > -1 ? g.indexOf("sg=") > -1 ? g.replace(/sg=([\w|\-]+)/g, "sg=" + e) : g + "&sg=" + e : g + "?sg=" + e,
        hrefSave && (getTop(hrefSave),
          spanSave || (spanSave = document.createElement("div"),
            divSaveText.appendChild(spanSave),
            spanSave.style.color = "#666666",
            spanSave.style.lineHeight = "14px",
            spanSave.style.width = "14px",
            divProgressImg ? divProgressImg.style.paddingLeft = "7px" : spanSave.style.paddingLeft = "15px"),
          i = new Date,
          j = i.getMinutes(),
          10 > j && (j = "0" + j),
          k = i.getHours(),
          10 > k && (k = "0" + k),
          spanSave.innerHTML = "答卷保存于<div id='saveData'>1</div><div id='divUnit'>秒</div>钟前",
          1 == langVer && (spanSave.innerHTML = "<div style='font-size:18px;'>&nbsp;&nbsp;Saved</div>"),
          totalSaveSec = 1,
          spanSave.style.display = "",
          submit_tip.style.display = "none",
          clearInterval(changeInterval),
          changeInterval = setInterval(function () {
            var a = document.getElementById("saveData");
            a && (totalSaveSec++,
              a.innerHTML = totalSaveSec,
              totalSaveSec > 60 && (a.innerHTML = parseInt(totalSaveSec / 60),
                document.getElementById("divUnit").innerHTML = "分"))
          }, 1e3)),
        window.Ischangeans || (clearInterval(saveInterval),
          saveInterval = setInterval(function () {
            submit(2)
          }, 6e4)),
        !window.saveGuid)
        try {
          setCookie(activityId + "_save", e, getExpDate(30, 0, 0), "/", "", null)
        } catch (m) { }
      return c[2] && (nfjoinid = c[2],
        hasJoin = "2"),
        c[3] && (starttime = c[3]),
        changeSave && (g = window.location.href,
          g += -1 == g.indexOf("?") ? "?csave=1" : "&csave=1",
          window.location = g),
        void 0
    }
  } else if (3 == b) {
    if (12 == d)
      return randomparm = c[1],
        PromoteUser("", 1, !0),
        to_next_page(),
        void 0;
    if (13 == d)
      return setCookie("join_" + activityId, "1", getExpDate(0, 0, 30), "/", "", null),
        n = c[1],
        o = c[2] || "0",
        g = "/wjx/join/complete.aspx?q=" + activityId + "&s=" + simple + "&joinid=" + n,
        window.sojumpParm && (g += "&sojumpparm=" + encodeURIComponent(sojumpParm)),
        guid && (g += "&guid=" + guid),
        "t" == promoteSource && (g += "&ps=" + promoteSource),
        g += "&v=" + o,
        window.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)),
        window.FromSj && (g += "&fromsj=1"),
        location.replace(g),
        void 0;
    if (11 == d)
      return processRedirect(c),
        void 0;
    if (5 == d)
      return popUpAlert(c[1]),
        submit_tip.innerHTML = c[1],
        void 0;
    if (c[2])
      return popUpAlert(c[2]),
        submit_tip.innerHTML = c[2],
        next_page && (next_page.disabled = !1),
        void 0
  } else {
    if (10 == d) {
      g = c[1],
        g += "&s=" + simple,
        "t" == promoteSource && (g += "&ps=" + promoteSource),
        qwidth && (g += "&width=" + qwidth),
        inviteid && (g += "&inviteid=" + inviteid),
        source && source.length < 20 && (g += "&source=" + encodeURIComponent(source)),
        guid && (g += "&guid=" + guid),
        window.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)),
        window.FromSj && (g += "&fromsj=1"),
        window.needJQJiang && (g += "&njqj=1"),
        window.HasJiFenBao && (g += "&hjfb=1"),
        startAge && (g += "&sa=" + encodeURIComponent(startAge)),
        endAge && (g += "&ea=" + encodeURIComponent(endAge)),
        window.refDepartment && (g += "&rdept=" + encodeURIComponent(window.refDepartmentVal)),
        window.refUserId && (g += "&ruserid=" + encodeURIComponent(window.refUserIdVal)),
        gender && (g += "&ge=" + gender),
        marriage && (g += "&ma=" + marriage),
        education && (g += "&edu=" + education),
        jpMatchId && (g += "&jpm=" + jpMatchId),
        window.sourcename && (g += "&souname=" + encodeURIComponent(sourcename)),
        window.sojumpParm && (g += "&sojumpparm=" + encodeURIComponent(sojumpParm)),
        shopHT.length > 0 && (p = document.getElementById("shopcart"),
          p && "none" != p.style.display && (g += "&ishop=1")),
        setCookie("join_" + activityId, "1", getExpDate(0, 0, 30), "/", "", null);
      try {
        setCookie(activityId + "_save", "", getExpDate(-1, 0, 0), "/", "", null),
          maxCheatTimes > 0 && setCookie(activityId + "_" + "curCheatTime", 0, getExpDate(-1, 0, 0), "/", "", null)
      } catch (m) { }
      if (isEdtData) {
        if (window.Ischangeans) {
          if (window.IsEditSave)
            return PromoteUser("成功保存数据！", 0, !0),
              window.IsEditSave = !1,
              void 0;
          g = "/resultquery.aspx?activity=" + activityId,
            window.isActivityRel && (g = "/user/joinrelquery.aspx?activity=" + activityId),
            setTimeout(function () {
              location.replace(g)
            }, 1500)
        } else
          PromoteUser("成功保存数据！", 0, !0);
        return
      }
      return q = "提交成功！",
        1 == langVer && (q = "Submitted successfully"),
        PromoteUser(q, 3e3, !0),
        addtolog(g),
        process360Jump(),
        setTimeout(function () {
          location.replace(g)
        }, 1500),
        void 0
    }
    if (11 == d)
      return addtolog(),
        process360Jump(),
        processRedirect(c),
        void 0;
    if (9 == d || 16 == d || 23 == d) {
      if (r = parseInt(c[1]),
        s = r + 1 + "",
        t = c[2] || "您提交的数据有误，请检查！",
        -1 == r)
        return popUpAlert(t),
          submit_tip.innerHTML = t,
          void 0;
      1 == pageHolder.length && pageHolder[0].questions[r] ? (popUpAlert(t),
        pageHolder[0].questions[r].scrollIntoView()) : questionsObject[s] ? (writeError(questionsObject[s], t, 3e3),
          popUpAlert(t),
          questionsObject[s].scrollIntoView()) : popUpAlert("您提交的数据有误，请检查！")
    } else if (7 == d) {
      if (popUpAlert(c[1]),
        !window.useAliVerify) {
        tCode.style.display = "",
          needAvoidCrack || (imgCode.style.display = "",
            imgCode.onclick = refresh_validate,
            imgCode.onclick()),
          submit_tip.style.display = "none",
          submit_div.style.display = "block";
        try {
          submit_text.focus(),
            submit_text.click(),
            imgVerify && imgVerify.onclick()
        } catch (u) { }
      }
    } else if (2 == d)
      popUpAlert(c[1]),
        window.submitWithGet = 1;
    else {
      if (17 == d)
        return popUpAlert("密码冲突！在您提交答卷之前，此密码已经被另外一个用户使用了，请重新更换密码！\r\n系统会自动保存您当前填写的答卷，请复制新的链接重新提交此份答卷！"),
          submit(2),
          void 0;
      if (4 == d)
        return popUpAlert(c[1]),
          changeSave = !0,
          submit(2),
          void 0;
      if (5 == d || 19 == d)
        return popUpAlert(c[1]),
          submit_tip.innerHTML = c[1],
          void 0;
      if (33 == d)
        return popUpAlert(c[1]),
          window.location.href = window.location.href,
          void 0;
      if (34 == d)
        return popUpAlert("密码冲突！在您提交答卷之前，此密码已经被另外一个用户使用了，请更换密码重新填写问卷！"),
          window.location.href = window.location.href,
          void 0;
      if (22 == d)
        return popUpAlert("提交有误，请输入验证码重新提交！"),
          needAvoidCrack || (tCode.style.display = "",
            imgCode.style.display = "",
            imgCode.onclick = refresh_validate,
            imgCode.onclick()),
          nvvv = 1,
          submit_tip.style.display = "none",
          submit_div.style.display = "block",
          void 0;
      popUpAlert(c[1] || c[0])
    }
  }
  refresh_validate(),
    submit_tip.style.display = "none",
    submit_div.style.display = "block"
}
function process360Jump() {
  if (window.oneneedcontcp) {
    document.getElementById("confirm_box2");
    var b = window.location.href;
    -1 == b.indexOf("cpid=") && (b += -1 != b.indexOf("?") ? "&cpid=" + window.cpid : "?cpid=" + window.cpid),
      confirm("评价成功，是否继续评价下一个评价者") && (window.location = b)
  }
}
function getAgeGenderLabel(a, b) {
  var c, d;
  if ("radio" == a._type && b.itemInputs) {
    for (c = 0; c < b.itemInputs.length; c++)
      if (b.itemInputs[c].checked) {
        d = getNextNode(b.itemInputs[c]),
          labelName = d.innerHTML,
          labelIndex = c;
        break
      }
  } else
    "radio_down" == a._type && (labelName = b.itemSel.options[b.itemSel.selectedIndex].text,
      labelIndex = b.itemSel.selectedIndex - 1)
}
function getRname(a, b) {
  var c, d, e, f, g, h, i, j, k, l, m;
  if (!(rName && hasMatchName || b.getAttribute("ceshi")))
    if ("question" == a._type)
      l = b.divTitle.innerHTML,
        (l.indexOf("姓名") > -1 || l.indexOf("名字") > -1) && (hasMatchName = !0),
        ("姓名" == a._verify || hasMatchName) && (a._height > 1 && l.length > 5 || (m = b.itemTextarea || b.itemInputs[0],
          m && (rName = m.value),
          rName || (hasMatchName = !1)));
    else if ("matrix" == a._type && "201" == a._mode) {
      for (c = b.getElementsByTagName("th"),
        d = 0; d < c.length; d++)
        if (c[d].innerHTML.indexOf("姓名") > -1 || c[d].innerHTML.indexOf("名字") > -1 || c[d].innerHTML.indexOf("姓") > -1 && c[d].innerHTML.indexOf("名") > -1) {
          e = c[d].parentNode.getElementsByTagName("textarea"),
            e[0] && e[0].value && (rName = e[0].value,
              hasMatchName = !0);
          break
        }
    } else if ("gapfill" == a._type && (f = b.innerHTML.indexOf("姓名"),
      g = b.innerHTML.indexOf("姓"),
      h = b.innerHTML.indexOf("名"),
      f > -1 || g > -1 && h > -1))
      for (-1 == f && (f = h),
        i = b.getElementsByTagName("input"),
        d = 0; d < i.length; d++)
        if (j = i[d].id,
          k = b.innerHTML.indexOf(j),
          k > f && i[d].value) {
          rName = i[d].value,
            hasMatchName = !0;
          break
        }
}
function getM(a, b) {
  var c, d, e, f, g;
  if (!modata)
    if (c = /^\d{11}$/,
      "matrix" == a._type && "201" == a._mode && b.itemTrs) {
      for (d = 0; d < b.itemTrs.length; d++)
        if (e = b.itemTrs[d].getAttribute("itemverify"),
          "手机" == e && (f = b.itemTrs[d].getElementsByTagName("textarea")[0],
            c.exec(f.value)))
          return modata = f.value,
            void 0
    } else
      "question" == a._type && (g = b.divTitle.innerHTML,
        ("手机" == a._verify || -1 != g.indexOf("手机") || -1 != g.indexOf("联系方式")) && (f = b.itemTextarea || b.itemInputs[0],
          f && c.exec(f.value) && (modata = f.value)))
}
function getAgeGender(a, b) {
  var c, d, e;
  if ("radio" == a._type || "radio_down" == a._type)
    if (c = b.divTitle.innerHTML,
      c.indexOf("年龄") > -1) {
      if (getAgeGenderLabel(a, b),
        !labelName)
        return;
      if (d = /[1-9][0-9]*/g,
        e = labelName.match(d),
        !e || 0 == e.length)
        return;
      if (e.length > 2)
        return;
      2 == e.length ? (startAge = e[0],
        endAge = e[1]) : 1 == e.length && (0 == labelIndex ? endAge = e[0] : startAge = e[0])
    } else if (c.indexOf("性别") > -1) {
      if (getAgeGenderLabel(a, b),
        !labelName)
        return;
      labelName.indexOf("男") > -1 ? gender = 1 : labelName.indexOf("女") > -1 && (gender = 2)
    } else if (c.indexOf("学历") > -1 || c.indexOf("教育程度") > -1) {
      if (getAgeGenderLabel(a, b),
        !labelName)
        return;
      labelName.indexOf("初中") > -1 ? education = 1 : labelName.indexOf("高中") > -1 || labelName.indexOf("中专") > -1 ? education = 2 : labelName.indexOf("大专") > -1 ? education = 3 : labelName.indexOf("本科") > -1 ? education = 4 : labelName.indexOf("硕士") > -1 ? education = 5 : labelName.indexOf("博士") > -1 && (education = 6)
    } else if (c.indexOf("婚姻") > -1) {
      if (getAgeGenderLabel(a, b),
        !labelName)
        return;
      labelName.indexOf("已婚") > -1 ? marriage = 1 : labelName.indexOf("未婚") > -1 ? marriage = 2 : labelName.indexOf("离婚") > -1 ? marriage = 3 : labelName.indexOf("再婚") > -1 && (marriage = 4)
    }
}
function getRefUsername(a, b) {
  var c, d, e;
  if (void 0 != refUsername && !b.getAttribute("ceshi")) {
    if ("question" != a._type)
      return "matrix" == a._type && "201" == a._mode && (c = refUsername - 1e4 * a._topic - 1,
        d = b.getElementsByTagName("textarea"),
        d[c] && (refUsernameVal = d[c].value)),
        void 0;
    e = b.itemTextarea || b.itemInputs[0],
      e && (refUsernameVal = e.value)
  }
}
function getRefUserId(a, b) {
  var c, d, e;
  if (void 0 != refUserId && !b.getAttribute("ceshi")) {
    if ("question" != a._type)
      return "matrix" == a._type && "201" == a._mode && (c = refUserId - 1e4 * a._topic - 1,
        d = b.getElementsByTagName("textarea"),
        d[c] && (refUserIdVal = d[c].value)),
        void 0;
    e = b.itemTextarea || b.itemInputs[0],
      e && (refUserIdVal = e.value)
  }
}
function getRefDepartment(a, b) {
  var c, d, e, f, g, h, i;
  if (void 0 != refDepartment && !b.getAttribute("ceshi"))
    if ("question" == a._type)
      i = b.itemTextarea || b.itemInputs[0],
        i && (refDepartmentVal = i.value);
    else if ("matrix" == a._type && "201" == a._mode)
      c = refDepartment - 1e4 * a._topic - 1,
        d = b.getElementsByTagName("textarea"),
        d[c] && (refDepartmentVal = d[c].value);
    else if ("radio" == a._type) {
      for (e = 0; e < b.itemInputs.length; e++)
        if (b.itemInputs[e].checked) {
          f = getNextNode(b.itemInputs[e]),
            g = getInnerText(f),
            refDepartmentVal = g;
          break
        }
    } else
      "radio_down" == a._type && (h = b.getElementsByTagName("select"),
        h && (refDepartmentVal = h[0].options[h[0].selectedIndex].text))
}
function checkJpMatch(a) {
  var b, c, d, e, f, g, h, i;
  if (!a.hasCheck) {
    if (a.hasCheck = !0,
      b = getInnerText(a.divTitle),
      "question" == a.dataNode._type && quarray)
      for (c = 0; c < quarray.length; c++)
        if (b.indexOf(quarray[c]) > -1) {
          d = document.createElement("img"),
            d.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/activitystat/track.gif?APIVersion=0.6.0&activity=" + activityId + "&q=" + a.dataNode._topic + "&type=npl&jointimes=" + (window.currJT || 0),
            quResult.push(a);
          break
        }
    if (e = matchJp(b),
      e && -1 == jpmarr.indexOf(e.id) && jpmarr.push(e),
      f = a.dataNode,
      ("radio" == f._type || "check" == f._type) && a.itemInputs)
      for (g = 0; g < a.itemInputs.length; g++)
        h = getNextNode(a.itemInputs[g]),
          i = getInnerText(h),
          e = matchJp(i),
          e && -1 == jpmarr.indexOf(e.id) && jpmarr.push(e)
  }
}
function getInnerText(a) {
  if (!a)
    return "";
  var b = "string" == typeof a.textContent ? a.textContent : a.innerText;
  return b || ""
}
function checkTitleDescMatch() {
  var c, a = document.title || "", b = "";
  window.divDec && (b = getInnerText(document.getElementById(divDec))),
    c = matchJp(a + b),
    c && -1 == jpmarr.indexOf(c.id) && jpmarr.push(c)
}
function matchJp(a) {
  var b, c, d, e, f, g, h;
  if (keywordarray) {
    if (!keywordObj)
      for (keywordObj = new Array,
        b = 0; b < keywordarray.length; b++)
        c = keywordarray[b].split("§"),
          d = new Object,
          e = c[0],
          parseInt(e) == e && (f = c[1].split(","),
            0 != f.length && (d.id = e,
              d.keylist = f,
              d.priority = c[2] || 0,
              keywordObj.push(d)));
    for (b = 0; b < keywordObj.length; b++)
      for (f = keywordObj[b].keylist,
        g = 0; g < f.length; g++)
        if (h = f[g],
          a && h && a.indexOf(h) > -1)
          return jpmObj[keywordObj[b].id] = h,
            keywordObj[b];
    return 0
  }
}
function getKsAnswer(a) {
  return a ? (a = a.dbc2sbc(),
    a = a.replace(/\</g, "＜").replace(/\>/g, "＞").replace(/\&/g, "＆").replace(/\!/g, "！").replace(/\^/g, "＾").replace(/\$/g, "＄").replace(/\}/g, "｝")) : ""
}
function sent_to_answer(a) {
  var d, e, f, g, h, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, b = new Array, c = 0;
  try {
    if (1 == a)
      for (d = 0; d < quResult.length; d++)
        e = quResult[d].itemTextarea,
          f = trim(e.value),
          !f || f.length < 2 || (g = document.createElement("img"),
            h = getInnerText(quResult[d].divTitle),
            g.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/activitynlp/track.gif?APIVersion=0.6.0&activity=" + activityId + "&title=" + encodeURIComponent(document.title) + "&qtitle=" + encodeURIComponent(h) + "&q=" + quResult[d].dataNode._topic + "&text=" + encodeURIComponent(f) + "&jointimes=" + (window.currJT || 0))
  } catch (i) { }
  for (j = new Object,
    k = 1,
    l = 0; l < pageHolder.length; l++)
    for (m = pageHolder[l].questions,
      pageHolder[l]._maxtime > 0,
      d = 0; d < m.length; d++) {
      if (o = m[d].dataNode,
        p = "none" == m[d].style.display.toLowerCase() || m[d].dataNode._referTopic && !m[d].displayContent && !window.cepingCandidate || pageHolder[l].skipPage,
        m[d].isCepingQ && (p = !1),
        q = new Object,
        q._topic = o._topic,
        q._value = "",
        b[c++] = q,
        1 == a)
        try {
          getAgeGender(o, m[d]),
            window.refUsername ? 1e4 * q._topic == refUsername - refUsername % 1e4 && (getRefUsername(o, m[d]),
              rName = refUsernameVal) : (getRname(o, m[d]),
                rName.length > 30 && (rName = "")),
            window.refUserId && 1e4 * q._topic == refUserId - refUserId % 1e4 && getRefUserId(o, m[d]),
            window.refDepartment && 1e4 * q._topic == refDepartment - refDepartment % 1e4 && getRefDepartment(o, m[d]),
            getM(o, m[d])
        } catch (i) { }
      switch (window.isKaoShi && "1" != m[d].getAttribute("nc") && (j[o._topic] = k,
        k++),
      o._type) {
        case "question":
          if (p) {
            q._value = "(跳过)",
              "1" == m[d].getAttribute("hrq") && (q._value = "Ⅳ");
            continue
          }
          r = m[d].itemTextarea || m[d].itemInputs[0],
            f = r.value || "",
            f && r.lnglat && (f = f + "[" + r.lnglat + "]"),
            "1" == m[d].getAttribute("ceshi") && (f = getKsAnswer(f)),
            q._value = replace_specialChar(f);
          break;
        case "gapfill":
          if (p && "1" == m[d].getAttribute("hrq")) {
            q._value = "Ⅳ";
            continue
          }
          for (s = m[d].gapFills,
            t = "1" == m[d].getAttribute("ceshi"),
            u = 0; u < s.length; u++)
            u > 0 && (q._value += spChars[2]),
              p ? q._value += "(跳过)" : (f = trim(s[u].value.substring(0, 3e3)),
                f && s[u].lnglat && (f = f + "[" + s[u].lnglat + "]"),
                t && (f = getKsAnswer(f)),
                q._value += replace_specialChar(f));
          break;
        case "slider":
          if (v = m[d].divSlider.value,
            p) {
            q._value = "(跳过)";
            continue
          }
          q._value = void 0 == v ? "" : v;
          break;
        case "fileupload":
          if (w = m[d].fileName,
            p) {
            q._value = "(跳过)";
            continue
          }
          q._value = w || "";
          break;
        case "sum":
          for (x = m[d].itemInputs,
            lb = x.length,
            u = 0; lb > u; u++)
            y = x[u],
              z = 0 == m[d].relSum ? trim(y.value) || "0" : trim(y.value),
              "none" == m[d].itemTrs[u].style.display && (z = "Ⅳ"),
              u > 0 && (q._value += spChars[2]),
              A = m[d].itemTrs[u].getAttribute("rowid"),
              A && (q._value += A + spChars[4]),
              q._value += z;
          if (p)
            for (B = 0; lb > B;)
              0 == B ? q._value = "(跳过)" : q._value += spChars[2] + "(跳过)",
                B++;
          break;
        case "radio":
        case "check":
          if (o.isSort) {
            for (C = new Array,
              u = 0; u < m[d].itemInputs.length; u++)
              "checkbox" == m[d].itemInputs[u].type && (D = m[d].itemInputs[u].parentNode,
                E = D.getElementsByTagName("span")[0].innerHTML,
                "none" == D.parentNode.style.display && (E = ""),
                F = new Object,
                F.sIndex = E,
                G = m[d].itemInputs[u].value,
                p ? G = "-3" : E || (G = "-2"),
                F.val = G,
                m[d].itemInputs[u].checked && m[d].itemInputs[u].itemText && (H = m[d].itemInputs[u].itemText.value,
                  H == defaultOtherText && (H = ""),
                  F.val += spChars[2] + replace_specialChar(trim(H.substring(0, 3e3)))),
                F.sIndex || (F.sIndex = 1e4),
                C.push(F));
            for (C.sort(function (a, b) {
              return a.sIndex - b.sIndex
            }),
              I = 0; I < C.length; I++)
              I > 0 && (q._value += ","),
                q._value += C[I].val;
            continue
          }
          if (p) {
            q._value = "-3",
              "1" == m[d].getAttribute("hrq") && (q._value = "-4");
            continue
          }
          if (J = m[d].itemInputs || m[d].itemLis,
            m[d].isShop) {
            for (K = !1,
              u = 0; u < J.length; u++)
              G = parseInt(J[u].value),
                G > 0 && (q._value && (q._value += spChars[3]),
                  q._value += u + 1 + "",
                  q._value += spChars[2] + G,
                  K = !0);
            K || (q._value = "-2");
            continue
          }
          for (L = -1,
            M = 0,
            u = 0; u < J.length; u++)
            J[u].className.toLowerCase().indexOf("on") > -1 && (L = u),
              N = J[u].parentNode && "none" == J[u].parentNode.style.display,
              !N && J[u].checked && (M++,
                q._value ? q._value += spChars[3] + J[u].value : q._value = J[u].value + "",
                J[u].itemText && (H = J[u].itemText.value,
                  H == defaultOtherText && (H = ""),
                  q._value += spChars[2] + replace_specialChar(trim(H.substring(0, 3e3)))));
          L > -1 ? q._value = J[L].value + "" : M > 0 || (q._value = "-2");
          break;
        case "radio_down":
          if (p) {
            q._value = "-3";
            continue
          }
          q._value = m[d].itemSel.value;
          break;
        case "matrix":
          for (O = m[d].itemTrs,
            P = o._mode,
            lb = O.length,
            Q = 0,
            S = 0,
            T = 0,
            U = new Array,
            V = !1,
            u = 0; u < O.length; u++)
            if (W = O[u].getAttribute("rindex"),
              0 == W && "true" == O[u].getAttribute("randomrow") && (V = !0),
              X = new Object,
              X.rIndex = parseInt(W),
              Y = "201" != P && "202" != P && "301" != P && "302" != P && "303" != P,
              "none" == O[u].style.display && Y)
              Z = "-4",
                q._value ? q._value += "," + Z : q._value = Z,
                X.val = Z;
            else if (J = O[u].itemInputs || O[u].itemLis || O[u].divSlider || O[u].itemSels) {
              if (Q = J.length,
                L = -1,
                $ = "",
                "201" != P && "202" != P) {
                for (B = 0; B < J.length; B++)
                  J[B].className.toLowerCase().indexOf("on") > -1 && (L = B,
                    $ = J[B].value),
                    J[B].checked ? (L = B,
                      $ ? $ += ";" + J[B].value : $ = J[B].value,
                      ("103" == P || "102" == P || "101" == P) && (_ = J[B].getAttribute("needfill"),
                        _ && (ab = J[B].fillvalue || J[B].getAttribute("fillvalue") || "",
                          ab == defaultOtherText && (ab = ""),
                          ab = replace_specialChar(ab).replace(/;/g, "；").replace(/,/g, "，"),
                          $ += spChars[2] + ab))) : ("TEXTAREA" == J[B].tagName || "SELECT" == J[B].tagName) && (L = B,
                            ab = trim(J[B].value),
                            "none" == O[u].style.display && (ab = "Ⅳ"),
                            B > 0 && ($ += spChars[3]),
                            ab ? ("302" == P && (ab && J[B].lnglat && (ab = ab + "[" + J[B].lnglat + "]"),
                              ab = replace_specialChar(ab)),
                              $ += ab) : $ += "303" == P ? "-2" : "(空)");
                L > -1 ? (q._value ? q._value += "301" == P || "302" == P || "303" == P ? spChars[2] + $ : "," + $ : q._value = $,
                  X.val = $) : (q._value ? q._value += ",-2" : q._value = "-2",
                    X.val = "-2")
              } else
                "201" == P ? (G = trim(J[0].value.substring(0, 3e3)),
                  "none" == O[u].style.display && (G = "Ⅳ"),
                  G && J[0].lnglat && (G = G + "[" + J[0].lnglat + "]"),
                  S > 0 ? q._value += spChars[2] + replace_specialChar(G) : q._value = replace_specialChar(G),
                  X.val = replace_specialChar(G)) : "202" == P && (bb = void 0 == O[u].divSlider.value ? "" : O[u].divSlider.value,
                    "none" == O[u].style.display && (bb = "Ⅳ"),
                    S > 0 ? q._value += spChars[2] + bb : q._value = bb,
                    X.val = bb);
              U.push(X),
                S++
            } else
              lb -= 1,
                T = 1;
          if (p) {
            for (B = 0,
              q._value = ""; lb > B;) {
              if ("201" == P || "202" == P)
                0 == B ? q._value = "(跳过)" : q._value += spChars[2] + "(跳过)";
              else if ("301" == P || "302" == P || "303" == P)
                for (B > 0 && (q._value += spChars[2]),
                  cb = 0; Q > cb; cb++)
                  cb > 0 && (q._value += spChars[3]),
                    q._value += "303" == P ? "-3" : "(跳过)";
              else
                0 == B ? q._value = "-3" : q._value += ",-3";
              B++
            }
            continue
          }
          for (U.sort(function (a, b) {
            return a.rIndex - b.rIndex
          }),
            db = spChars[2],
            "201" != P && "202" != P && "301" != P && "302" != P && "303" != P && (db = ","),
            eb = "",
            fb = 0; fb < U.length; fb++)
            fb > 0 && (eb += db),
              gb = U[fb].rIndex,
              parseInt(gb) == gb && (W = parseInt(gb) + 1,
                eb += W + spChars[4]),
              eb += U[fb].val;
          q._value = eb
      }
    }
  for (b.sort(function (a, b) {
    return a._topic - b._topic
  }),
    hb = "",
    d = 0; d < b.length; d++)
    d > 0 && (hb += spChars[1]),
      hb += b[d]._topic,
      hb += spChars[0],
      hb += b[d]._value;
  try {
    if (window.isKaoShi && j && window.localStorage && window.JSON) {
      if (ib = localStorage.getItem("sortactivity"),
        ib ? ib += "," + activityId : ib = activityId,
        ib += "",
        jb = ib.split(","),
        kb = 2,
        jb.length > kb) {
        for (lb = jb.length,
          d = 0; lb - kb > d; d++)
          mb = jb[0],
            jb.splice(0, 1),
            localStorage.removeItem("sortorder_" + mb);
        ib = jb.join(",")
      }
      localStorage.setItem("sortactivity", ib),
        nb = "sortorder_" + activityId,
        ob = JSON.stringify(j),
        localStorage.setItem(nb, ob)
    }
  } catch (i) { }
  return hb
}
function validate() {
  var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, S, T, U, V, a = !0;
  if (needSubmitNotValid = !1,
    b = pageHolder[cur_page].questions,
    hlv = "1",
    c = pageHolder[cur_page].hasExceedTime,
    firstError = null,
    firstMatrixError = null,
    curMatrixError = null,
    d = document.getElementById("divNA"),
    e = d.getElementsByTagName("input"),
    e[0].checked || e[1].checked)
    return popUpAlert("系统检测到非法填写问卷"),
      window.location.href = window.location.href,
      void 0;
  if (hasPeiEFull)
    return popUpAlert(peiemsg),
      !1;
  for (f = 0; f < b.length; f++)
    if (g = b[f].dataNode,
      h = g._hasjump,
      verifyMsg = "",
      i = "none" == b[f].style.display.toLowerCase() || pageHolder[cur_page].skipPage,
      b[f].removeError && b[f].removeError(),
      !(i || b[f].dataNode._referTopic && !b[f].displayContent && !window.cepingCandidate || c))
      switch (g._type) {
        case "question":
          if (j = b[f].itemTextarea || b[f].itemInputs[0],
            k = j.value || "",
            g._requir && "" == trim(k) && (a = writeError(b[f], validate_info_q1, 3e3)),
            !b[f].needsms || !k || b[f].issmsvalid || window.nfjoinid && "2" != hasJoin || (a = writeError(b[f], "提示：您的手机号码没有通过验证，请先验证", 3e3)),
            k.length - 3e3 > 0 && (l = "您输入的字数超过了3000，请修改！",
              1 == langVer && (l = "Please limit to 3000 characters."),
              a = writeError(b[f], l, 3e3)),
            m = g._verify,
            "密码" == m && (j.needCheckConfirm = !0,
              n = verifydata(j, m, g),
              "" != n && (a = writeError(b[f], n, 3e3))),
            o = b[f].getAttribute("issample"),
            p = !0,
            o && "t" != promoteSource && (p = !1),
            p && (k && (n = verifyMinMax(j, m, g._minword, g._maxword),
              "" != n && (a = writeError(b[f], n, 3e3))),
              "" != k && m && "0" != m && (n = verifydata(j, m, g),
                "" != n && (a = writeError(b[f], n, 3e3)))),
            a && "" != trim(k) && "true" == isRunning && g._needOnly)
            if (0 == j.isOnly)
              a = writeError(b[f], validate_only, 3e3);
            else if (1 != j.isOnly && "地图" != g._verify && !b[f].needsms)
              return a = writeError(b[f], validate_error, 3e3),
                j.focus(),
                a;
          break;
        case "gapfill":
          for (q = b[f].gapFills,
            r = 0; r < q.length; r++)
            if (k = q[r].value || "",
              "" == trim(k)) {
              if (g._requir && "0" != q[r].getAttribute("isrequir")) {
                b[f].errorControl = q[r],
                  a = writeError(b[f], validate_info_q1, 3e3);
                break
              }
            } else {
              if (s = 0,
                s = validateMatrix(g, q[r], q[r])) {
                b[f].errorControl = q[r],
                  a = writeError(b[f], verifyMsg, 3e3);
                break
              }
              if (q[r].getAttribute("needonly"))
                if (0 == q[r].isOnly)
                  b[f].errorControl = q[r],
                    a = writeError(b[f], validate_only, 3e3);
                else if (1 != q[r].isOnly && "地图" != q[r].getAttribute("itemverify")) {
                  b[f].errorControl = q[r],
                    a = writeError(b[f], validate_error, 3e3);
                  break
                }
            }
          break;
        case "slider":
          t = b[f].divSlider.value,
            g._requir && void 0 == t && (a = writeError(b[f], validate_info_wd1, 3e3));
          break;
        case "fileupload":
          g._requir && !b[f].fileName && (a = writeError(b[f], validate_info_f1, 3e3));
          break;
        case "sum":
          if (u = b[f].sumLeft,
            0 == u)
            for (v = b[f].getElementsByTagName("input"),
              u = b[f].dataNode._total,
              w = 0; w < v.length; w++)
              x = v[w],
                y = b[f].itemTrs[w],
                "none" != y.style.display && (u -= parseInt(x.value));
          g._requir ? 0 != u && (a = !1,
            u || (u = 100),
            firstError || (firstError = b[f]),
            n = "<span style='color:red;'>" + sum_warn + "</span>",
            b[f].relSum && (b[f].relSum.innerHTML = sum_total + "<b>" + g._total + "</b>" + sum_left + "<span style='color:red;font-bold:true;'>" + (g._total - u) + "</span>，" + n)) : void 0 != u && 0 != u && (a = !1,
              firstError || (firstError = b[f]),
              n = "<span style='color:red;'>" + sum_warn + "</span>",
              b[f].relSum && (b[f].relSum.innerHTML = sum_total + "<b>" + g._total + "</b>" + sum_left + "<span style='color:red;font-bold:true;'>" + (g._total - u) + "</span>，" + n));
          break;
        case "radio":
        case "check":
          if (b[f].itemSel) {
            z = b[f].itemSel,
              A = z.options,
              0 == A.length && g._requir ? a = writeError(b[f], validate_info_o1, 3e3) : A.length > 0 && (0 != g._minValue && g._minValue != g._select.length || A.length == g._select.length ? g._maxValue > 0 && A.length > g._maxValue ? (B = validate_info + validate_info_check1 + g._maxValue + validate_info_check2,
                0 == langVer && (B += ",您多选择了" + (A.length - g._maxValue) + "项"),
                a = writeError(b[f], B, 3e3)) : g._minValue > 0 && A.length < g._minValue && (B = validate_info + validate_info_check1 + g._minValue + validate_info_check2,
                  0 == langVer && (B += ",您少选择了" + (g._minValue - A.length) + "项"),
                  a = writeError(b[f], B, 3e3)) : a = writeError(b[f], validate_info + validate_info_check3, 3e3));
            continue
          }
          for (A = b[f].itemInputs || b[f].itemLis,
            C = -1,
            D = 0,
            E = -1,
            r = 0; r < A.length; r++)
            b[f].isShop ? A[r].value && A[r].value - 0 > 0 && (D++,
              E = r) : A[r].className.toLowerCase().indexOf("on") > -1 && (C = r,
                E = r),
              A[r].checked && (D++,
                E = r,
                "radio" == g._type && h && g._select[A[E].value - 1] && -1 == g._select[A[E].value - 1]._item_jump && (needSubmitNotValid = !0),
                A[r].req && isTextBoxEmpty(A[r].itemText.value) && (a = writeError(b[f], validate_textbox, 3e3)));
          C > -1 ? hasChoice = !0 : D > 0 ? (hasChoice = !0,
            g._maxValue > 0 && D > g._maxValue ? (B = validate_info + validate_info_check4 + g._maxValue + type_check_limit5,
              0 == langVer && (B += ",您多选择了" + (D - g._maxValue) + "项"),
              a = writeError(b[f], B, 3e3)) : g._minValue > 0 && D < g._minValue && (B = validate_info + validate_info_check5 + g._minValue + type_check_limit5,
                0 == langVer && (B += ",您少选择了" + (g._minValue - D) + "项"),
                b[f].isShop && (B = B.replace(/项/g, "种商品")),
                1 == D && g._select[E] && g._select[E]._item_huchi ? B = "" : a = writeError(b[f], B, 3e3))) : g._requir && (F = validate_info_c1,
                  "1" == b[f].getAttribute("qingjing") && (F = "此题情景配额已满"),
                  a = writeError(b[f], F, 3e3));
          break;
        case "radio_down":
          g._requir && 0 == b[f].itemSel.selectedIndex && (a = writeError(b[f], validate_info_c1, 3e3));
          break;
        case "matrix":
          for (G = b[f].itemTrs,
            H = g._mode,
            len = G.length,
            I = 0,
            J = 0,
            s = 0,
            r = 0; r < G.length; r++)
            if ("none" != G[r].style.display)
              if (A = G[r].itemInputs || G[r].itemLis || G[r].divSlider || G[r].itemSels) {
                if (C = -1,
                  D = 0,
                  "201" != H && "202" != H) {
                  for (L = 0; L < A.length; L++)
                    if (A[L].className.toLowerCase().indexOf("on") > -1)
                      C = L;
                    else if (A[L].checked) {
                      if (C = L,
                        D++,
                        ("103" == H || "102" == H || "101" == H) && (M = A[L].getAttribute("needfill"),
                          N = A[L].getAttribute("req"),
                          M && N && (O = A[L].fillvalue || A[L].getAttribute("fillvalue") || "",
                            isTextBoxEmpty(O)))) {
                        verifyMsg = validate_textbox,
                          s = 1,
                          firstMatrixError || (firstMatrixError = b[f].itemTrs[r]),
                          showMatrixFill(A[L], 1);
                        break
                      }
                    } else if ("TEXTAREA" == A[L].tagName || "SELECT" == A[L].tagName)
                      if (P = trim(A[L].value),
                        C = L,
                        P)
                        "301" == H ? (P = DBC2SBC(A[L]),
                          "数字" == g._verify && parseInt(P) != P ? J = 1 : "小数" != g._verify || /^(\-)?\d+(\.\d+)?$/.exec(P) ? (g._minvalue && parseInt(P) - parseInt(g._minvalue) < 0 || g._maxvalue && parseInt(P) - parseInt(g._maxvalue) > 0) && (J = 2) : J = 1,
                          J && (K || (K = A[L]),
                            firstMatrixError || (firstMatrixError = b[f].itemTrs[r]))) : "302" == H && (s || (s = validateMatrix(g, A[L], A[L])),
                              s && (K || (K = A[L]),
                                firstMatrixError || (firstMatrixError = b[f].itemTrs[r])));
                      else if (Q = A[L].parentNode,
                        "303" == H) {
                        if ("none" != Q.style.display) {
                          C = -1;
                          break
                        }
                      } else if ("none" != Q.style.display) {
                        if (C = -1,
                          "301" == H && g._requir) {
                          J = 1,
                            K || (K = A[L]),
                            firstMatrixError || (firstMatrixError = b[f].itemTrs[r]);
                          break
                        }
                        if ("302" == H)
                          break
                      }
                  "102" == H && C > -1 && (g._maxvalue > 0 && D > g._maxvalue ? (B = validate_info + validate_info_check4 + g._maxvalue + type_check_limit5,
                    0 == langVer && (B += ",您多选择了" + (D - g._maxvalue) + "项"),
                    verifyMsg = B,
                    s = 1,
                    firstMatrixError || (firstMatrixError = b[f].itemTrs[r])) : g._minvalue > 0 && D < g._minvalue && (B = validate_info + validate_info_check5 + g._minvalue + type_check_limit5,
                      0 == langVer && (B += ",您少选择了" + (g._minvalue - D) + "项"),
                      verifyMsg = B,
                      s = 1,
                      firstMatrixError || (firstMatrixError = b[f].itemTrs[r])))
                } else
                  "201" == H ? (s || (s = validateMatrix(g, G[r], A[0])),
                    s && (K || (K = A[0]),
                      firstMatrixError || (firstMatrixError = b[f].itemTrs[r])),
                    G[r].getAttribute("needonly") && (0 == G[r].isOnly ? (K || (K = A[0]),
                      firstMatrixError || (firstMatrixError = b[f].itemTrs[r]),
                      verifyMsg = validate_only,
                      s = 1) : 1 != G[r].isOnly && "地图" != G[r].getAttribute("itemverify") && (K || (K = A[0]),
                        firstMatrixError || (firstMatrixError = b[f].itemTrs[r]),
                        verifyMsg = validate_error,
                        s = 1)),
                    "" != trim(A[0].value) ? C = 0 : "0" == G[r].getAttribute("isrequir") && (C = 0)) : "202" == H && void 0 != G[r].divSlider.value && (C = 0);
                if (C > -1)
                  I++;
                else if (g._requir)
                  break
              } else
                len -= 1;
            else
              len -= 1;
          "201" != H && "302" != H || !s || (K && (b[f].errorControl = K),
            a = writeError(b[f], verifyMsg, 3e3),
            firstMatrixError && firstMatrixError.onclick()),
            g._requir && len > I && (a = writeError(b[f], validate_info + validate_info_matrix2 + validate_info_matrix1 + (I + 1) + validate_info_matrix3, 3e3),
              b[f].itemTrs[r] && !firstMatrixError && (firstMatrixError = b[f].itemTrs[r],
                S = b[f].getAttribute("DaoZhi"),
                S || b[f].itemTrs[r].onclick())),
            "102" != H && "103" != H && "101" != H || !s || (K && (b[f].errorControl = K),
              a = writeError(b[f], verifyMsg, 3e3),
              firstMatrixError && firstMatrixError.onclick()),
            "301" == H && J && (T = "",
              2 == J && (g._minvalue && (T += "," + type_wd_minlimitDigit + ":" + g._minvalue),
                g._maxvalue && (T += "," + type_wd_maxlimitDigit + ":" + g._maxvalue)),
              K && (b[f].errorControl = K),
              a = writeError(b[f], validate_info + validate_info_matrix4 + T, 3e3),
              firstMatrixError && firstMatrixError.onclick())
      }
  for (U = 0; U < trapHolder.length; U++)
    if (trapHolder[U].pageIndex == cur_page + 1) {
      for (A = trapHolder[U].itemInputs,
        V = "",
        r = 0; r < A.length; r++)
        A[r].checked && (V += A[r].value + ",");
      if (!V) {
        a = writeError(trapHolder[U], validate_info_wd1, 3e3);
        break
      }
    }
  return firstError && (PromoteUser(validate_submit, 3e3, !1),
    firstMatrixError && firstMatrixError.parent == firstError ? firstMatrixError.scrollIntoView() : firstError.scrollIntoView()),
    a
}
function validateMatrix(a, b, c) {
  var f, g, h, i, j, d = 0;
  return c.value ? (c.value,
    f = b.getAttribute("itemverify") || "",
    g = b.getAttribute("minword") || "",
    h = b.getAttribute("maxword") || "",
    i = b.getAttribute("issample"),
    j = !0,
    verifyMsg = "",
    i && "t" != promoteSource && (j = !1),
    j && (verifyMsg = verifyMinMax(c, f, g, h)),
    "" != verifyMsg && (d = 1),
    j && 0 == d && f && "0" != f && (verifyMsg = verifydata(c, f, a),
      "" != verifyMsg && (d = 2)),
    d) : d
}
function removeError() {
  this.errorMessage && (this.errorMessage.innerHTML = "",
    this.removeError = null,
    this.style.border = "solid 2px white",
    this.errorControl && (this.errorControl.style.background = "white",
      this.errorControl = null))
}
function PromoteUser(a, b, c) {
  c ? show_status_tip(a, b) : popUpAlert(a)
}
function writeError(a, b, c, d) {
  var e, f, g;
  if (!a.errorMessage || "" == a.errorMessage.innerHTML) {
    if (a.dataNode && ("matrix" == a.dataNode._type && "202" == a.dataNode._mode || "slider" == a.dataNode._type) || d || (a.style.border = "solid 2px #ff9900"),
      !a.errorMessage)
      for (e = $$tag("div", a),
        f = 0; f < e.length; f++)
        if (g = e[f].className.toLowerCase(),
          "errormessage" == g) {
          a.errorMessage = e[f];
          break
        }
    if (a.errorMessage)
      return a.errorMessage.innerHTML = b,
        a.removeError = removeError,
        a.errorControl && (a.errorControl.style.background = "#FBD5B5"),
        firstError || (firstError = a),
        !1
  }
}
function show_status_tip(a, b) {
  submit_tip.style.display = "block",
    submit_tip.innerHTML = a,
    b > 0 && setTimeout("submit_tip.style.display='none'", b)
}
function isDate(a) {
  var c, b = new Array;
  if (-1 != a.indexOf("-"))
    b = a.toString().split("-");
  else {
    if (-1 == a.indexOf("/"))
      return !1;
    b = a.toString().split("/")
  }
  return 4 == b[0].length && (c = new Date(b[0], b[1] - 1, b[2]),
    c.getFullYear() == b[0] && c.getMonth() == b[1] - 1 && c.getDate() == b[2]) ? !0 : !1
}
function DBC2SBC(a) {
  var b = a.value
    , c = b.dbc2sbc();
  return b != c && (a.value = c),
    a.value
}
function verifydata(a, b) {
  var f, d = trim(a.value), e = null;
  if ("email" == b.toLowerCase() || "msn" == b.toLowerCase())
    return e = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      e.exec(d) ? "" : validate_email;
  if ("日期" == b || "生日" == b || "入学时间" == b)
    return isDate(d) ? "" : validate_date;
  if ("固话" == b)
    return d = DBC2SBC(a),
      e = /^((\d{4}-\d{7})|(\d{3,4}-\d{8}))(-\d{1,4})?$/,
      e.exec(d) ? "" : validate_phone;
  if ("手机" == b)
    return d = DBC2SBC(a),
      e = /^\d{11}$/,
      e.exec(d) ? "" : validate_mobile;
  if ("密码" == b)
    return checkPassword(d, a);
  if ("确认密码" == b) {
    if (a && a.firstPwd && a.firstPwd.value != d)
      return "两次密码输入不一致！"
  } else {
    if ("电话" == b)
      return e = /(^\d{11}$)|(^((\d{4}-\d{7})|(\d{3,4}-\d{8}))(-\d{1,4})?$)/,
        e.exec(d) ? "" : validate_mo_phone;
    if ("汉字" == b)
      return e = /^[\u4e00-\u9fa5·]+$/,
        e.exec(d) ? "" : validate_chinese;
    if ("姓名" == b)
      return e = /^[\u4e00-\u9fa5·]{2,15}$/,
        e.exec(d) ? "" : "姓名必须为2到15个汉字";
    if ("英文" == b)
      return e = /^[A-Z\sa-z]+$/,
        e.exec(d) ? "" : validate_english;
    if ("英文数字" == b)
      return e = /^[A-Za-z\d]+$/,
        e.exec(d) ? "" : validate_englishdigit;
    if ("网址" == b || "公司网址" == b)
      return e = /^https?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        f = /^www.[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        e.exec(d) || f.exec(d) ? "" : validate_reticulation;
    if ("身份证号" == b)
      return d = DBC2SBC(a),
        18 == d.length && checkIDCard(d) ? "" : validate_idcardNum;
    if ("学号" == b) {
      if (d = DBC2SBC(a),
        e = /^\d+$/,
        !e.exec(d))
        return validate_num.replace("，请注意使用英文字符格式", "")
    } else if ("数字" == b) {
      if (d = DBC2SBC(a),
        e = /^(\-)?\d+$/,
        !e.exec(d))
        return validate_num
    } else if ("小数" == b) {
      if (d = DBC2SBC(a),
        e = /^(\-)?\d+(\.\d+)?$/,
        !e.exec(d))
        return validate_decnum
    } else if ("qq" == b.toLowerCase())
      return d = DBC2SBC(a),
        e = /^\d+$/,
        f = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/,
        e.exec(d) || f.exec(d) ? "" : validate_qq
  }
  return ""
}
function checkIDCard(a) {
  var j, k, l, m, n, b = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], c = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"], d = a + "", e = a[17], f = d.substring(0, 17), g = f.split(""), h = g.length, i = 0;
  for (j = 0; h > j; j++)
    i += g[j] * b[j];
  return k = i % 11,
    l = c[k],
    m = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1|2|3][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X]|[x])$/,
    n = m.test(a),
    e.toLowerCase() == l.toLowerCase() && n ? !0 : !1
}
function checkPassword(a, b) {
  var f, c = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,20}/, d = /[a-zA-Z]+/, e = /[0-9]+/;
  return b && b.confirmPwd && b.needCheckConfirm && (f = trim(b.confirmPwd.value),
    f != a) ? "两次密码输入不一致！" : c.test(a) && d.test(a) && e.test(a) ? "" : c.test(a) ? d.test(a) ? e.test(a) ? "" : "密码中必须包含数字" : "密码中必须包含字母" : "密码长度在8-20位"
}
function verifyMinMax(a, b, c, d) {
  var f, e = a.value;
  if ("数字" == b || "小数" == b) {
    if (!afterDigitPublish)
      return "";
    if (e = DBC2SBC(a),
      f = /^(\-)?\d+$/,
      "小数" == b && (f = /^(\-)?\d+(\.\d+)?$/),
      !f.exec(e))
      return "小数" == b ? validate_decnum : validate_num;
    if (0 != e && (e = e.replace(/^0+/, "")),
      "" != c) {
      if ("数字" == b && parseInt(e) - parseInt(c) < 0)
        return validate_num2 + c;
      if ("小数" == b && parseFloat(e) - parseFloat(c) < 0)
        return validate_num2 + c
    }
    if ("" != d) {
      if ("数字" == b && parseInt(e) - parseInt(d) > 0)
        return validate_num1 + d;
      if ("小数" == b && parseFloat(e) - parseFloat(d) > 0)
        return validate_num1 + d
    }
  } else {
    if ("" != d && e.length - d > 0)
      return validate_info_wd3.format(d, e.length);
    if ("" != c && e.length - c < 0)
      return validate_info_wd4.format(c, e.length)
  }
  return ""
}
function getXmlHttp() {
  var a;
  return window.XMLHttpRequest ? a = new XMLHttpRequest : window.ActiveXObject && (a = new ActiveXObject("Microsoft.XMLHTTP")),
    a
}
function postHeight() {
  if (window != window.top)
    try {
      var a = parent.postMessage ? parent : parent.document.postMessage ? parent.document : null;
      null != a && a.postMessage("heightChanged," + (document.documentElement.scrollHeight || document.body.scrollHeight), "*")
    } catch (b) { }
}
function avoidPaste() {
  var c, a = document.getElementsByTagName("input"), b = document.getElementsByTagName("textarea");
  for (c = 0; c < a.length; c++)
    a[c].onpaste = function () {
      return isTest ? !0 : this.parent && "1" == this.parent.getAttribute("nc") ? !0 : !1
    }
      ;
  for (c = 0; c < b.length; c++)
    b[c].onpaste = function () {
      return isTest ? !0 : this.parent && "1" == this.parent.getAttribute("nc") ? !0 : this.parent && "tr" == this.parent.tagName.toLowerCase() ? !0 : !1
    }
}
function setLastOp() {
  window.localStorage && localStorage.setItem("wjxlastanswer" + activityId, (new Date).getTime())
}
function setTimeOpup() {
  hasSurveyTime = !0,
    hasMaxtime = !0,
    divTimeUp && "none" != divTimeUp.style.display && PDF_close(),
    window.amt = 2,
    autoSubmit("由于您超过" + maxOpTime + "秒没有任何操作，系统为防止作弊不允许再作答！")
}
function replaceImg(a) {
  var b = "http://pubimageqiniu.paperol.cn"
    , c = "//pubnewfr.paperol.cn";
  0 == a.src.indexOf("http://pubssl.sojump.com") || 0 == a.src.indexOf("https://pubssl.sojump.com") || 0 == a.src.indexOf("http://pubimage.sojump.com") || 0 == a.src.indexOf("http://pubimage.sojump.cn") || 0 == a.src.indexOf("http://pubssl.sojump.cn") ? a.src = a.src.replace("http://pubssl.sojump.com", b).replace("https://pubssl.sojump.com", b).replace("http://pubimage.sojump.com", b).replace("http://pubimage.sojump.cn", b).replace("http://pubssl.sojump.cn", b) : (0 == a.src.indexOf("http://pubalifr.sojump.com") || 0 == a.src.indexOf("https://pubalifr.sojump.com") || 0 == a.src.indexOf("https://pubali.sojump.com") || 0 == a.src.indexOf("http://pubali.sojump.com") || 0 == a.src.indexOf("http://pubali.sojump.cn") || 0 == a.src.indexOf("http://pubalifr.sojump.cn") || 0 == a.src.indexOf("https://pubali.sojump.cn") || 0 == a.src.indexOf("https://pubalifr.sojump.cn")) && (a.src = a.src.replace("http://pubalifr.sojump.com", c).replace("https://pubalifr.sojump.com", c).replace("http://pubali.sojump.com", c).replace("https://pubali.sojump.com", c).replace("http://pubali.sojump.cn", c).replace("https://pubali.sojump.cn", c).replace("http://pubalifr.sojump.cn", c).replace("https://pubalifr.sojump.cn", c))
}
function popUpAlert(a) {
  maxCheatTimes > 0 && window.screenfull ? window.screenfull.alert(a) : alert(a)
}
function CheckMax(a, b, c) {
  var d, e, f, g, h, i, k, l, m, n, o, p, q, r, s, t;
  if (!(c || b && "radio" == b.type))
    return !0;
  if (d = b.value,
    e = a.parentNode.parentNode.parentNode,
    "table" != e.tagName.toLocaleLowerCase())
    return !0;
  if (f = 0,
    g = null,
    c)
    f = b.getAttribute("itemmax");
  else {
    if (h = e.getElementsByTagName("thead")[0],
      g = h.getElementsByTagName("td"),
      !g[d - 1])
      return !0;
    f = g[d - 1].getAttribute("itemmax")
  }
  if (f && window.cepingCandidate && "-1" != f.indexOf("%") && (i = parseInt(f.replace("%", "")),
    k = cepingCandidate.split("&nbsp;&nbsp;&nbsp;"),
    f = Math.ceil(k.length * i / 100)),
    f && f > 0) {
    if (l = e.getElementsByTagName("input"),
      m = 0,
      l.length)
      for (n = 0; n < l.length && (l[n].checked && l[n].value == d && m++,
        !(m >= f)); n++)
        ;
    else {
      for (n = 0; n < e.rows.length; n++) {
        for (o = $$tag("li", e.rows[n]),
          p = null,
          j = 0; j < o.length; j++)
          q = o[j].className.toLowerCase(),
            o[j].className && (q.indexOf("off") > -1 || q.indexOf("on") > -1) && q.indexOf("on") > -1 && (p = o[j]);
        p && d == p.value && m++
      }
      m -= 1
    }
    if (m >= f)
      return r = "",
        s = "列",
        c ? s = "此" : r = "“" + g[d - 1].innerHTML + "”",
        t = "提示：" + s + "选项" + r + "最多只允许选择" + f + "次",
        1 == langVer && (t = 'Column "' + r + '" can choose at most ' + f + " times."),
        alert(t),
        !1
  }
  return !0
}
function elagerImg(a, b) {
  var c, d;
  a = a || window.event,
    a.stopPropagation && a.stopPropagation(),
    c = b.parentNode.getAttribute("pimg"),
    c || (c = b.parentNode.getElementsByTagName("img")[0].src),
    c && (d = document.createElement("img"),
      d.onload = function () {
        var b, d, e, f, g, h, i, a = document.getElementById("divImgPop");
        a || (a = document.createElement("div"),
          a.id = "divImgPop",
          document.body.appendChild(a)),
          a.style.overflow = "auto",
          b = this.width,
          d = this.height,
          e = (document.documentElement.clientWidth || document.body.clientWidth) - 60,
          f = (document.documentElement.clientHeight || document.body.clientHeight) - 40,
          i = .9,
          d > f * i ? (h = f * i,
            g += 17,
            g > e * i && (g = e * i + 17)) : b > e * i ? (g = e * i,
              h = g / b * d) : (g = b,
                h = d),
          a.innerHTML = "<img src=" + c + " alt=''/>",
          PDF_launch("divImgPop", g + 20, h + 20)
      }
      ,
      d.src = c)
}
function displaypeie(a) {
  var b, c, d, e, f, g, h, i, j, k, l, m, n, o;
  if ("1" == a.getAttribute("haspeie") && (b = a.itemInputs,
    c = 0,
    "radio_down" == a.dataNode._type && (b = $$tag("option", a),
      c = 1),
    b)) {
    for (d = c; d < b.length; d++) {
      if (1 == c) {
        if (b[d].selected)
          continue
      } else if (b[d].checked)
        continue;
      if (e = b[d].getAttribute("attrpeie"))
        for (f = e.split(";"),
          g = 0; g < f.length; g++)
          h = f[g].split("|"),
            3 == h.length && (i = "q" + h[0] + "_" + h[1],
              j = document.getElementById(i),
              j ? (j.disabled = !1,
                j.parentNode && (k = j.parentNode.getElementsByTagName("label")[0],
                  l = k.getElementsByTagName("b"),
                  l.length > 0 && k.removeChild(l[0]))) : (m = document.getElementById("div" + h[0]),
                    n = m.getElementsByTagName("option"),
                    n && n.length > h[1] && (n[h[1]].disabled = !1,
                      o = "（" + h[2] + ")",
                      -1 != n[h[1]].innerHTML.indexOf(o) && (n[h[1]].innerHTML = n[h[1]].innerHTML.replace(o, "")))))
    }
    for (d = c; d < b.length; d++) {
      if (1 == c) {
        if (!b[d].selected)
          continue
      } else if (!b[d].checked)
        continue;
      if (e = b[d].getAttribute("attrpeie"))
        for (f = e.split(";"),
          g = 0; g < f.length; g++)
          h = f[g].split("|"),
            3 == h.length && (i = "q" + h[0] + "_" + h[1],
              j = document.getElementById(i),
              j ? (j.disabled = !0,
                j.parentNode && (k = j.parentNode.getElementsByTagName("label")[0],
                  l = k.getElementsByTagName("b"),
                  0 == l.length && (k.innerHTML = k.innerHTML + "<b>&nbsp;（" + h[2] + "）</b>"))) : (m = document.getElementById("div" + h[0]),
                    n = m.getElementsByTagName("option"),
                    n[h[1]].disabled = !0,
                    n && n.length > h[1] && (o = "（" + h[2] + ")",
                      -1 == n[h[1]].innerHTML.indexOf(o) && (n[h[1]].innerHTML = n[h[1]].innerHTML + o))))
    }
  }
}
function isOrChooseLogic(a, b) {
  var d, e, f, c = !0;
  for (d = 0; d < a.length; d++)
    if (e = a[d].split(",")[0],
      e == b) {
      f = a[d].split(",")[1],
        c = -1 != f.indexOf("-") ? -1 != f.indexOf(".") ? !0 : !1 : -1 != f.indexOf(".") ? !1 : !0;
      break
    }
  return c
}
function GetJpMatch() {
  var a, b;
  jpmarr.length > 0 && (jpmarr.sort(function (a, b) {
    return a.priority == b.priority ? a.id - b.id : a.priority - b.priority
  }),
    jpMatchId = jpmarr[0].id,
    a = jpmObj[jpmarr[0].id],
    a && (b = new Date,
      b.setTime(b.getTime() + 18e5),
      setCookie("jpckey", a, b.toUTCString(), "/", "", null)))
}
function getTableTrHandler(a) {
  var c, d, b = a.dataNode;
  return "301" == b._mode || "302" == b._mode || "303" == b._mode ? (c = $$tag("table", a),
    d = $$tag("tr", c[0])) : $$tag("tr", a)
}
var hasAnswer, initCounterDate, hrefSave, cur_page, jumpPages, pageHolder, trapHolder, totalQ, completeLoaded, firstImplementation, MaxTopic, curdiv, curfilediv, isUploadingFile, hasZhenBiePage, progressArray, questionsObject, joinedTopic, randomparm, hasTouPiao, useSelfTopic, hlv, keywordarray, keywordObj, quarray, jpmarr, jpmObj, ZheZhaoControl, divTimeUp, needCheckLeave, txtCurCity, submit_tip, submit_div, hasPeiEFull, peiemsg, spChars, spToChars, submit_table, pre_page, next_page, submit_button, imgCode, submit_text, tCode, divMinTime, spanMinTime, divMaxTime, spanMaxTime, maxCounter, maxTimer, minTimer, initMaxSurveyTime, isLoadQues, curMatrixFill, curMatrixError, divMatrixRel, matrixinput, relationHT, relationQs, relationGroup, relationGroupHT, ItemrelationHT, ItemrelationGroup, ItemrelationQs, ItemrelationGroupHT, relationNotDisplayQ, relationItemNotDisplayQ, relationNotDisplayItem, JumpNotDisplayQ, nextPageAlertText, hasMaxtime, imgVerify, isEdtData, shopHT, prevPostion, resizedMax, isAutoSubmit, hasAutoSubmit, amt, curMatrixItem, loadcss, loadprogress, hasConfirmBtn, itempopUpindex, popUpindex, pubNoCheck, saveNeedAlert, ktimes, spanSave, saveInterval, changeInterval, totalSaveSec, havereturn, timeoutTimer, errorTimes, hasSendErrorMail, prevsaveanswer, answer_send, changeSave, nvvv, firstError, firstMatrixError, startAge, endAge, gender, education, marriage, labelName, labelIndex, rName, modata, jpMatchId, hasMatchName, quResult, verifyMsg, needSubmitNotValid, ii, allimgs, i, isopUp, saveTime, cTime, minutes, dTime, days, leftOpTime, divOpTip, intervalId, fireConfirm;
if ("function" != typeof Array.prototype.push && (Array.prototype.push = function () {
  for (var a = 0; a < arguments.length; a++)
    this[this.length] = arguments[a];
  return this.length
}
),
  "function" != typeof Array.prototype.indexOf && (Array.prototype.indexOf = function (a) {
    for (var b = 0; b < this.length; b++)
      if (a === this[b])
        return b;
    return -1
  }
  ),
  String.prototype.format = function () {
    var a = arguments;
    return this.replace(/\{(\d+)\}/g, function (b, c) {
      return a[c]
    })
  }
  ,
  String.prototype.dbc2sbc = function () {
    return this.replace(/[\uff01-\uff5e]/g, function (a) {
      return String.fromCharCode(a.charCodeAt(0) - 65248)
    }).replace(/\u3000/g, " ")
  }
  ,
  window.maxCheatTimes || (maxCheatTimes = 0),
  hasAnswer = !1,
  initCounterDate = null,
  hrefSave = document.getElementById("hrefSave"),
  cur_page = 0,
  pageHolder = new Array,
  trapHolder = new Array,
  totalQ = 0,
  completeLoaded = !1,
  firstImplementation = !1,
  MaxTopic = 0,
  "none" != displayPrevPage || "1" != hasJoin && !isSuper || (displayPrevPage = ""),
  curdiv = null,
  curfilediv = null,
  isUploadingFile = !1,
  hasZhenBiePage = !1,
  progressArray = new Object,
  questionsObject = new Object,
  joinedTopic = 0,
  randomparm = "",
  hasTouPiao = !1,
  useSelfTopic = !1,
  hlv = "0",
  keywordarray = "",
  keywordObj = null,
  quarray = "",
  jpmarr = new Array,
  jpmObj = new Object,
  document.oncontextmenu = document.ondragstart = document.onselectstart = avoidCopy,
  ZheZhaoControl = null,
  divTimeUp = document.getElementById("divTimeUp"),
  document.onkeydown = forbidBackSpace,
  needCheckLeave = !0,
  allowSaveJoin && "true" == isRunning && guid && (window.onunload = function () {
    needCheckLeave && (maxCheatTimes > 0 && (fireConfirm = !0),
      confirm("您要保存填写的答卷吗？") && (submit(2),
        popUpAlert("答卷保存成功！")))
  }
  ),
  $$tag = function (a, b) {
    return b ? b.getElementsByTagName(a) : document.getElementsByTagName(a)
  }
  ,
  txtCurCity = null,
  submit_tip = document.getElementById("submit_tip"),
  submit_div = document.getElementById("submit_div"),
  hasPeiEFull = !1,
  peiemsg = "",
  spChars = ["$", "}", "^", "|", "!", "<"],
  spToChars = ["ξ", "｝", "ˆ", "¦", "！", "＜"],
  submit_table = document.getElementById("submit_table"),
  pre_page = document.getElementById("btnPre"),
  next_page = document.getElementById("btnNext"),
  submit_button = document.getElementById("submit_button"),
  imgCode = document.getElementById("imgCode"),
  submit_text = document.getElementById("yucinput"),
  tCode = document.getElementById(tdCode),
  divMinTime = document.getElementById("divMinTime"),
  spanMinTime = document.getElementById("spanMinTime"),
  divMaxTime = document.getElementById("divMaxTime"),
  spanMaxTime = document.getElementById("spanMaxTime"),
  maxCounter = 0,
  maxTimer = null,
  minTimer = null,
  initMaxSurveyTime = 0,
  isLoadQues = !1,
  curMatrixFill = null,
  curMatrixError = null,
  divMatrixRel = document.getElementById("divMatrixRel"),
  matrixinput = document.getElementById("matrixinput"),
  divMatrixRel.onclick = function (a) {
    if (curMatrixFill) {
      var b = curMatrixFill.parent.parent;
      b && b.removeError && b.removeError()
    }
    stopPropa(a)
  }
  ,
  matrixinput.onkeyup = matrixinput.onblur = matrixinput.onfocus = function () {
    if (curMatrixFill) {
      var b = this.value;
      (0 == b.indexOf("请注明...") || 0 == b.indexOf("Please specify")) && (this.value = b = ""),
        curMatrixFill.fillvalue = trim(b)
    }
  }
  ,
  relationHT = new Array,
  relationQs = new Object,
  relationGroup = new Array,
  relationGroupHT = new Object,
  ItemrelationHT = new Array,
  ItemrelationGroup = new Array,
  ItemrelationQs = new Object,
  ItemrelationGroupHT = new Object,
  relationNotDisplayQ = new Object,
  relationItemNotDisplayQ = new Object,
  relationNotDisplayItem = new Object,
  JumpNotDisplayQ = new Object,
  nextPageAlertText = "",
  hasMaxtime = !1,
  imgVerify = null,
  isEdtData = !1,
  shopHT = new Array,
  Init(),
  isAutoSubmit = !1,
  hasAutoSubmit = !1,
  amt = 0,
  curMatrixItem = null,
  loadcss = null,
  loadprogress = null,
  hasConfirmBtn = !1,
  itempopUpindex = 0,
  popUpindex = 0,
  pubNoCheck = null,
  saveNeedAlert = !0,
  ktimes = 0,
  hrefPreview && (hrefPreview.onclick = function () {
    return submit(0),
      !1
  }
  ),
  spanSave = null,
  saveInterval = null,
  changeInterval = null,
  totalSaveSec = 1,
  hrefSave && (hrefSave.onclick = function () {
    return "true" != isRunning ? (popUpAlert("此问卷处于停止状态，不能保存！"),
      void 0) : (window.Ischangeans ? (window.IsEditSave = !0,
        isEdtData = !0,
        submit(6)) : submit(2),
        !1)
  }
    ,
    "true" != isRunning || window.Ischangeans || (saveInterval = setInterval(function () {
      submit(2)
    }, 6e4))),
  havereturn = !1,
  timeoutTimer = null,
  errorTimes = 0,
  hasSendErrorMail = !1,
  prevsaveanswer = "",
  answer_send = "",
  changeSave = !1,
  nvvv = 0,
  firstError = null,
  firstMatrixError = null,
  startAge = 0,
  endAge = 0,
  gender = 0,
  education = 0,
  marriage = 0,
  labelName = "",
  labelIndex = 0,
  rName = "",
  modata = "",
  jpMatchId = 0,
  hasMatchName = !1,
  quResult = new Array,
  verifyMsg = "",
  needSubmitNotValid = !1,
  1 == nv)
  for (ii = cur_page; totalPage > ii && validate(); ii++)
    to_next_page();
for (postHeight(),
  allimgs = document.getElementsByTagName("img"),
  i = 0; i < allimgs.length; i++)
  allimgs[i].onerror = function () {
    this.onerror = null,
      replaceImg(this)
  }
    ,
    replaceImg(allimgs[i]);
window.isKaoShi && (avoidPaste(),
  window.maxOpTime && (isopUp = !1,
    window.localStorage && (saveTime = localStorage["wjxlastanswer" + activityId],
      saveTime && (cTime = (new Date).getTime(),
        minutes = (cTime - saveTime) / 6e4,
        10 > minutes && (isopUp = !0,
          setTimeOpup(),
          showSubmitTable(!1)))),
    isopUp || (dTime = (new Date).getTime(),
      days = (dTime - saveTime) / 864e5,
      leftOpTime = maxOpTime + 5,
      document.onclick = document.onkeyup = document.onscroll = document.onmousemove = function () {
        leftOpTime = maxOpTime + 5
      }
      ,
      divOpTip = null,
      intervalId = setInterval(function () {
        if (0 >= leftOpTime)
          clearInterval(intervalId),
            setLastOp(),
            setTimeOpup();
        else if (5 >= leftOpTime && divTimeUp) {
          if ("none" == divTimeUp.style.display) {
            PDF_launch("divTimeUp", 350, 60);
            var a = document.getElementById("PDF_bg_chezchenz");
            a && (a.onclick = a.onkeyup = a.onmousemove = a.onscroll = function () {
              leftOpTime = maxOpTime + 5,
                PDF_close()
            }
            )
          }
          document.getElementById("divTimeUpTip").innerHTML = "<span style='color:red;'>" + leftOpTime + "</span>秒后无操作，将不允许再作答！"
        }
        leftOpTime--
      }, 1e3)))),
  fireConfirm = !1;
