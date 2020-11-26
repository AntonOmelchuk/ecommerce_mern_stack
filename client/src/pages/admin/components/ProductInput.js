import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../../../utils/helpers/helpers'

const numberTypeInput = ['price', 'quantity']
const ProductInput = ({ prop, value, onChange }) => {
  return (
    <div className='form-group'>
      <label name={prop}>{capitalize(prop)}</label>
      <input
        type={numberTypeInput.includes(prop) ? 'number' : 'text'}
        name={prop}
        className='form-control'
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

ProductInput.propTypes = {
  prop: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ProductInput
