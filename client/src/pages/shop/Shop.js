import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import ProductCard from '../../components/Card/ProductCard'
import PriceFilter from './components/PriceFilter'
import CategoryFilter from './components/CategoryFilter'

import { getProducts, searchProducts } from '../../actions/product'

const Shop = () => {
  const COUNT = 12
  const dispatch = useDispatch()
  const { product: { products }, general: { loading, search } } = useSelector(state => state)

  useEffect(() => {
    dispatch(getProducts(COUNT))
  }, [])

  useEffect(() => {
    const delayed = setTimeout(() => {
      if (search.length === 0) {
        dispatch(getProducts(COUNT))
      } else {
        dispatch(searchProducts({ query: search }))
      }
    }, 500)

    return () => clearTimeout(delayed)
  }, [search])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <h4 className='pt-2'>Search/Filter</h4>
          <hr />
          <PriceFilter />
          <CategoryFilter />
        </div>
        <div className='col-md-9 pt-2'>
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
