// Global Context

import React from 'react'
import PropTypes from 'prop-types'

import updateCanvas from '../editor/updateCanvas'

const reducer = (state, action) => {
  let newMode
  const { canvas } = state
  switch (action.type) {
    case 'init':
      return { ...state, canvas: action.canvas, svgcanvas: action.svgcanvas, config: action.config }
    case 'mode':
      canvas.setMode(action.mode)
      return { ...state, mode: action.mode }
    case 'selectedElement':
      newMode = (canvas?.getMode() === 'select') ? { mode: 'select' } : {}
      return { ...state, selectedElement: action.selectedElement, multiselected: action.multiselected, ...newMode }
    case 'zoom':
      canvas.setZoom(action.zoom / 100)
      updateCanvas(canvas, state.svgcanvas, state.config, true)
      return { ...state, zoom: action.zoom }
    case 'context':
      return { ...state, context: action.context, layerName: canvas.getCurrentDrawing().getCurrentLayerName() }
    case 'color':
      canvas.setColor(action.colorType, action.color, false)
      // no need to memorize state for color
      return state
    case 'deleteSelectedElements':
      canvas.deleteSelectedElements()
      return state
    case 'setTextContent':
      canvas.setTextContent(action.text)
      return state
    case 'updated':
      newMode = (canvas?.getMode() !== 'textedit') ? { mode: 'select' } : {}
      return { ...state, updated: action.updated }
    default:
      throw new Error(`unknown action type: ${action.type}`)
  }
}

const canvasInitialState = {
  mode: 'select',
  selectedElement: null,
  multiselected: false,
  updated: false,
  zoom: 100,
  context: null,
  layerName: '',
}

const canvasContext = React.createContext()

const CanvasContextProvider = ({ children }) => (
  <canvasContext.Provider
    value={React.useReducer(reducer, canvasInitialState)}
  >
    {children}
  </canvasContext.Provider>
)

CanvasContextProvider.propTypes = { children: PropTypes.element.isRequired }

export { canvasContext, CanvasContextProvider }
