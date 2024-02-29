import { Canvas, FillText, FillImage } from "@theparthka/canvaslib"
import { useEffect, useRef, useState } from "react"

const App = () => {

  let canvas_ref = useRef<HTMLCanvasElement>(null)
  let [c, setCanvas] = useState<Canvas>()

  useEffect(() => {
    var can1 = new Canvas(canvas_ref.current)
    can1.clickable(true)
    can1.setSize(600, 800)
    can1.selectable(true, {
      moveByArrow: true,
      multiSelect: true,
      moveByMouse: true,
    })
    can1.setEnvs({
      name: "Parth Degama",
    })
    setCanvas(can1)
  }, [])

  const addImageBg = () => {
    let bg = new Image()
    bg.src = "https://www.imageshine.in/uploads/gallery/Free-vector-watercolor-background-Wallpaper.jpg"
    bg.onload = () => {
      c?.setBackground(bg)
      c?.render()
    }
  }

  const addText = () => {
    var text1 = new FillText()
    text1.setEnv("name")
    c?.add(text1)
    c?.render()
  }

  const addTextAlt = () => {
    var text1 = new FillText()
    text1.setText("Hello!")
    c?.add(text1)
    c?.render()
  }

  const constChangeEnv = () => {
    c?.setEnvs({
      name: c.envs.name === "Parth Degama" ? "Parth..." : "Parth Degama"
    })
    c?.render()
  }

  const addImage = () => {
    var nimg = new FillImage()
    let img3 = new Image()
    img3.src = "https://clipart-library.com/data_images/320465.png"
    img3.width = 300
    nimg.setSrc(img3)
    nimg.setPos({ x: 10, y: 30 })
    c?.add(nimg)
    c?.render()
  }

  return (
    <>
      <canvas ref={canvas_ref} style={{
        border: "1px solid black",
        margin: "1rem"
      }}></canvas>
      <br />
      <div style={{
        margin: "1rem",
        display: "flex",
        gap: "1rem"
      }}>

        <button onClick={() => addImageBg()}>
          Set Background
        </button>

        <button onClick={() => addText()}>
          Add Env Text
        </button>

        <button onClick={() => addTextAlt()}>
          Add Text
        </button>

        <button onClick={() => constChangeEnv()}>
          Change Env
        </button>

        <button onClick={() => addImage()}>
          Add Image
        </button>

      </div>
    </>
  )

}

export default App