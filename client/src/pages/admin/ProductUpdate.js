import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import AdminNav from '../../components/nav/AdminNav'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import ProductInput from './components/ProductInput'
import ProductSelect from './components/ProductSelect'
import FileUpload from '../../components/FileUpload/FileUpload'

import { getProduct, updateProduct } from '../../actions/product'
import initialState from '../../constants/initialStates'

const ProductUpdate = () => {
  const [product, setProduct] = useState(initialState)
  const location = useLocation()
  const slug = location.pathname.replace('/product/', '')

  const { general: { loading }, auth: { user } } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(user.token, slug, setProduct))
  }, [dispatch])

  const handleUpdate = () => {
    dispatch(updateProduct(user.token, slug, product, toast))
  }

  const renderFormContent = () => {
    return Object.keys(product).map((key) => {
      if (typeof product[key] === 'string' || typeof product[key] === 'number') {
        return (
          <ProductInput
            key={key}
            prop={key}
            value={product[key]}
            onChange={({ target }) => setProduct({ ...product, [key]: target.value })}
          />
        )
      } if (key === 'images') {
        return <FileUpload key={key} values={product} setValues={setProduct} />
      }
      return (
        <ProductSelect
          key={key}
          prop={key}
          values={product[key]}
          onChange={({ target }) => setProduct({ ...product, [key]: target.value })}
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
          <LoadingTitle loading={loading} title='Update product' />
          <form onSubmit={handleUpdate} className='form-group'>
            {renderFormContent()}
            <button
              type='submit'
              className='btn btn-outline-info'
              disabled={loading}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate
