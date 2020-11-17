import React from 'react'
import PropTypes from 'prop-types'

const CategoryForm = ({
  handleSubmit, name, setName, loading
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <h4>Name</h4>
        <input
          type='text'
          className='form-control my-3'
          value={name}
          onChange={({ target }) => setName(target.value)}
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
  setName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default CategoryForm
