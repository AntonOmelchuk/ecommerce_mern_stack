import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../../../utils/helpers/helpers'

const ProductSelect = ({
  prop, onChange, values
}) => {
  return (
    <div className='from-group mb-3'>
      <label name={prop}>{capitalize(prop)}</label>
      <select
        name={prop}
        className='form-control'
        onChange={onChange}
      >
        <option value='default'>{values.length ? 'Please select' : 'No options'}</option>
        {values.map(({ _id, name }) => {
          const value = prop === 'category' ? _id : name
          return (
            <option key={_id} value={value}>{name}</option>
          )
        })}
      </select>
    </div>
  )
}

ProductSelect.propTypes = {
  prop: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default ProductSelect
