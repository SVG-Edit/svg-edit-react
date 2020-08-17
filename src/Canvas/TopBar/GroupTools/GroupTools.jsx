import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../../IconButton/IconButton.jsx'

const GroupTools = ({ canvas, selectedElement, multiselected }) => (
  <>
    {multiselected && (
      <IconButton
        icon="Group"
        onClick={() => {
          canvas.groupSelectedElements()
        }}
      />
    )}
    {selectedElement?.tagName === 'g' && (
      <IconButton
        icon="ungroup"
        onClick={() => {
          canvas.ungroupSelectedElement()
        }}
      />
    )}
  </>
)

GroupTools.propTypes = {
  canvas: PropTypes.object,
  selectedElement: PropTypes.object,
  multiselected: PropTypes.bool.isRequired,
}
GroupTools.defaultProps = { canvas: null, selectedElement: null }

export default GroupTools
