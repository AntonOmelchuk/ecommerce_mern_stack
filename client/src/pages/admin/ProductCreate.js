import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { toast } from 'react-toastify'

import AdminNav from '../../components/nav/AdminNav'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import ProductInput from './components/ProductInput'
import ProductSelect from './components/ProductSelect'

import { createProduct, getProducts } from '../../actions/product'
import { capitalize } from '../../utils/helpers/helpers'
import { getAllCategories } from '../../actions/category'
import initialState from '../../constants/initialStates'

const ProductCreate = () => {
  const [values, setValues] = useState(initialState)
  const {
    general: { loading }, auth: { user }, category: { categories }
  } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(getAllCategories())
      dispatch(getProducts())
    })
    setValues({ ...values, category: [...categories.map(({ _id, name }) => ({ _id, name }))] })
  }, [dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    const newProduct = { ...values, brand: capitalize(values.brand), color: capitalize(values.color) }
    dispatch(createProduct(user.token, newProduct, toast, () => setValues(initialState)))
  }

  const renderFormContent = () => {
    return Object.keys(values).map((key) => {
      if (typeof values[key] === 'string') {
        return (
          <ProductInput
            key={key}
            prop={key}
            value={values[key]}
            onChange={({ target }) => setValues({ ...values, [key]: target.value })}
          />
        )
      }
      return (
        <ProductSelect
          key={key}
          prop={key}
          values={values[key]}
          onChange={({ target }) => setValues({ ...values, [key]: target.value })}
        />
      )
    })
  }

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <LoadingTitle loading={loading} title='Create product' />
          <form onSubmit={handleSubmit} className='form-group'>
            {renderFormContent()}
            <button type='submit' className='btn btn-outline-info'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
