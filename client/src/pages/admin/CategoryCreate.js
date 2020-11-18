import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import AdminNav from '../../components/nav/AdminNav'
import categoryAPI from '../../api/category'
import CategoryForm from './components/CategoryForm'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import { getAllCategories } from '../../actions/category'

const CategoryCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const { auth: { user } } = useSelector(state => state)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const { status } = await categoryAPI.createCategory(name, user.token)

      if (status === 200) toast.success(`Category "${name}" is created`)
      else toast.error('Something went wrong, please try again')
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data)
      else console.error(error)
    } finally {
      setName('')
      setLoading(false)
    }
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
            name={name}
            setName={setName}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate
