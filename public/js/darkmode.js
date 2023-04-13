(() => {
  "use strict";
  let a = document.body
  let b = localStorage.getItem("theme") || "dark"
  let c = () => a.setAttribute("theme", b); localStorage.setItem("theme", b)
  let g = () => a.setAttribute("theme", b)
  if(localStorage.getItem("theme")) {
    window.onload = g
  }
  function d() {
    if(a.getAttribute("switch-theme") != "on") {
      return ;
    }
    a.setAttribute("switch-theme", "off")
    if(b === "dark") { b = "light"; c(); }
    else { b = "dark"; c(); }
    console.log("Update content")
  }
  function f() {
    if(a.getAttribute("switch-theme") != "on") {
      return ;
    }
    d()
  }
  setInterval(f)
  let e = new MutationObserver(d)
  e.observe(a, { attributes: true })
})();