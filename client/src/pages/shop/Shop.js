import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import ProductCard from '../../components/Card/ProductCard'
import PriceFilter from './components/PriceFilter'
import CategoryFilter from './components/CategoryFilter'

import { filterProducts, getProducts, searchProducts } from '../../actions/product'
import StarsFilter from './components/StarsFilter'
import ColorsFilter from './components/ColorsFilter'

const Shop = () => {
  const COUNT = 12

  const dispatch = useDispatch()
  const { product: { products, filter }, general: { loading, search } } = useSelector(state => state)
  const {
    category, price, rating, colors
  } = filter
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

    return () => {
      clearTimeout(delayed)
      dispatch(filterProducts({
        price: [0, 0],
        category: [],
        rating: 0,
        colors: []
      }))
    }
  }, [search])

  const filteredProdcuts = () => {
    let newProducts = [...products]
    if (price[1] > 0) {
      newProducts = products.filter(product => product.price >= price[0] && product.price <= price[0])
    }
    if (category.length > 0) {
      newProducts = newProducts.filter(product => category.includes(product.category.name))
    }
    if (rating > 0) {
      newProducts = newProducts.filter(product => (
        product.ratings.length > 0
        && Math.floor((product.ratings.reduce((acc, item) => acc + item.star, 0) / product.ratings.length)) === rating
      ))
    }
    if (colors.length > 0) {
      newProducts = newProducts.filter(product => colors.includes(product.color))
    }

    return newProducts
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <h4 className='pt-2'>Search/Filter</h4>
          <hr />
          <PriceFilter />
          <CategoryFilter />
          <StarsFilter />
          <ColorsFilter />
        </div>
        <div className='col-md-9 pt-2'>
          <LoadingTitle loading={loading} title='Products' />
          {
          filteredProdcuts().length < 1 ? (
            <p>No products found</p>
          ) : (
            <div className='row'>
              {filteredProdcuts().map(product => (
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
