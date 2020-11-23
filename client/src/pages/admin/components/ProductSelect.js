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
        onSelect={onChange}
      >
        <option>Please select</option>
        {values.map(({ _id, name }) => <option key={_id} value={_id}>{name}</option>)}
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
