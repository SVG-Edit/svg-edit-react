import React from 'react'
import PropTypes from 'prop-types'

import AttributesTools from '../AttributesTools/AttributesTools.jsx'

const CircleTools = ({ selectedElement }) => (
  <AttributesTools
    selectedElement={selectedElement}
    handleChange={() => {}}
    attributes={{
      cx: 'readOnly',
      cy: 'readOnly',
      r: 'readOnly',
    }}
  />
)

CircleTools.propTypes = { selectedElement: PropTypes.object.isRequired }

export default CircleTools
