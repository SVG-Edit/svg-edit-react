/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'

import './AttributesTools.less'

import Input from './Input.jsx'

const AttributesTools = ({ selectedElement, handleChange, attributes }) => (
  <div className="OIe-attributes-tools">
    <label key="tagName">
      Tag:
      <input type="text" name="tagName" readOnly value={selectedElement.tagName ?? ''} />
    </label>
    <label key="id">
      Id:
      <Input type="text" name="id" defaultValue={selectedElement.id ?? ''} handleChange={handleChange} />
    </label>
    {Object.entries(attributes).map(([attribute, type]) => {
      const round = (val) => {
        if (Number.isNaN(Number(val))) return val
        return Math.round((Number(val) + Number.EPSILON) * 1000) / 1000
      }
      const value = round(selectedElement.getAttribute(attribute)) ?? ''
      if (Array.isArray(type)) {
        // type is a list of values
        return (
          <label key={attribute}>
            {`${attribute}:`}
            <select defaultValue={value} onChange={(e) => handleChange(attribute, e.target.value)} name={attribute}>
              {type.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        )
      }
      if (type === 'text') {
        return (
          <label key={attribute}>
            {`${attribute}:`}
            <input
              type="text"
              name={attribute}
              onChange={(e) => handleChange(attribute, e.target.value)}
              defaultValue={value}
            />
          </label>
        )
      }
      if (type === 'number') {
        return (
          <label key={attribute}>
            {`${attribute}:`}
            <input
              type="number"
              name={attribute}
              onChange={(e) => handleChange(attribute, e.target.value)}
              defaultValue={value}
            />
          </label>
        )
      }
      // 'readonly field
      return (
        <label key={attribute}>
          {`${attribute}:`}
          <input type="text" name={attribute} readOnly value={value} />
        </label>
      )
    })}
  </div>
)

AttributesTools.propTypes = {
  attributes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedElement: PropTypes.object.isRequired,
}

export default AttributesTools
