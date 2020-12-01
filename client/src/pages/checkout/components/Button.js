import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ title, onClick, disabled }) => {
  return (
    <div className='col-md-6'>
      <button type='button' disabled={disabled} onClick={onClick} className='btn btn-primary'>
        {title}
      </button>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Button
