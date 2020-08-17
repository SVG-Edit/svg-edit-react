/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// General imports
import PropTypes from 'prop-types'
import React from 'react'
import colorString from 'color-string'
import { SketchPicker } from 'react-color'
import Icon from '../Icon/Icon.jsx'
import './ColorButton.less'

const ColorButton = ({ onChange, value, title }) => {
  const [display, setDisplay] = React.useState(false)
  const handleClick = () => setDisplay(!display)
  const onChangeComplete = (color) => {
    onChange(color?.hex)
    setDisplay(false)
  }

  const rgb = colorString.get.rgb(value) || [255, 255, 255] // or white
  return (
    <div>
      {display && rgb && (
        <SketchPicker
          className="OIe-tools-color-panel"
          color={colorString.to.hex(rgb)}
          onChangeComplete={onChangeComplete}
        />
      )}
      <Icon name={title} className="OIe-tools-color-title" />
      <div
        className="OIe-tools-color-sample"
        onClick={handleClick}
        style={{ backgroundColor: colorString.to.hex(rgb) }}
      />
    </div>
  )
}

// Properties restrictions
ColorButton.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
}

ColorButton.defaultProps = { value: '', title: '' }

export default ColorButton
