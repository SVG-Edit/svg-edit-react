import React from 'react'
import PropTypes from 'prop-types'

import RectTools from './RectTools/RectTools.jsx'
import EllipseTools from './EllipseTools/EllipseTools.jsx'
import CircleTools from './CircleTools/CircleTools.jsx'
import PathTools from './PathTools/PathTools.jsx'
import TextTools from './TextTools/TextTools.jsx'
import GenericTools from './GenericTools/GenericTools.jsx'
import DelDupTools from './DelDupTools/DelDupTools.jsx'
import GroupTools from './GroupTools/GroupTools.jsx'
import AttributesTools from './AttributesTools/AttributesTools.jsx'

import { canvasContext } from '../Context/canvasContext.jsx'

import './TopBar.less'

const TopBar = ({ svgUpdate, onClose }) => {
  const [canvasState] = React.useContext(canvasContext)
  const { canvas, selectedElement, mode, updated } = canvasState
  console.info(mode, selectedElement?.tagName)
  const handleChange = (type, newVal) => {
    const elem = selectedElement
    switch (type) {
      case 'font-family':
        canvasState.canvas.setFontFamily(newVal)
        break
      case 'font-size':
        canvasState.canvas.setFontSize(newVal)
        break
      case 'id':
        // if the user is changing the id, then de-select the element first
        // change the ID, then re-select it with the new ID
        canvasState.canvas.clearSelection()
        elem.id = newVal
        canvasState.canvas.addToSelection([elem], true)
        break
      default:
        console.error(`type (${type}) not supported`)
    }
  }

  let ElementTools
  switch (canvasState.selectedElement?.tagName) {
    case 'rect':
      ElementTools = (
        <RectTools
          canvas={canvas}
          canvasUpdated={updated}
          selectedElement={selectedElement}
          svgUpdate={svgUpdate}
          onClose={onClose}
        />
      )
      break

    case 'circle':
      ElementTools = (
        <CircleTools
          canvas={canvas}
          canvasUpdated={updated}
          selectedElement={selectedElement}
          svgUpdate={svgUpdate}
          onClose={onClose}
        />
      )
      break

    case 'ellipse':
      ElementTools = (
        <EllipseTools
          canvas={canvas}
          canvasUpdated={updated}
          selectedElement={selectedElement}
          svgUpdate={svgUpdate}
          onClose={onClose}
        />
      )
      break

    case 'text':
      ElementTools = (
        <TextTools
          selectedElement={selectedElement}
          handleChange={handleChange}
        />
      )
      break

    case 'path':
      ElementTools = (
        <PathTools
          canvas={canvas}
          canvasUpdated={updated}
          selectedElement={selectedElement}
          svgUpdate={svgUpdate}
          onClose={onClose}
        />
      )
      break

    case 'g':
    case 'image':
    case 'line':
    case 'polygon':
    case 'polyline':
    case 'textPath':
    default:
      ElementTools = selectedElement && (
        <AttributesTools selectedElement={selectedElement} handleChange={handleChange} attributes={{}} />
      )
  }
  return (
    <div className="top-bar">
      <GenericTools
        canvas={canvas}
        canvasUpdated={updated}
        selectedElement={selectedElement}
        svgUpdate={svgUpdate}
        onClose={onClose}
      />
      <DelDupTools canvas={canvas} />
      <GroupTools canvas={canvas} multiselected={canvasState.multiselected} selectedElement={selectedElement} />
      {ElementTools && ElementTools}
    </div>
  )
}

TopBar.propTypes = {
  svgUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default TopBar

/*

The rect element
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
x The x position of the top left corner of the rectangle.
y The y position of the top left corner of the rectangle.
width The width of the rectangle
height The height of the rectangle
rx The x radius of the corners of the rectangle
ry The y radius of the corners of the rectangle

The circle element
<circle cx="25" cy="75" r="20"/>
r The radius of the circle.
cx The x position of the center of the circle.
cy The y position of the center of the circle.

Ellipse
<ellipse cx="75" cy="75" rx="20" ry="5"/>
rx The x radius of the ellipse.
ry The y radius of the ellipse.
cx The x position of the center of the ellipse.
cy The y position of the center of the ellipse.

Line
<line x1="10" x2="50" y1="110" y2="150"/>
x1 The x position of point 1.
y1 The y position of point 1.
x2 The x position of point 2.
y2 The y position of point 2.

Polyline
<polyline points="60, 110 65, 120 70, 115 75, 130 80, 125 85, 140 90, 135 95, 150 100, 145"/>
points A list of points, each number separated by a space, comma, EOL, or a line feed character.
Each point must contain two numbers, an x coordinate and a y coordinate.
So the list (0,0), (1,1), and (2,2) would be written as 0, 0 1, 1 2, 2.

Polygon
<polygon points="50, 160 55, 180 70, 180 60, 190 65, 205 50, 195 35, 205 40, 190 30, 180 45, 180"/>
points A list of points, each number separated by a space, comma, EOL, or a line feed character.
Each point must contain two numbers, an x coordinate and a y coordinate.
So the list (0,0), (1,1), and (2,2) would be written as 0, 0 1, 1 2, 2.
The drawing then closes the path, so a final straight line would be drawn from (2,2) to (0,0).

Path
<path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
d A list of points and other information about how to draw the path. See the Paths section for more information.

*/
