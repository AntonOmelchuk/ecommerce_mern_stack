import React from 'react'
import PropTypes from 'prop-types'

const ApplyCoupon = ({ value, onChange, onBtnClick }) => (
  <>
    <input
      type='text'
      className='from-control'
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
    <button type='button' onClick={onBtnClick} className='btn btn-primary mt-2'>Apply</button>
  </>
)

ApplyCoupon.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBtnClick: PropTypes.func.isRequired,
}

export default ApplyCoupon
