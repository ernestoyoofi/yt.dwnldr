import { Button } from "@mui/material"
import { useRef, useState } from "react"
import { AutoFixHigh } from "@mui/icons-material"
import { useSearch } from "@/lib/useSearch"
import MenuItem from "@mui/material/MenuItem"
import ListSubheader from "@mui/material/ListSubheader"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"

export default function Landing_pages_site() {
  const [iframevid, setiframevid] = useState({})
  const [linkdown, setlinkdown] = useState(null)
  const formt = useRef()

  const startDownload = (id) => {
    if(!id) {
      return ;
    }
    fetch(`https://loader.to/ajax/progress.php?id=${id}`)
    .catch(err => {
      alert("Some thing error script response or connection !")
    })
    .then(async (data) => {
      if(!data.ok) {
        return alert(`Response status is ${res.statusText}, Check your console browser in inspect element`)
      }
      const jsondata = await data.json()
      if(jsondata.success != 1) {
        return setTimeout(() => {
          startDownload(id)
        }, 2000)
      }
      if(jsondata.success === 1 && !jsondata.download_url) {
        return alert("Can't convert this video or audio")
      }
      setlinkdown(jsondata.download_url)
    })
  }

  useSearch((cs) => {
    const yturl = cs["yt-url"]?.replace(/music./g, "www.")
    if(typeof (cs.format && cs["yt-url"]) != "string") {
      return ;
    }
    if(!yturl.match("youtu")) {
      return ;
    }
    setlinkdown(null)
    fetch(`https://loader.to/ajax/download.php?${new URLSearchParams({ url: yturl, format: cs.format })}`)
    .catch(err => {
      alert("Some thing error script response or connection !")
    })
    .then(async (res) => {
      if(!res.ok) {
        return alert(`Response status is ${res.statusText}, Check your console browser in inspect element`)
      }
      const data = await res.json()
      if(!data.info.image.match("i.ytimg.com")) {
        return alert(`This url maybe is not youtube origin !`)
      }
      setiframevid({
        title: data.info.title,
        image: data.info.image
      })
      startDownload(data.id)
    })
  })

  const forms = {
    set: (key, value) => {
      if(!formt.current) {
        formt.current = {}
      }
      formt.current[key] = value
    },
    submit: () => {
      history.pushState(null,null,`/?${new URLSearchParams(formt.current).toString()}`)
    }
  }

  return (
    <>
      <header>
        <div className="response">
          <Button
            onClick={() => {
              document.body
              .setAttribute("switch-theme", "on")
            }}
          ><AutoFixHigh /></Button>
        </div>
      </header>
      <main className="response center-box">
        <div>
          <FormControl>
            <TextField
              label="URL"
              size="small"
              onChange={(e) => forms.set("yt-url", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel id="select-format" size="small">Select Format</InputLabel>
            <Select
              size="small"
              fullWidth
              labelId="select-format"
              onChange={(e, c) => forms.set("format", c.props.value)}
              label="Select Format"
            >
              <ListSubheader>Video (.mp4)</ListSubheader>
              <MenuItem value="1080">1080p</MenuItem>
              <MenuItem value="720">720p</MenuItem>
              <MenuItem value="480">480p</MenuItem>
              <ListSubheader>Audio</ListSubheader>
              <MenuItem value="mp3">MP3 (.mp3)</MenuItem>
              <MenuItem value="ogg">OGG (.ogg)</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => forms.submit()}>Download</Button>
          <div>
            <img src={iframevid.image} width="95%"/>
            <b>{iframevid.title}</b>
            <Button disabled={typeof linkdown != "string"} onClick={() => window.open(linkdown, "_blank")}>{typeof linkdown != "string"?"Waiting...":"Download !"}</Button>
            {typeof linkdown === "string"? (formt.current?.format === "mp3" || formt.current?.format === "ogg")? <audio src={linkdown} controls/>: <video src={linkdown} controls width="350px"/>:""}
          </div>
        </div>
      </main>
    </>
  )
}
