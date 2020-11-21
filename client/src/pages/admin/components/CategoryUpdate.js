import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useParams, useHistory } from 'react-router-dom'
import AdminNav from '../../../components/nav/AdminNav'
import LoadingTitle from '../../../components/LoadingTitle/LoadingTitle'
import CategoryForm from './CategoryForm'
import { updateCategory } from '../../../actions/category'
import { updateSub } from '../../../actions/sub'

const CategoryUpdate = () => {
  const dispatch = useDispatch()
  const {
    category: { currentCategory },
    sub: { currentSub },
    auth: { user },
    general: { loading }
  } = useSelector(state => state)

  const [name, setName] = useState('')
  const { slug } = useParams()
  const history = useHistory()

  useEffect(() => {
    setName(currentCategory)
    return () => setName('')
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (currentCategory) {
      return dispatch(updateCategory(user.token, slug, name, toast, history, currentCategory))
    }
    return dispatch(updateSub(user.token, slug, name, toast, history, currentSub))
  }

  const title = currentCategory ? 'Update category' : 'Update sub category'
  const placeholder = currentCategory ? `"${currentCategory}"` : `"${currentSub}" sub`

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title={title} />
          <CategoryForm
            onChange={setName}
            value={name}
            placeholder={`Update ${placeholder} category`}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryUpdate
