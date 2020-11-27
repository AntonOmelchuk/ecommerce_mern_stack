import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProductDetails, setProductRating } from '../../actions/product'
import SingleProduct from './components/SingleProduct'

const Product = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { productDetails } = useSelector(state => state.product)

  const slug = location.pathname.replace('/product/details/', '')

  const setRating = (token, productId, star) => {
    dispatch(setProductRating(token, productId, star, slug, toast))
  }

  useEffect(() => {
    dispatch(getProductDetails(slug))
  }, [dispatch])

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct product={productDetails} setRating={setRating} />
      </div>

      <div className='row p-5'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h1>Realted Products</h1>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default Product
