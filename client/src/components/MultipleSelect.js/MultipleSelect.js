import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select

const MultipleSelect = ({
  name, label, values, selectedValues, onChange
}) => {
  return (
    <div className='mb-3'>
      <label>{label}</label>
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
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.any),
  selectedValues: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
}

MultipleSelect.defaultProps = {
  label: '',
  name: '',
  values: [],
  selectedValues: [],
}

export default MultipleSelect
