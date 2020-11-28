import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import ProductCard from '../../components/Card/ProductCard'

import { getProducts } from '../../actions/product'

const Shop = () => {
  const COUNT = 12
  const dispatch = useDispatch()
  const { product: { products }, general: { loading } } = useSelector(state => state)

  useEffect(() => {
    dispatch(getProducts(COUNT))
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>search/filter menu</div>
        <div className='col-md-9'>
          <LoadingTitle loading={loading} title='Products' />
          {
          products.length < 1 ? (
            <p>No products found</p>
          ) : (
            <div className='row'>
              {products.map(product => (
                <div key={product._id} className='col-md-4'>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default Shop
