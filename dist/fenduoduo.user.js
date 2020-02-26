// ==UserScript==
// @name         fenduoduo
// @version      0.0.1
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
}, function(module, exports) {
    console.log("WJX Detected"), /(ks\.wjx\.top\/m\/)/.test(location.href) && (location.href = location.href.replace(/m/, "jq"));
    const tid = /([0-9]+)\.aspx$/.exec(location.href)[1];
    window.addEventListener("load", () => {
        setTimeout(() => {
            document.oncontextmenu = null, document.ondragstart = null, document.onselectstart = null, 
            console.log("FenDuoDuo is loaded");
            const problems = [ ...document.querySelectorAll(".div_question").values() ].map(x => function(elem) {
                const c = elem.querySelector(".div_table_radio_question"), id = elem.id.substr(3);
                return c.querySelector("a.jqCheckbox") || c.querySelector("a.jqRadio") ? {
                    type: "c",
                    elem: elem,
                    id: id
                } : {
                    type: "unknow",
                    elem: elem,
                    id: id
                };
            }(x));
            function parseC(elem) {
                const input = elem.querySelector("input");
                return /^(.+)_/.exec(input.id)[1];
            }
            function get(elem, type) {
                switch (type) {
                  case "c":
                    return function(elem) {
                        const checked = [ ...elem.querySelectorAll("a.jqChecked").values() ];
                        if (checked.length) {
                            const b = parseC(elem);
                            return checked.map(x => x.rel.substr(b.length + 1)).join(",");
                        }
                        return "";
                    }(elem);
                }
                return console.group("unknow element"), console.log(`Type ${type}`), console.log(elem), 
                console.groupEnd(), "";
            }
            function set(elem, type, val, override) {
                if (override || !get(elem, type)) {
                    switch (type) {
                      case "c":
                        return function(elem, result) {
                            if (!result) return;
                            const b = parseC(elem), options = result.split(",");
                            for (const o of options) {
                                const lab = elem.querySelector(`a[rel="${b}_${o}"]`);
                                lab && lab.click();
                            }
                        }(elem, val);
                    }
                    console.group("unknow element"), console.log(`Type ${type}`), console.log(elem), 
                    console.groupEnd();
                }
            }
            !function() {
                const a = document.createElement("div");
                a.style.width = "16px", a.style.height = "32px", a.style.zIndex = 999, a.style.background = "red", 
                a.style.position = "fixed", a.style.bottom = "32px", a.style.right = "48px", a.style.cursor = "pointer", 
                document.body.appendChild(a), a.addEventListener("click", () => {
                    const s = function() {
                        const map = Object.create(null);
                        for (const p of problems) map[p.id] = get(p.elem, p.type);
                        return [ tid, btoa(JSON.stringify(map)) ].join("$");
                    }();
                    prompt("Please copy", s);
                });
                const b = document.createElement("div");
                b.style.width = "16px", b.style.height = "32px", b.style.zIndex = 999, b.style.background = "green", 
                b.style.position = "fixed", b.style.bottom = "32px", b.style.right = "32px", b.style.cursor = "pointer", 
                document.body.appendChild(b), b.addEventListener("click", () => {
                    !function(val) {
                        const [ttid, pld] = val.split("$");
                        if (ttid !== tid) return void alert("Not for this paper");
                        const map = JSON.parse(atob(pld));
                        for (const id in map) {
                            const p = problems.find(x => x.id === id);
                            p ? set(p.elem, p.type, map[id], !1) : console.warn(`ID ${id} not found`);
                        }
                    }(prompt("Please paste"));
                }), console.log("UI Init");
            }();
        }, 200);
    });
} ]);