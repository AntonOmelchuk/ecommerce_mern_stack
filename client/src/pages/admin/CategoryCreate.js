import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import AdminNav from '../../components/nav/AdminNav'
import CategoryForm from './components/CategoryForm'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import { createCategory, getAllCategories } from '../../actions/category'
import CategoryItem from './components/CategoryItem'

const CategoryCreate = () => {
  const [categoryName, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const { auth: { user }, category } = useSelector(state => state)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(createCategory(user.token, categoryName, toast, setLoading, setName))
  }

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title='Create category' />
          <CategoryForm
            handleSubmit={handleSubmit}
            value={categoryName}
            onChange={setName}
            loading={loading}
          />
          <hr />
          {category.categories.map(({ _id, name, slug }) => (
            <CategoryItem key={_id} name={name} slug={slug} setLoading={setLoading} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate
