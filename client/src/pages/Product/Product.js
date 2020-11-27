import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector, batch } from 'react-redux'
import { toast } from 'react-toastify'
import { getProductDetails, getRelatedProducts, setProductRating } from '../../actions/product'
import SingleProduct from './components/SingleProduct'
import RelatedProducts from './components/RelatedProducts'

const Product = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { productDetails, relatedProducts } = useSelector(state => state.product)

  const slug = location.pathname.replace('/product/details/', '')

  const setRating = (token, productId, star) => {
    dispatch(setProductRating(token, productId, star, slug, toast))
  }

  useEffect(() => {
    batch(() => {
      dispatch(getProductDetails(slug))
      dispatch(getRelatedProducts(productDetails.category._id))
    })
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

      {!!relatedProducts.length && <RelatedProducts relatedProducts={relatedProducts} />}
    </div>
  )
}

export default Product
