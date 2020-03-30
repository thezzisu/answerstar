
/* global pageHolder, getKsAnswer, replace_specialChar, spChars, trim, defaultOtherText */

// eslint-disable-next-line camelcase, no-unused-vars
function my_sent_to_answer () {
  var d
  var f
  var j
  var k
  var curDataNode
  var r
  var s
  var t
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
  var U
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
  var lb
  const result = []
  var c = 0

  j = {}
  k = 1

  for (let holderIndex = 0; holderIndex < pageHolder.length; holderIndex++) {
    const curQuestions = pageHolder[holderIndex].questions
    for (let quesIndex = 0; quesIndex < curQuestions.length; quesIndex++) {
      curDataNode = curQuestions[quesIndex].dataNode
      // WTF
      const wtfSkip = (curQuestions[quesIndex].style.display.toLowerCase() === 'none' ||
        (curQuestions[quesIndex].dataNode._referTopic && !curQuestions[quesIndex].displayContent && !window.cepingCandidate) ||
        pageHolder[holderIndex].skipPage) &&
        !curQuestions[quesIndex].isCepingQ
      const curAns = {}
      curAns._topic = curDataNode._topic
      curAns._value = ''
      result[c++] = curAns
      if (window.isKaoShi && curQuestions[quesIndex].getAttribute('nc') !== '1') {
        j[curDataNode._topic] = k
        k++
      }
      switch (curDataNode._type) {
        case 'question':
          if (wtfSkip) {
            curAns._value = '(跳过)'
            if (curQuestions[quesIndex].getAttribute('hrq') === '1') {
              curAns._value = 'Ⅳ'
            }
            continue
          }
          r = curQuestions[quesIndex].itemTextarea || curQuestions[quesIndex].itemInputs[0]
          f = r.value || ''
          f && r.lnglat && (f = f + '[' + r.lnglat + ']')
          curQuestions[quesIndex].getAttribute('ceshi') === '1' && (f = getKsAnswer(f))
          curAns._value = replace_specialChar(f)
          break
        case 'gapfill':
          if (wtfSkip && curQuestions[quesIndex].getAttribute('hrq') === '1') {
            curAns._value = 'Ⅳ'
            continue
          }
          s = curQuestions[quesIndex].gapFills
          t = curQuestions[quesIndex].getAttribute('ceshi') === '1'
          for (let u = 0; u < s.length; u++) {
            u > 0 && (curAns._value += spChars[2])
            if (wtfSkip) {
              curAns._value += '(跳过)'
            } else {
              f = trim(s[u].value.substring(0, 3e3))
              f && s[u].lnglat && (f = f + '[' + s[u].lnglat + ']')
              t && (f = getKsAnswer(f))
              curAns._value += replace_specialChar(f)
            }
          }
          break
        case 'slider':
          v = curQuestions[quesIndex].divSlider.value
          if (wtfSkip) {
            curAns._value = '(跳过)'
            continue
          }
          curAns._value = v === undefined ? '' : v
          break
        case 'fileupload':
          w = curQuestions[quesIndex].fileName
          if (wtfSkip) {
            curAns._value = '(跳过)'
            continue
          }
          curAns._value = w || ''
          break
        case 'sum':
          x = curQuestions[quesIndex].itemInputs
          lb = x.length
          for (let u = 0; u < lb; u++) {
            y = x[u]
            z = curQuestions[quesIndex].relSum === 0 ? trim(y.value) || '0' : trim(y.value)
            curQuestions[quesIndex].itemTrs[u].style.display === 'none' && (z = 'Ⅳ')
            u > 0 && (curAns._value += spChars[2])
            A = curQuestions[quesIndex].itemTrs[u].getAttribute('rowid')
            A && (curAns._value += A + spChars[4])
            curAns._value += z
          }
          if (wtfSkip) {
            for (B = 0; lb > B; B++) {
              if (B === 0) {
                curAns._value = '(跳过)'
              } else {
                curAns._value += spChars[2] + '(跳过)'
              }
            }
          }
          break
        case 'radio':
        case 'check':
          if (curDataNode.isSort) {
            C = []
            for (let u = 0; u < curQuestions[quesIndex].itemInputs.length; u++) {
              if (curQuestions[quesIndex].itemInputs[u].type === 'checkbox') {
                D = curQuestions[quesIndex].itemInputs[u].parentNode
                E = D.getElementsByTagName('span')[0].innerHTML
                D.parentNode.style.display === 'none' && (E = '')
                F = {}
                F.sIndex = E
                G = curQuestions[quesIndex].itemInputs[u].value
                wtfSkip ? G = '-3' : E || (G = '-2')
                F.val = G
                if (curQuestions[quesIndex].itemInputs[u].checked && curQuestions[quesIndex].itemInputs[u].itemText) {
                  H = curQuestions[quesIndex].itemInputs[u].itemText.value
                  H === defaultOtherText && (H = '')
                  F.val += spChars[2] + replace_specialChar(trim(H.substring(0, 3e3)))
                }
                F.sIndex || (F.sIndex = 1e4)
                C.push(F)
              }
            }
            C.sort(function (a, b) { return a.sIndex - b.sIndex })
            for (I = 0; I < C.length; I++) {
              I > 0 && (curAns._value += ',')
              curAns._value += C[I].val
            }
            continue
          }
          if (wtfSkip) {
            curAns._value = '-3'
            curQuestions[quesIndex].getAttribute('hrq') === '1' && (curAns._value = '-4')
            continue
          }
          J = curQuestions[quesIndex].itemInputs || curQuestions[quesIndex].itemLis
          if (curQuestions[quesIndex].isShop) {
            K = false
            for (let u = 0; u < J.length; u++) {
              G = parseInt(J[u].value)
              if (G > 0) {
                curAns._value && (curAns._value += spChars[3])
                curAns._value += u + 1 + ''
                curAns._value += spChars[2] + G
                K = !0
              }
            }
            K || (curAns._value = '-2')
            continue
          }
          L = -1
          M = 0
          for (let u = 0; u < J.length; u++) {
            J[u].className.toLowerCase().indexOf('on') > -1 && (L = u)
            N = J[u].parentNode && J[u].parentNode.style.display === 'none'
            if (!N && J[u].checked) {
              M++
              curAns._value ? curAns._value += spChars[3] + J[u].value : curAns._value = J[u].value + ''
              if (J[u].itemText) {
                H = J[u].itemText.value
                H === defaultOtherText && (H = '')
                curAns._value += spChars[2] + replace_specialChar(trim(H.substring(0, 3e3)))
              }
            }
          }
          L > -1 ? curAns._value = J[L].value + '' : M > 0 || (curAns._value = '-2')
          break
        case 'radio_down':
          if (wtfSkip) {
            curAns._value = '-3'
            continue
          }
          curAns._value = curQuestions[quesIndex].itemSel.value
          break
        case 'matrix':
          O = curQuestions[quesIndex].itemTrs
          P = curDataNode._mode
          lb = O.length
          Q = 0
          S = 0
          U = []
          for (let u = 0; u < O.length; u++) {
            W = O[u].getAttribute('rindex')
            X = {}
            X.rIndex = parseInt(W)
            Y = P !== '201' && P !== '202' && P !== '301' && P !== '302' && P !== '303'
            if (O[u].style.display === 'none' && Y) {
              Z = '-4'
              curAns._value ? curAns._value += ',' + Z : curAns._value = Z
              X.val = Z
            } else if (O[u].itemInputs || O[u].itemLis || O[u].divSlider || O[u].itemSels) {
              J = O[u].itemInputs || O[u].itemLis || O[u].divSlider || O[u].itemSels
              Q = J.length
              L = -1
              $ = ''
              if (P !== '201' && P !== '202') {
                for (B = 0; B < J.length; B++) {
                  if (J[B].className.toLowerCase().indexOf('on') > -1) {
                    L = B
                    $ = J[B].value
                  }
                  if (J[B].checked) {
                    L = B
                    $ ? $ += ';' + J[B].value : $ = J[B].value
                    if (P === '103' || P === '102' || P === '101') {
                      _ = J[B].getAttribute('needfill')
                      if (_) {
                        ab = J[B].fillvalue || J[B].getAttribute('fillvalue') || ''
                        ab === defaultOtherText && (ab = '')
                        ab = replace_specialChar(ab).replace(/;/g, '；').replace(/,/g, '，')
                        $ += spChars[2] + ab
                      }
                    }
                  } else {
                    if (J[B].tagName === 'TEXTAREA' || J[B].tagName === 'SELECT') {
                      L = B
                      ab = trim(J[B].value)
                      O[u].style.display === 'none' && (ab = 'Ⅳ')
                      B > 0 && ($ += spChars[3])
                      if (ab) {
                        if (P === '302') {
                          ab && J[B].lnglat && (ab = ab + '[' + J[B].lnglat + ']')
                          ab = replace_specialChar(ab)
                        }
                        $ += ab
                      } else {
                        $ += P === '303' ? '-2' : '(空)'
                      }
                    }
                  }
                }
                if (L > -1) {
                  if (curAns._value) {
                    curAns._value += P === '301' || P === '302' || P === '303' ? spChars[2] + $ : ',' + $
                  } else {
                    curAns._value = $
                  }
                  X.val = $
                } else {
                  curAns._value ? curAns._value += ',-2' : curAns._value = '-2'
                  X.val = '-2'
                }
              } else {
                if (P === '201') {
                  G = trim(J[0].value.substring(0, 3e3))
                  O[u].style.display === 'none' && (G = 'Ⅳ')
                  G && J[0].lnglat && (G = G + '[' + J[0].lnglat + ']')
                  S > 0 ? curAns._value += spChars[2] + replace_specialChar(G) : curAns._value = replace_specialChar(G)
                  X.val = replace_specialChar(G)
                } else {
                  if (P === '202') {
                    bb = O[u].divSlider.value === undefined ? '' : O[u].divSlider.value
                    O[u].style.display === 'none' && (bb = 'Ⅳ')
                    S > 0 ? curAns._value += spChars[2] + bb : curAns._value = bb
                    X.val = bb
                  }
                }
              }
              U.push(X)
              S++
            } else {
              lb -= 1
            }
          }
          if (wtfSkip) {
            curAns._value = ''
            for (B = 0; B < lb; B++) {
              if (P === '201' || P === '202') {
                B === 0 ? curAns._value = '(跳过)' : curAns._value += spChars[2] + '(跳过)'
              } else if (P === '301' || P === '302' || P === '303') {
                B > 0 && (curAns._value += spChars[2])
                for (cb = 0; cb < Q; cb++) {
                  cb > 0 && (curAns._value += spChars[3])
                  curAns._value += P === '303' ? '-3' : '(跳过)'
                }
              } else {
                B === 0 ? curAns._value = '-3' : curAns._value += ',-3'
              }
            }
            continue
          }
          U.sort(function (a, b) { return a.rIndex - b.rIndex })
          db = spChars[2]
          P !== '201' && P !== '202' && P !== '301' && P !== '302' && P !== '303' && (db = ',')
          eb = ''
          for (fb = 0; fb < U.length; fb++) {
            fb > 0 && (eb += db)
            gb = U[fb].rIndex
            if (parseInt(gb) === gb) {
              W = parseInt(gb) + 1
              eb += W + spChars[4]
            }
            eb += U[fb].val
          }
          curAns._value = eb
      }
    }
  }

  result.sort(function (a, b) { return a._topic - b._topic })
  let resultStr = ''
  for (d = 0; d < result.length; d++) {
    d > 0 && (resultStr += spChars[1])
    resultStr += result[d]._topic
    resultStr += spChars[0]
    resultStr += result[d]._value
  }
  return resultStr
}
