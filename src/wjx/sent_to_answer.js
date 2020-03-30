
/* global pageHolder, getKsAnswer, replace_specialChar, spChars, trim, defaultOtherText */

function my_sent_to_answer (a) {
  var d
  var f
  var j
  var k
  var o
  var p
  var q
  var r
  var s
  var t
  var u
  var v
  var w
  var x
  var y
  var z
  var A
  var B
  var C
  var D
  var E
  var F
  var G
  var H
  var I
  var J
  var K
  var L
  var M
  var N
  var O
  var P
  var Q
  var S
  var T
  var U
  var V
  var W
  var X
  var Y
  var Z
  var $
  var _
  var ab
  var bb
  var cb
  var db
  var eb
  var fb
  var gb
  var hb
  var ib
  var jb
  var kb
  var lb
  var mb
  var nb
  var ob
  var b = []
  var c = 0

  j = {}
  k = 1

  for (let l = 0; l < pageHolder.length; l++) {
    const m = pageHolder[l].questions
    for (let d = 0; d < m.length; d++) {
      o = m[d].dataNode
      // WTF
      p = (m[d].style.display.toLowerCase() === 'none' ||
        (m[d].dataNode._referTopic && !m[d].displayContent && !window.cepingCandidate) ||
        pageHolder[l].skipPage) &&
        !m[d].isCepingQ
      q = {}
      q._topic = o._topic
      q._value = ''
      b[c++] = q
      if (window.isKaoShi && m[d].getAttribute('nc') !== '1') {
        j[o._topic] = k
        k++
      }
      switch (o._type) {
        case 'question':
          if (p) {
            q._value = '(跳过)'
            if (m[d].getAttribute('hrq') === '1') {
              q._value = 'Ⅳ'
            }
            continue
          }
          r = m[d].itemTextarea || m[d].itemInputs[0]
          f = r.value || ''
          f && r.lnglat && (f = f + '[' + r.lnglat + ']')
          m[d].getAttribute('ceshi') === '1' && (f = getKsAnswer(f))
          q._value = replace_specialChar(f)
          break
        case 'gapfill':
          if (p && m[d].getAttribute('hrq') === '1') {
            q._value = 'Ⅳ'
            continue
          }
          s = m[d].gapFills
          t = m[d].getAttribute('ceshi') === '1'
          for (u = 0; u < s.length; u++) {
            u > 0 && (q._value += spChars[2])
            if (p) {
              q._value += '(跳过)'
            } else {
              f = trim(s[u].value.substring(0, 3e3))
              f && s[u].lnglat && (f = f + '[' + s[u].lnglat + ']')
              t && (f = getKsAnswer(f))
              q._value += replace_specialChar(f)
            }
          }
          break
        case 'slider':
          v = m[d].divSlider.value
          if (p) {
            q._value = '(跳过)'
            continue
          }
          q._value = v === undefined ? '' : v
          break
        case 'fileupload':
          w = m[d].fileName
          if (p) {
            q._value = '(跳过)'
            continue
          }
          q._value = w || ''
          break
        case 'sum':
          x = m[d].itemInputs
          lb = x.length
          for (u = 0; u < lb; u++) {
            y = x[u]
            z = m[d].relSum === 0 ? trim(y.value) || '0' : trim(y.value)
            m[d].itemTrs[u].style.display === 'none' && (z = 'Ⅳ')
            u > 0 && (q._value += spChars[2])
            A = m[d].itemTrs[u].getAttribute('rowid')
            A && (q._value += A + spChars[4])
            q._value += z
          }
          if (p) {
            for (B = 0; lb > B; B++) {
              if (B === 0) {
                q._value = '(跳过)'
              } else {
                q._value += spChars[2] + '(跳过)'
              }
            }
          }
          break
        case 'radio':
        case 'check':
          if (o.isSort) {
            C = []
            for (u = 0; u < m[d].itemInputs.length; u++) {
              if (m[d].itemInputs[u].type === 'checkbox') {
                D = m[d].itemInputs[u].parentNode
                E = D.getElementsByTagName('span')[0].innerHTML
                D.parentNode.style.display === 'none' && (E = '')
                F = {}
                F.sIndex = E
                G = m[d].itemInputs[u].value
                p ? G = '-3' : E || (G = '-2')
                F.val = G
                if (m[d].itemInputs[u].checked && m[d].itemInputs[u].itemText) {
                  H = m[d].itemInputs[u].itemText.value
                  H === defaultOtherText && (H = '')
                  F.val += spChars[2] + replace_specialChar(trim(H.substring(0, 3e3)))
                }
                F.sIndex || (F.sIndex = 1e4)
                C.push(F)
              }
            }
            C.sort(function (a, b) { return a.sIndex - b.sIndex })
            for (I = 0; I < C.length; I++) {
              I > 0 && (q._value += ',')
              q._value += C[I].val
            }
            continue
          }
          if (p) {
            q._value = '-3'
            m[d].getAttribute('hrq') === '1' && (q._value = '-4')
            continue
          }
          J = m[d].itemInputs || m[d].itemLis
          if (m[d].isShop) {
            K = false
            for (u = 0; u < J.length; u++) {
              G = parseInt(J[u].value)
              if (G > 0) {
                q._value && (q._value += spChars[3])
                q._value += u + 1 + ''
                q._value += spChars[2] + G
                K = !0
              }
            }
            K || (q._value = '-2')
            continue
          }
          for (L = -1,
          M = 0,
          u = 0; u < J.length; u++) {
            J[u].className.toLowerCase().indexOf('on') > -1 && (L = u),
            N = J[u].parentNode && J[u].parentNode.style.display == 'none',
            !N && J[u].checked && (M++,
            q._value ? q._value += spChars[3] + J[u].value : q._value = J[u].value + '',
            J[u].itemText && (H = J[u].itemText.value,
            H == defaultOtherText && (H = ''),
            q._value += spChars[2] + replace_specialChar(trim(H.substring(0, 3e3)))))
          }
          L > -1 ? q._value = J[L].value + '' : M > 0 || (q._value = '-2')
          break
        case 'radio_down':
          if (p) {
            q._value = '-3'
            continue
          }
          q._value = m[d].itemSel.value
          break
        case 'matrix':
          for (O = m[d].itemTrs,
          P = o._mode,
          lb = O.length,
          Q = 0,
          S = 0,
          T = 0,
          U = new Array(),
          V = !1,
          u = 0; u < O.length; u++) {
            if (W = O[u].getAttribute('rindex'),
            W == 0 && O[u].getAttribute('randomrow') == 'true' && (V = !0),
            X = new Object(),
            X.rIndex = parseInt(W),
            Y = P != '201' && P != '202' && P != '301' && P != '302' && P != '303',
            O[u].style.display == 'none' && Y) {
              Z = '-4',
              q._value ? q._value += ',' + Z : q._value = Z,
              X.val = Z
            } else if (J = O[u].itemInputs || O[u].itemLis || O[u].divSlider || O[u].itemSels) {
              if (Q = J.length,
              L = -1,
              $ = '',
              P != '201' && P != '202') {
                for (B = 0; B < J.length; B++) {
                  J[B].className.toLowerCase().indexOf('on') > -1 && (L = B,
                  $ = J[B].value),
                  J[B].checked ? (L = B,
                  $ ? $ += ';' + J[B].value : $ = J[B].value,
                  (P == '103' || P == '102' || P == '101') && (_ = J[B].getAttribute('needfill'),
                  _ && (ab = J[B].fillvalue || J[B].getAttribute('fillvalue') || '',
                  ab == defaultOtherText && (ab = ''),
                  ab = replace_specialChar(ab).replace(/;/g, '；').replace(/,/g, '，'),
                  $ += spChars[2] + ab))) : (J[B].tagName == 'TEXTAREA' || J[B].tagName == 'SELECT') && (L = B,
                  ab = trim(J[B].value),
                  O[u].style.display == 'none' && (ab = 'Ⅳ'),
                  B > 0 && ($ += spChars[3]),
                  ab ? (P == '302' && (ab && J[B].lnglat && (ab = ab + '[' + J[B].lnglat + ']'),
                  ab = replace_specialChar(ab)),
                  $ += ab) : $ += P == '303' ? '-2' : '(空)')
                }
                L > -1 ? (q._value ? q._value += P == '301' || P == '302' || P == '303' ? spChars[2] + $ : ',' + $ : q._value = $,
                X.val = $) : (q._value ? q._value += ',-2' : q._value = '-2',
                X.val = '-2')
              } else {
                P == '201' ? (G = trim(J[0].value.substring(0, 3e3)),
                O[u].style.display == 'none' && (G = 'Ⅳ'),
                G && J[0].lnglat && (G = G + '[' + J[0].lnglat + ']'),
                S > 0 ? q._value += spChars[2] + replace_specialChar(G) : q._value = replace_specialChar(G),
                X.val = replace_specialChar(G)) : P == '202' && (bb = void 0 == O[u].divSlider.value ? '' : O[u].divSlider.value,
                O[u].style.display == 'none' && (bb = 'Ⅳ'),
                S > 0 ? q._value += spChars[2] + bb : q._value = bb,
                X.val = bb)
              }
              U.push(X),
              S++
            } else {
              lb -= 1,
              T = 1
            }
          }
          if (p) {
            for (B = 0,
            q._value = ''; lb > B;) {
              if (P == '201' || P == '202') { B == 0 ? q._value = '(跳过)' : q._value += spChars[2] + '(跳过)' } else if (P == '301' || P == '302' || P == '303') {
                for (B > 0 && (q._value += spChars[2]),
                cb = 0; Q > cb; cb++) {
                  cb > 0 && (q._value += spChars[3]),
                  q._value += P == '303' ? '-3' : '(跳过)'
                }
              } else { B == 0 ? q._value = '-3' : q._value += ',-3' }
              B++
            }
            continue
          }
          for (U.sort(function (a, b) {
            return a.rIndex - b.rIndex
          }),
          db = spChars[2],
          P != '201' && P != '202' && P != '301' && P != '302' && P != '303' && (db = ','),
          eb = '',
          fb = 0; fb < U.length; fb++) {
            fb > 0 && (eb += db),
            gb = U[fb].rIndex,
            parseInt(gb) == gb && (W = parseInt(gb) + 1,
            eb += W + spChars[4]),
            eb += U[fb].val
          }
          q._value = eb
      }
    }
  }
  for (b.sort(function (a, b) {
    return a._topic - b._topic
  }),
  hb = '',
  d = 0; d < b.length; d++) {
    d > 0 && (hb += spChars[1]),
    hb += b[d]._topic,
    hb += spChars[0],
    hb += b[d]._value
  }
  try {
    if (window.isKaoShi && j && window.localStorage && window.JSON) {
      if (ib = localStorage.getItem('sortactivity'),
      ib ? ib += ',' + activityId : ib = activityId,
      ib += '',
      jb = ib.split(','),
      kb = 2,
      jb.length > kb) {
        for (lb = jb.length,
        d = 0; lb - kb > d; d++) {
          mb = jb[0],
          jb.splice(0, 1),
          localStorage.removeItem('sortorder_' + mb)
        }
        ib = jb.join(',')
      }
      localStorage.setItem('sortactivity', ib),
      nb = 'sortorder_' + activityId,
      ob = JSON.stringify(j),
      localStorage.setItem(nb, ob)
    }
  } catch (i) { }
  return hb
}
