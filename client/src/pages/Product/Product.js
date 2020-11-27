/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/product'
import SingleProduct from './components/SingleProduct'

const Product = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { productDetails } = useSelector(state => state.product)

  const slug = location.pathname.replace('/product/details/', '')

  useEffect(() => {
    dispatch(getProductDetails(slug))
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct product={productDetails} />
      </div>
    </div>
  )
}

export default Product
