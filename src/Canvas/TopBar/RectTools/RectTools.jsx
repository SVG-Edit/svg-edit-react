import React from 'react'
import PropTypes from 'prop-types'

import AttributesTools from '../AttributesTools/AttributesTools.jsx'

const RectTools = ({ selectedElement }) => (
  <AttributesTools
    selectedElement={selectedElement}
    handleChange={() => {}}
    attributes={{
      x: 'readOnly',
      y: 'readOnly',
      width: 'readOnly',
      height: 'readOnly',
      stroke: 'readOnly',
      'stroke-width': 'readOnly',
    }}
  />
)

RectTools.propTypes = { selectedElement: PropTypes.object.isRequired }

export default RectTools
