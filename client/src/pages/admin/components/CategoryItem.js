import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const CategoryItem = ({
  name, slug, removeHandler, setCurrentItem
}) => {
  const handleRemove = () => {
    const answer = window.confirm(`Delete ${name} category?`)
    if (answer) {
      removeHandler()
    }
  }

  return (
    <div className='alert alert-info'>
      {name}
      {' '}
      <span onClick={handleRemove} className='btn btn-sm float-right'>
        <DeleteOutlined className='text-danger' />
      </span>
      {' '}
      <Link to={`/admin/category/${slug}`} onClick={setCurrentItem}>
        <span className='btn btn-sm float-right'><EditOutlined className='text-warning' /></span>
      </Link>
    </div>
  )
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  removeHandler: PropTypes.func.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
}

export default CategoryItem
