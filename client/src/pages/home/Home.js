import React, { useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'

import Jumbotron from '../../components/Jumbotron/Jumbotron'
import NewArrivals from './components/NewArrivals'
import BestSellers from './components/BestSellers'

import { getProducts, getSortedProducts } from '../../actions/product'

const Home = () => {
  const PRODUCT_COUNT = 10
  const CREATE_AT = 'createdAt'
  const SOLD = 'sold'
  const dispatch = useDispatch()
  const { product, general: { loading } } = useSelector(state => state)

  useEffect(() => {
    batch(() => {
      dispatch(getProducts(PRODUCT_COUNT))
      dispatch(getSortedProducts(CREATE_AT, 'desc', 10))
      dispatch(getSortedProducts(SOLD, 'desc', 10))
    })
  }, [dispatch])

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={loading ? ['Loading...'] : ['Latest Products', 'New arrivals', 'Best Sellers']} />
      </div>
      <NewArrivals loading={loading} products={product[CREATE_AT]} />
      <BestSellers loading={loading} products={product[SOLD]} />
    </>
  )
}

export default Home
