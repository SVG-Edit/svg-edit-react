import React from 'react'
import PropTypes from 'prop-types'
import SvgCanvas from '@svgedit/svgcanvas'
import svg from '../services/svg'
import config from './editor/config'
import TopBar from './TopBar/TopBar.jsx'
import LeftBar from './LeftBar/LeftBar.jsx'
import BottomBar from './BottomBar/BottomBar.jsx'
import updateCanvas from './editor/updateCanvas'

import { canvasContext, CanvasContextProvider } from './Context/canvasContext.jsx'

const Canvas = ({ svgContent, locale, svgUpdate, onClose, log }) => {
  const textRef = React.useRef(null)
  const svgcanvasRef = React.useRef(null)
  const oiAttributes = React.useRef(svg.saveOIAttr(svgContent))
  // const [open, setOpen] = React.useState(true)
  const [canvasState, dispatchCanvasState] = React.useContext(canvasContext)
  log('Canvas', { locale, canvasState })
  const updateContextPanel = () => {
    let elem = canvasState.selectedElement
    // If element has just been deleted, consider it null
    if (elem && !elem.parentNode) {
      elem = null
    }
    if (elem) {
      const { tagName } = elem
      if (tagName === 'text') {
        // we should here adapt the context to a text field
        textRef.current.value = elem.textContent
      }
    }
  }

  const selectedHandler = (win, elems) => {
    log('selectedHandler', elems)
    const selectedElement = elems.length === 1 || !elems[1] ? elems[0] : null
    const multiselected = (elems.length >= 2 && !!elems[1])
    dispatchCanvasState({
      type: 'selectedElement',
      selectedElement,
      multiselected,
    })
  }

  const changedHandler = (win, elems) => {
    log('changedHandler', { elems })
    dispatchCanvasState({ type: 'updated', updated: true })
  }

  const contextsetHandler = (win, context) => {
    dispatchCanvasState({ type: 'context', context })
  }

  const svgUpdateHandler = (svgString) => {
    svgUpdate(svg.restoreOIAttr(svgString, oiAttributes.current))
    console.log(canvasState)
    dispatchCanvasState({ type: 'updated', updated: false })
  }

  const onKeyUp = (event) => {
    dispatchCanvasState({ type: 'setTextContent', text: event.target.value })
  }

  const onKeyDown = (event) => {
    if (event.key === 'Backspace' && event.target.tagName !== 'INPUT') {
      event.preventDefault()
      dispatchCanvasState({ type: 'deleteSelectedElements' })
    }
  }
  // unused events -> we just log them in debug mode.
  const eventList = {
    selected: selectedHandler,
    changed: changedHandler,
    contextset: contextsetHandler,
    'extension-added': () => log('extensionAddedHandler'),
    cleared: () => log('clearedHandler'),
    exported: () => log('exportedHandler'),
    exportedPDF: () => log('exportedPDFHandler'),
    message: () => log('messageHandler'),
    pointsAdded: () => log('pointsAddedHandler'),
    saved: () => log('savedHandler'),
    setnonce: () => log('setnonceHandler'),
    unsetnonce: () => log('unsetnonceHandler'),
    transition: () => log('transitionHandler'),
    zoomed: () => log('zoomedHandler'),
    zoomDone: () => log('zoomDoneHandler'),
    updateCanvas: () => log('updateCanvasHandler'),
    extensionsAdded: () => log('extensionsAddedHandler'),
  }
  React.useLayoutEffect(() => {
    const editorDom = svgcanvasRef.current
    const canvas = new SvgCanvas(editorDom, config)
    updateCanvas(canvas, svgcanvasRef.current, config, true)
    console.log(canvas)
    canvas.textActions.setInputElem(textRef.current)
    Object.entries(eventList).forEach(([eventName, eventHandler]) => {
      canvas.bind(eventName, eventHandler)
    })
    dispatchCanvasState({ type: 'init', canvas, svgcanvas: editorDom, config })
    document.addEventListener('keydown', onKeyDown.bind(canvas))
    return () => {
      // cleanup function
      console.log('cleanup')
      document.removeEventListener('keydown', onKeyDown.bind(canvas))
    }
  }, [])

  React.useLayoutEffect(() => {
    log('new svgContent', svgContent.length)
    if (!canvasState.canvas) return
    oiAttributes.current = svg.saveOIAttr(svgContent)
    canvasState.canvas.clear()
    const success = canvasState.canvas.setSvgString(svgContent.replace(/'/g, "\\'"), true) // true => prevent undo
    updateCanvas(canvasState.canvas, svgcanvasRef.current, config, true)
    if (!success) throw new Error('Error loading SVG')
    dispatchCanvasState({ type: 'updated', updated: false })
  }, [svgContent, canvasState.canvas])

  updateContextPanel()
  return (
    <>
      <TopBar
        svgUpdate={svgUpdateHandler}
        onClose={onClose}
      />
      <LeftBar />
      <BottomBar />

      <div className="OIe-editor" role="main">
        <div className="workarea">
          <div ref={svgcanvasRef} className="svgcanvas" style={{ position: 'relative' }} />
        </div>
      </div>
      {/* below input is intentionnally kept off the visible window and is used for text edition */}
      <input ref={textRef} onKeyUp={onKeyUp} type="text" size="35" style={{ position: 'absolute', left: '-9999px' }} />
    </>
  )
}

Canvas.propTypes = {
  svgContent: PropTypes.string,
  locale: PropTypes.string.isRequired,
  svgUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  log: PropTypes.func.isRequired,
}

Canvas.defaultProps = { svgContent: '<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg"></svg>' }

const CanvasWithContext = (props) => (<CanvasContextProvider><Canvas {...props} /></CanvasContextProvider>)
export default CanvasWithContext
