import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'

import Jumbotron from '../../components/Jumbotron/Jumbotron'
import NewArrivals from './components/NewArrivals'
import BestSellers from './components/BestSellers'

import productApi from '../../api/product'
import { getProducts, getSortedProducts } from '../../actions/product'

const Home = () => {
  const PER_PAGE = 3
  const PRODUCT_COUNT = 10
  const CREATE_AT = 'createdAt'
  const SOLD = 'sold'

  const [count, setCount] = useState(0)
  const [newArrivalsPage, setNewArrivalPage] = useState(1)

  const dispatch = useDispatch()

  const { product, general: { loading } } = useSelector(state => state)

  useEffect(() => {
    batch(() => {
      dispatch(getProducts(PRODUCT_COUNT))
      dispatch(getSortedProducts(CREATE_AT, 'desc', newArrivalsPage))
      dispatch(getSortedProducts(SOLD, 'desc', 10))
    })
    productApi.getProductsTotalCount().then(res => {
      setCount(res.data)
    })
  }, [dispatch, newArrivalsPage])

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={loading ? ['Loading...'] : ['Latest Products', 'New arrivals', 'Best Sellers']} />
      </div>
      <NewArrivals
        loading={loading}
        products={product[CREATE_AT]}
        count={count}
        perPage={PER_PAGE}
        page={newArrivalsPage}
        setPage={setNewArrivalPage}
      />
      <BestSellers loading={loading} products={product[SOLD]} />
    </>
  )
}

export default Home
