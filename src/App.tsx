import { Canvas, FillText, FillImage, FillBarCodeQR } from "@theparthka/canvaslib"
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
      qr: "",
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
      name: c.envs.name === "Parth Degama" ? "Parth..." : "Parth Degama",
      qr: c.envs.qr === "" ? "hello..." : "",
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
    nimg.setAutoSize(false)
    nimg.setHeight(300)
    nimg.setWidth(300)
    c?.add(nimg)
    c?.render()
  }

  const changeStyle = (style: "uppercase" | "lowercase" | "none") => {
    if (c?.selectedEles()[0] instanceof FillText) {
      let text = c.selectedEles()[0] as FillText
      text.setStyle(style)
      c.render()
    }
  }

  const [style, setStyle] = useState<"uppercase" | "lowercase" | "none">("none")
  c?.onMouseUp(() => {
    if (c?.selectedEles()[0] instanceof FillText) {
      let text = c.selectedEles()[0] as FillText
      let style = text.getStyle()
      setStyle(style)
    } else if (c?.selectedEles()[0] instanceof FillImage) {
      let ele = c.selectedEles()[0] as FillImage
      setBorder(ele.getBorder())
    }
  })

  const addQrCode = () => {
    var nimg = new FillBarCodeQR()
    nimg.setType("qr")
    nimg.setEnv("qr")
    nimg.setPos({ x: 10, y: 30 })
    nimg.setWidth(500)
    nimg.setHeight(500)
    nimg.setAutoSize(false)
    c?.add(nimg)
    c?.render()
  }

    const addBarcode = () => {
    var nimg = new FillBarCodeQR()
    nimg.setType("barcode")
    nimg.setEnv("qr")
    nimg.setPos({ x: 10, y: 30 })
    nimg.setWidth(500)
    nimg.setHeight(500)
    nimg.setAutoSize(false)
    c?.add(nimg)
    c?.render()
  }

  const [border, setBorder] = useState(0)
  const [showFieldBg, setShowFieldBg] = useState(false)

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

        <select onChange={(e) => {
          let value = e.target.value as "uppercase" | "lowercase" | "none"
          changeStyle(value)
          setStyle(value)
        }} value={style}>
          <option value="uppercase">UpperCase</option>
          <option value="lowercase">LowerCase</option>
          <option value="none">None</option>
        </select>

        <input value={border} type="number" onChange={(e) => {
          let value = parseInt(e.target.value)
          if (c?.selectedEles()[0] instanceof FillImage) {
            let ele = c.selectedEles()[0] as FillImage
            ele.setBorder(String(value) as any)
            setBorder(value)
            c.render()
          }
        }} />

        <button onClick={() => {
          if (c) {
            c.showFieldBg = !c.showFieldBg
            setShowFieldBg(c.showFieldBg)
            c.setFieldBg(!showFieldBg)
            c.render()
          }
        }}>
          {showFieldBg ? "Hide" : "Show"} Field Background
        </button>

        <button onClick={() => addQrCode()}>QrCode</button>
        <button onClick={() => addBarcode()}>BarCode</button>
      </div>
    </>
  )

}

export default App