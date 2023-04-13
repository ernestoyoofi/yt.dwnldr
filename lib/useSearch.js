const { useEffect } = require("react")

module.exports.useSearch = function useSearch(callback) {
  useEffect(() => {
    if(document.head.getAttribute("path-use") != location.pathname) {
      document.head.setAttribute("path-use", location.pathname)
      let urlsMs = undefined
      function urlSc() {
        if(urlsMs != location.search) {
          callback(Object.fromEntries(new URLSearchParams(location.search)))
          urlsMs = location.search
        }
      }
      urlSc()
      setInterval(urlSc)
    }
  })
}