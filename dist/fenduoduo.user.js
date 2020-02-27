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
    console.log("WJX Detected");
    let tid, problems = [];
    function allowCopyPaste() {
        document.oncontextmenu = null, document.ondragstart = null, document.onselectstart = null;
    }
    function parseKsPage() {
        const divs = document.querySelectorAll(".div_question");
        problems = [ ...divs.values() ].map(x => function(elem) {
            let result;
            if (result = function(elem) {
                const c = elem.querySelector(".div_table_radio_question"), id = elem.id.substr(3);
                if (c.querySelector("a.jqCheckbox") || c.querySelector("a.jqRadio")) {
                    const cid = _utilsParseCID(elem), o = [ ...elem.querySelectorAll("label").values() ].filter(x => x.htmlFor.startsWith(cid)).map(x => [ x.htmlFor.substr(cid.length + 1), x.textContent.trim() ]), t = c.querySelector("a.jqCheckbox") ? 1 : 0;
                    return {
                        type: "c",
                        elem: elem,
                        id: id,
                        meta: {
                            o: o,
                            t: t
                        }
                    };
                }
            }(elem)) return result;
            console.group("Unknow problem"), console.log(elem), console.groupEnd();
        }(x)).filter(x => x);
        const problemsMeta = problems.map(x => ({
            id: x.id,
            type: x.type,
            meta: x.meta
        }));
        localStorage.setItem(tid + ".p", JSON.stringify(problemsMeta)), console.log(problems);
    }
    function _utilsParseCID(elem) {
        const input = elem.querySelector("input");
        return /^(.+)_/.exec(input.id)[1];
    }
    function get(elem, type) {
        switch (type) {
          case "c":
            return function(elem) {
                const checked = [ ...elem.querySelectorAll("a.jqChecked").values() ];
                if (checked.length) {
                    const b = _utilsParseCID(elem);
                    return checked.map(x => x.rel.substr(b.length + 1)).join(",");
                }
                return "";
            }(elem);
        }
        return "";
    }
    function set(elem, type, val, override) {
        if (override || !get(elem, type)) switch (type) {
          case "c":
            return function(elem, result) {
                if (!result) return;
                const b = _utilsParseCID(elem), options = result.split(",");
                for (const o of options) {
                    const lab = elem.querySelector(`a[rel="${b}_${o}"]`);
                    lab && lab.click();
                }
            }(elem, val);
        }
    }
    function ksGetAll() {
        const m = localStorage.getItem(tid), map = m ? JSON.parse(m) : Object.create(null);
        for (const p of problems) {
            const v = get(p.elem, p.type);
            v && (map[p.id] = v);
        }
        const v = JSON.stringify(map);
        return localStorage.setItem(tid, v), v;
    }
    function generateLink(val) {
        return [ tid, btoa(val) ].join("$");
    }
    function getData() {
        return generateLink(ksGetAll());
    }
    function initUI() {
        const container = document.createElement("div");
        function hideMenu() {
            container.style.display = "none";
        }
        function createBtn(text, cb) {
            const b = document.createElement("button");
            b.textContent = text, b.addEventListener("click", cb), container.appendChild(b);
        }
        return container.style.zIndex = 999, container.style.position = "fixed", container.style.top = "32px", 
        container.style.left = "32px", document.body.appendChild(container), hideMenu(), 
        createBtn("X", () => {
            hideMenu();
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
            if ("c" === p.type && 0 === p.meta.t) {
                const val = top.querySelector("div.data__key > div > font").nextSibling.textContent.trim(), right = p.meta.o.find(x => x[1] === val)[0];
                return [ id, right ];
            }
        }(x)).filter(x => x);
    }
    switch (/ks\.wjx\.top\/jq\//.test(location.href) ? 1 : /ks\.wjx\.top\/wjx\/join\//.test(location.href) ? 2 : void 0) {
      case 1:
        window.addEventListener("load", () => {
            setTimeout(() => {
                allowCopyPaste(), function() {
                    const match = /([0-9]+)\.aspx$/.exec(location.href);
                    tid = match[1];
                }(), document.querySelectorAll(".fieldset").forEach(fs => {
                    fs.style.display = "";
                }), document.getElementById("submit_table").style.display = "", document.getElementById("btnNext").parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none", 
                parseKsPage();
                const btn = initUI();
                btn("Export", () => {
                    const s = getData();
                    prompt("Your answer:", s);
                }), btn("Import", () => {
                    !function(val) {
                        const [ttid, pld] = val.split("$");
                        ttid === tid ? localStorage.setItem(tid, atob(pld)) : alert("Not for this paper");
                    }(prompt("Please paste"));
                }), btn("Apply", () => {
                    !function() {
                        const map = JSON.parse(localStorage.getItem(tid));
                        for (const id in map) {
                            const p = problems.find(x => x.id === id);
                            p ? set(p.elem, p.type, map[id], !1) : console.warn(`ID ${id} not found`);
                        }
                    }();
                }), function() {
                    const submitBtn = document.getElementById("submit_button"), bk = submitBtn.onclick;
                    submitBtn.onclick = null, submitBtn.addEventListener("click", ev => {
                        const s = getData();
                        return prompt("Your answer:", s), confirm("Are you sure to submit?") ? bk(ev) : (ev.preventDefault(), 
                        !1);
                    }), window.addEventListener("click", () => {
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
                }(), problems = JSON.parse(localStorage.getItem(tid + ".p")), initUI();
                const delta = jgParseResult(), map = JSON.parse(localStorage.getItem(tid));
                for (const d of delta) map[d[0]] = d[1];
                const value = JSON.stringify(map);
                localStorage.setItem(tid + ".r", value), prompt("Right answer:", generateLink(value));
            }, 200);
        });
    }
} ]);