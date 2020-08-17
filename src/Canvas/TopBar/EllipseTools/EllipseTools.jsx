import React from 'react'
import PropTypes from 'prop-types'

import AttributesTools from '../AttributesTools/AttributesTools.jsx'

const EllipseTools = ({ selectedElement }) => (
  <AttributesTools
    selectedElement={selectedElement}
    handleChange={() => {}}
    attributes={{
      cx: 'readOnly',
      cy: 'readOnly',
      rx: 'readOnly',
      ry: 'readOnly',
    }}
  />
)

EllipseTools.propTypes = { selectedElement: PropTypes.object.isRequired }

export default EllipseTools
