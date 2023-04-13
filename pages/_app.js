import "@/pages/_style.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Script from "next/script"
import { useEffect } from "react"
import { useState } from "react"

export default function App({ Component, pageProps }) {
  const [entMode, setentMode] = useState("dark")

  console.log(entMode)
  useEffect(() => {
    let _a = document.body
    setentMode(_a.getAttribute("theme") || localStorage.getItem("theme"))
    let _mt = new MutationObserver(() => {
      setentMode(_a.getAttribute("theme"))
    })
    _mt.observe(_a, { attributes: true })
    function f() {
      if(_a.getAttribute("switch-theme") != "on") {
        return ;
      }
      setentMode(_a.getAttribute("theme"))
    }
    setInterval(f)
  })
  
  return (
    <>
      <script src="/js/darkmode.js"></script>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: entMode
          }
        })}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
