import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { capitalize } from '../../utils/helpers/helpers'

const { Option } = Select

const MultipleSelect = ({
  name, values, selectedValues, onChange
}) => {
  return (
    <div className='mb-3'>
      <label>{capitalize(name)}</label>
      <Select
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Please select'
        value={selectedValues}
        name={name}
        onChange={onChange}
      >
        {values.map(({ _id, name: value }) => (
          <Option key={_id}>{value}</Option>
        ))}
      </Select>
    </div>
  )
}

MultipleSelect.propTypes = {
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.any),
  selectedValues: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
}

MultipleSelect.defaultProps = {
  name: '',
  values: [],
  selectedValues: [],
}

export default MultipleSelect
