import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ title }) => {
  return (
    <div className='col-md-6'>
      <button type='button' className='btn btn-primary'>
        {title}
      </button>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired
}

export default Button
