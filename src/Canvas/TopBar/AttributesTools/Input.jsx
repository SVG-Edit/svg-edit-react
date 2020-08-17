import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ type, defaultValue, handleChange, name }) => {
  const [value, setValue] = React.useState(defaultValue)
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => handleChange(name, e.target.value)}
      type={type}
      name={name}
    />
  )
  return input
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Input
