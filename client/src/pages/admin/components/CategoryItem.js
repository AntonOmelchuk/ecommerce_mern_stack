import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { removeCategory, setCurrentCategory } from '../../../actions/category'

const CategoryItem = ({ name, slug, setLoading }) => {
  const dispatch = useDispatch()
  const { user: { token } } = useSelector(state => state.auth)

  const handleRemove = () => {
    const answer = window.confirm(`Delete ${name} category?`)
    if (answer) {
      dispatch(removeCategory(token, slug, toast, setLoading))
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
      <Link to={`/admin/category/${slug}`} onClick={() => dispatch(setCurrentCategory(name))}>
        <span className='btn btn-sm float-right'><EditOutlined className='text-warning' /></span>
      </Link>
    </div>
  )
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default CategoryItem
