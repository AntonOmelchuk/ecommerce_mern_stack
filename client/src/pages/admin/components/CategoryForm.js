import React from 'react'
import PropTypes from 'prop-types'

const CategoryForm = ({
  handleSubmit, value, onChange, loading, placeholder
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <h4>Name</h4>
        <input
          type='text'
          className='form-control my-3'
          value={value}
          onChange={({ target }) => onChange(target.value)}
          placeholder={placeholder}
          autoFocus
          required
          disabled={loading}
          minLength={2}
          maxLength={32}
        />
        <button disabled={loading} type='submit' className='btn btn-outline-primary'>Save</button>
      </div>
    </form>
  )
}

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  loading: PropTypes.bool.isRequired,
}

CategoryForm.defaultProps = {
  placeholder: ''
}

export default CategoryForm
