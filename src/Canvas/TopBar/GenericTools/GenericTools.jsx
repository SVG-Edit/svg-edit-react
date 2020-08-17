import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '../../IconButton/IconButton.jsx'

const GenericTools = ({ canvas, canvasUpdated, svgUpdate, onClose }) => {
  const onClickUndo = () => {
    canvas.undoMgr.undo()
    // populateLayers()
  }
  const onClickRedo = () => {
    canvas.undoMgr.redo()
    // populateLayers()
  }
  const onClickClose = () => {
    if (canvasUpdated) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('A change was not saved, do you really want to exit?')) return
    }
    onClose()
  }
  return (
    <>
      <IconButton
        icon="Close"
        onClick={onClickClose}
      />
      <IconButton
        icon="Save"
        className={canvasUpdated ? 'enabled' : 'disabled'}
        onClick={() => {
          svgUpdate(canvas.getSvgString())
        }}
      />
      <IconButton icon="Undo" onClick={onClickUndo} />
      <IconButton icon="Redo" onClick={onClickRedo} />
    </>
  )
}

GenericTools.propTypes = {
  canvas: PropTypes.object,
  svgUpdate: PropTypes.func.isRequired,
  canvasUpdated: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
GenericTools.defaultProps = { canvas: null }

export default GenericTools
