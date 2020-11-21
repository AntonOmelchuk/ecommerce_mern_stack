import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useParams, useHistory } from 'react-router-dom'
import AdminNav from '../../../components/nav/AdminNav'
import LoadingTitle from '../../../components/LoadingTitle/LoadingTitle'
import CategoryForm from './CategoryForm'
import { updateCategory } from '../../../actions/category'

const CategoryUpdate = () => {
  const dispatch = useDispatch()
  const { currentCategory } = useSelector(state => state.category)
  const { user: { token } } = useSelector(state => state.auth)

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const { slug } = useParams()
  const history = useHistory()

  useEffect(() => {
    setName(currentCategory)
    return () => setName('')
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(updateCategory(token, slug, name, toast, setLoading, history, currentCategory))
  }

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title='Update category' />
          <CategoryForm
            onChange={setName}
            value={name}
            placeholder={`Update "${currentCategory}" category`}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryUpdate
