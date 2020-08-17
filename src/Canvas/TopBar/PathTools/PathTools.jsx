import React from 'react'
import PropTypes from 'prop-types'

import AttributesTools from '../AttributesTools/AttributesTools.jsx'

const PathTools = ({ selectedElement }) => (
  <AttributesTools selectedElement={selectedElement} handleChange={() => {}} attributes={{ d: 'readOnly' }} />
)

PathTools.propTypes = { selectedElement: PropTypes.object.isRequired }

export default PathTools
