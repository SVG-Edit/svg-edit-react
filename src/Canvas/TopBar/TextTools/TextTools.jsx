import React from 'react'
import PropTypes from 'prop-types'

import AttributesTools from '../AttributesTools/AttributesTools.jsx'

const TextTools = ({ selectedElement, handleChange }) => (
  <AttributesTools
    selectedElement={selectedElement}
    handleChange={handleChange}
    attributes={{
      x: 'readOnly',
      y: 'readOnly',
      'font-family': ['arial', 'newroman', 'serif', 'sans-serif', 'fantasy', 'monospace'],
      'font-size': 'number',
    }}
  />
)

TextTools.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selectedElement: PropTypes.object.isRequired,
}

export default TextTools
