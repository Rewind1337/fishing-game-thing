import { useState } from 'react'
import { useContext } from 'react';

import PageCore from './pages/PageCore';
import Sketch from 'react-p5'
import Button from '@mui/material/Button'
import SaveContext from './components/SaveContext';

function App() {
  const _context = useContext(SaveContext);

  const save = _context.save;

  const [varA, setVarA] = useState(10)
  const [varX1, setVarX1] = useState(0)
  const [varY1, setVarY1] = useState(0)
  const [varX2, setVarX2] = useState(0)
  const [varY2, setVarY2] = useState(0)

  const canvasWidth = 300;
  const canvasHeight = 300;

  const canvasMousePressed = () => { }
  const canvasMouseReleased = () => { }

  const canvasMouseMoved = (event) => {
    if (event.mouseX >= 0 && event.mouseX <= canvasWidth
      && event.mouseY >= 0 && event.mouseY <= canvasHeight) {
      setVarX2(event.mouseX)
      setVarY2(event.mouseY)
    }
  }

  const canvasMouseDragged = (event) => {
    if (event.mouseX >= 0 && event.mouseX <= canvasWidth
      && event.mouseY >= 0 && event.mouseY <= canvasHeight) {
      setVarX1(event.mouseX)
      setVarY1(event.mouseY)
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef)
    setVarX1(150)
    setVarY1(200)
    setVarX2(350)
    setVarY2(200)
  }

  const draw = p5 => {
    p5.background(255, 130, 20)
    p5.ellipse(varX1, varY1, varA)
    p5.ellipse(varX2, varY2, varA)
  }

  return (
    <PageCore>
      <Button variant="contained" onClick={() => setVarA((varA) => varA + 1)}>
        grow circle
      </Button>

      <Sketch mousePressed={canvasMousePressed} mouseReleased={canvasMouseReleased} mouseMoved={canvasMouseMoved} mouseDragged={canvasMouseDragged} setup={setup} draw={draw} />

      {JSON.stringify(save)}
    </PageCore>
  )
}

export default App;
