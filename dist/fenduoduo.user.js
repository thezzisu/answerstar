// ==UserScript==
// @name         fenduoduo
// @version      0.0.5
// @description  停课不停学助手
// @author       ZhangZisu <admin@zhangzisu.cn>
//
// @include      http*://ks.wjx.top/*
//
// @grant        GM_addStyle
// Build with https://github.com/SettingDust/webpack-tampermonkey
// ==/UserScript==

!function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 0);
}([ function(module, exports, __webpack_require__) {
    /ks\.wjx\.top/.test(window.location.href) && __webpack_require__(1);
}, function(module, exports, __webpack_require__) {
    console.log("WJX Detected");
    const {Base64: Base64} = __webpack_require__(2);
    let tid, problems = [];
    function _gets(k) {
        return localStorage.getItem(`fdd.${tid}.${k}`);
    }
    function _getj(k) {
        try {
            return JSON.parse(_gets(k));
        } catch (e) {
            return console.error(e), null;
        }
    }
    function _sets(k, v) {
        return localStorage.setItem(`fdd.${tid}.${k}`, v);
    }
    function _setj(k, v) {
        return _sets(k, JSON.stringify(v));
    }
    function allowCopyPaste() {
        document.oncontextmenu = null, document.ondragstart = null, document.onselectstart = null;
    }
    function parseKsPage() {
        const divs = document.querySelectorAll(".div_question");
        problems = [ ...divs.values() ].map(x => function(elem) {
            let result;
            if (result = function(elem) {
                try {
                    const c = elem.querySelector(".div_table_radio_question"), id = elem.id.substr(3);
                    if (c.querySelector("a.jqCheckbox") || c.querySelector("a.jqRadio")) {
                        const cid = _utilsParseCID(elem), o = [ ...c.querySelector("ul").querySelectorAll("li").values() ].map(x => [ x.querySelector("input").id.substr(cid.length + 1), x.querySelector("label").textContent.trim() ]).filter(x => x[0]), t = c.querySelector("a.jqCheckbox") ? 1 : 0;
                        return {
                            type: "c",
                            elem: elem,
                            id: id,
                            meta: {
                                o: o,
                                t: t,
                                i: cid
                            }
                        };
                    }
                } catch (e) {
                    console.error(e);
                }
            }(elem)) return result;
            if (result = function(elem) {
                try {
                    const id = elem.id.substr(3);
                    if (1 === elem.querySelector(".div_table_radio_question").querySelectorAll("textarea").length) {
                        const tid = function(elem) {
                            return elem.querySelector("textarea").id;
                        }(elem);
                        return {
                            type: "t",
                            elem: elem,
                            id: id,
                            meta: {
                                i: tid
                            }
                        };
                    }
                } catch (e) {
                    console.error(e);
                }
            }(elem)) return result;
            console.group("Unknow problem"), console.log(elem), console.groupEnd();
        }(x)).filter(x => x), _setj("p", problems.map(x => ({
            id: x.id,
            type: x.type,
            meta: x.meta
        })));
    }
    function _utilsParseCID(elem) {
        const input = elem.querySelector("input");
        return /^(.+)_/.exec(input.id)[1];
    }
    function get(elem, type) {
        switch (type) {
          case "c":
            return function(elem) {
                try {
                    const checked = [ ...elem.querySelectorAll("a.jqChecked").values() ];
                    if (checked.length) {
                        const b = _utilsParseCID(elem);
                        return checked.map(x => x.rel.substr(b.length + 1)).join(",");
                    }
                    return "";
                } catch (e) {
                    return console.error(e), "";
                }
            }(elem);

          case "t":
            return function(elem) {
                try {
                    return elem.querySelector("textarea").value;
                } catch (e) {
                    return console.error(e), "";
                }
            }(elem);
        }
        return "";
    }
    function set(elem, type, val, override) {
        if (override || !get(elem, type)) switch (type) {
          case "c":
            return function(elem, result) {
                try {
                    if (!result) return;
                    const b = _utilsParseCID(elem), options = result.split(",");
                    for (const o of options) {
                        const lab = elem.querySelector(`a[rel="${b}_${o}"]`);
                        lab && lab.click();
                    }
                } catch (e) {
                    console.error(e);
                }
            }(elem, val);

          case "t":
            return function(elem, result) {
                try {
                    elem.querySelector("textarea").value = result;
                } catch (e) {
                    console.error(e);
                }
            }(elem, val);
        }
    }
    function ksGetAll() {
        const map = _getj("s") || {};
        for (const p of problems) {
            const v = get(p.elem, p.type);
            v && (map[p.id] = v);
        }
        return _setj("s", map), _gets("s");
    }
    function ksSetAll(key) {
        const map = _getj(key) || {};
        for (const id in map) {
            const p = problems.find(x => x.id === id);
            p ? set(p.elem, p.type, map[id], !1) : console.warn(`ID ${id} not found`);
        }
    }
    function generateLink(val) {
        return [ tid, Base64.encodeURI(val) ].join("$");
    }
    function initUI() {
        const container = document.createElement("div");
        function createBtn(text, cb) {
            const b = document.createElement("button");
            b.textContent = text, b.addEventListener("click", cb), container.appendChild(b);
        }
        return container.style.zIndex = 999, container.style.position = "fixed", container.style.top = "32px", 
        container.style.left = "32px", document.body.appendChild(container), createBtn("X", () => {
            container.style.display = "none";
        }), function(cb) {
            const a = document.createElement("button");
            a.textContent = "menu", a.style.zIndex = 998, a.style.position = "fixed", a.style.bottom = "32px", 
            a.style.right = "32px", document.body.appendChild(a), a.addEventListener("click", cb);
        }(() => {
            container.style.display = "";
        }), console.log("UI Init"), createBtn;
    }
    function jgParseResult() {
        return [ ...document.querySelectorAll('img[alt="错误"]').values() ].map(x => function(elem) {
            const top = elem.parentElement.parentElement.parentElement, id = top.getAttribute("topic"), p = problems.find(x => x.id === id);
            if (p) {
                if ("c" === p.type) {
                    if (0 === p.meta.t) {
                        const val = top.querySelector("div.data__key > div > font").nextSibling.textContent.trim(), right = p.meta.o.find(x => x[1] === val)[0];
                        return [ id, right ];
                    }
                    {
                        const arr = top.querySelector("div.data__key > div > font").nextSibling.textContent.trim().split("|").map(x => x.trim()).filter(x => x), right = p.meta.o.filter(x => arr.includes(x[1])).map(x => x[0]).join(",");
                        return [ id, right ];
                    }
                }
                if ("t" === p.type) {
                    const val = top.querySelector("div.data__key > div > font").nextSibling.textContent.trim();
                    return [ id, val ];
                }
            } else console.warn("Problem not found: " + id);
        }(x)).filter(x => x);
    }
    switch (/ks\.wjx\.top\/jq\//.test(location.href) ? 1 : /ks\.wjx\.top\/wjx\/join\//.test(location.href) ? 2 : void 0) {
      case 1:
        window.addEventListener("load", () => {
            setTimeout(() => {
                allowCopyPaste(), function() {
                    const match = /([0-9]+)\.aspx$/.exec(location.href);
                    tid = match[1];
                }(), function() {
                    document.querySelectorAll(".fieldset").forEach(fs => {
                        fs.style.display = "";
                    }), document.getElementById("submit_table").style.display = "";
                    try {
                        document.getElementById("btnNext").parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
                    } catch (e) {}
                }(), parseKsPage();
                const btn = initUI();
                btn("Export my answer", () => {
                    const s = generateLink(ksGetAll());
                    prompt("Your answer:", s);
                }), btn("Import and replace my answer", () => {
                    !function(val) {
                        const [ttid, pld] = val.split("$");
                        ttid === tid ? _sets("s", Base64.decode(pld)) : alert("Not for this paper");
                    }(prompt("Please paste"));
                }), btn("Restore my answer", () => {
                    ksSetAll("s");
                }), btn("Restore right answer", () => {
                    ksSetAll("r");
                }), ksSetAll("s"), function() {
                    const submitBtn = document.getElementById("submit_button"), bk = submitBtn.onclick;
                    submitBtn.onclick = null, submitBtn.addEventListener("click", ev => confirm("Are you sure to submit?") ? bk(ev) : (ev.preventDefault(), 
                    !1)), window.addEventListener("click", () => {
                        ksGetAll();
                    });
                }();
            }, 200);
        }), /(ks\.wjx\.top\/m\/)/.test(location.href) && (location.href = location.href.replace(/m/, "jq"));
        break;

      case 2:
        window.addEventListener("load", () => {
            setTimeout(() => {
                allowCopyPaste(), function() {
                    const match = /q=([0-9]+)/.exec(location.search);
                    tid = match[1];
                }(), problems = _getj("p");
                const btn = initUI(), delta = jgParseResult(), map = _getj("s");
                for (const d of delta) map[d[0]] = d[1];
                _setj("r", map), btn("Export My Answer", () => {
                    prompt("My answer:", generateLink(_gets("s")));
                }), btn("Export Right Answer", () => {
                    prompt("Right answer:", generateLink(_gets("r")));
                });
            }, 200);
        });
    }
}, function(module, exports, __webpack_require__) {
    (function(global) {
        var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
        !function(global, factory) {
            module.exports = factory(global);
        }("undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== global ? global : this, (function(global) {
            "use strict";
            global = global || {};
            var _Base64 = global.Base64, version = "2.5.2", buffer;
            if (module.exports) try {
                buffer = eval("require('buffer').Buffer");
            } catch (err) {
                buffer = void 0;
            }
            var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", b64tab = function(bin) {
                for (var t = {}, i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
                return t;
            }(b64chars), fromCharCode = String.fromCharCode, cb_utob = function(c) {
                if (c.length < 2) return (cc = c.charCodeAt(0)) < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | 63 & cc) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | 63 & cc);
                var cc = 65536 + 1024 * (c.charCodeAt(0) - 55296) + (c.charCodeAt(1) - 56320);
                return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | 63 & cc);
            }, re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, utob = function(u) {
                return u.replace(re_utob, cb_utob);
            }, cb_encode = function(ccc) {
                var padlen = [ 0, 2, 1 ][ccc.length % 3], ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0);
                return [ b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(63 & ord) ].join("");
            }, btoa = global.btoa ? function(b) {
                return global.btoa(b);
            } : function(b) {
                return b.replace(/[\s\S]{1,3}/g, cb_encode);
            }, _encode = function(u) {
                return "[object Uint8Array]" === Object.prototype.toString.call(u) ? u.toString("base64") : btoa(utob(String(u)));
            }, encode = function(u, urisafe) {
                return urisafe ? _encode(String(u)).replace(/[+\/]/g, (function(m0) {
                    return "+" == m0 ? "-" : "_";
                })).replace(/=/g, "") : _encode(u);
            }, encodeURI = function(u) {
                return encode(u, !0);
            }, re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, cb_btou = function(cccc) {
                switch (cccc.length) {
                  case 4:
                    var offset = ((7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3)) - 65536;
                    return fromCharCode(55296 + (offset >>> 10)) + fromCharCode(56320 + (1023 & offset));

                  case 3:
                    return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));

                  default:
                    return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
                }
            }, btou = function(b) {
                return b.replace(re_btou, cb_btou);
            }, cb_decode = function(cccc) {
                var len = cccc.length, padlen = len % 4, n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0), chars = [ fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(255 & n) ];
                return chars.length -= [ 0, 0, 2, 1 ][padlen], chars.join("");
            }, _atob = global.atob ? function(a) {
                return global.atob(a);
            } : function(a) {
                return a.replace(/\S{1,4}/g, cb_decode);
            }, atob = function(a) {
                return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ""));
            }, _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function(a) {
                return (a.constructor === buffer.constructor ? a : buffer.from(a, "base64")).toString();
            } : function(a) {
                return (a.constructor === buffer.constructor ? a : new buffer(a, "base64")).toString();
            } : function(a) {
                return btou(_atob(a));
            }, decode = function(a) {
                return _decode(String(a).replace(/[-_]/g, (function(m0) {
                    return "-" == m0 ? "+" : "/";
                })).replace(/[^A-Za-z0-9\+\/]/g, ""));
            }, noConflict = function() {
                var Base64 = global.Base64;
                return global.Base64 = _Base64, Base64;
            };
            if (global.Base64 = {
                VERSION: version,
                atob: atob,
                btoa: btoa,
                fromBase64: decode,
                toBase64: encode,
                utob: utob,
                encode: encode,
                encodeURI: encodeURI,
                btou: btou,
                decode: decode,
                noConflict: noConflict,
                __buffer__: buffer
            }, "function" == typeof Object.defineProperty) {
                var noEnum = function(v) {
                    return {
                        value: v,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    };
                };
                global.Base64.extendString = function() {
                    Object.defineProperty(String.prototype, "fromBase64", noEnum((function() {
                        return decode(this);
                    }))), Object.defineProperty(String.prototype, "toBase64", noEnum((function(urisafe) {
                        return encode(this, urisafe);
                    }))), Object.defineProperty(String.prototype, "toBase64URI", noEnum((function() {
                        return encode(this, !0);
                    })));
                };
            }
            return global.Meteor && (Base64 = global.Base64), module.exports ? module.exports.Base64 = global.Base64 : (__WEBPACK_AMD_DEFINE_ARRAY__ = [], 
            __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return global.Base64;
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)), 
            {
                Base64: global.Base64
            };
        }));
    }).call(this, __webpack_require__(3));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
} ]);