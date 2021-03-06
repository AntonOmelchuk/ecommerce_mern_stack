import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Card from '../../../components/Card/Card'
import LoadingTitle from '../../../components/LoadingTitle/LoadingTitle'
import AdminNav from '../../../components/nav/AdminNav'

import { getProducts, removeProduct } from '../../../actions/product'

const AllPoducts = () => {
  const dispatch = useDispatch()
  const { auth: { user }, product: { products }, general: { loading } } = useSelector(state => state)

  const removeHandler = slug => {
    dispatch(removeProduct(user.token, slug, toast))
  }

  useEffect(() => {
    dispatch(getProducts(100))
  }, [])

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title='All Products' />
          <div className='row'>
            {products.map(product => (
              <div key={product._id} className='col-md-4 '>
                <Card
                  product={product}
                  onRemoveIconHandler={() => removeHandler(product.slug)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPoducts
