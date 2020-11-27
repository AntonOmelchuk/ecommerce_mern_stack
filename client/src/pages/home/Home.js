import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'

import Jumbotron from '../../components/Jumbotron/Jumbotron'
import ProductsList from './components/ProductsList'

import productApi from '../../api/product'
import { getProducts, getSortedProducts } from '../../actions/product'
import CategoryList from '../../components/CategoryList/CategoryList'

const Home = () => {
  const PER_PAGE = 3
  const PRODUCT_COUNT = 10
  const CREATE_AT = 'createdAt'
  const SOLD = 'sold'

  const [count, setCount] = useState(0)
  const [newArrivalsPage, setNewArrivalPage] = useState(1)
  const [bestSellersPage, setBestSellersPage] = useState(1)

  const dispatch = useDispatch()

  const { product, general: { loading } } = useSelector(state => state)

  useEffect(() => {
    batch(() => {
      dispatch(getProducts(PRODUCT_COUNT))
      dispatch(getSortedProducts(CREATE_AT, 'desc', newArrivalsPage))
      dispatch(getSortedProducts(SOLD, 'desc', bestSellersPage))
    })
    productApi.getProductsTotalCount().then(res => {
      setCount(res.data)
    })
  }, [dispatch, newArrivalsPage, bestSellersPage])

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={loading ? ['Loading...'] : ['Latest Products', 'New arrivals', 'Best Sellers']} />
      </div>

      <ProductsList
        title='New Arrivals'
        loading={loading}
        products={product[CREATE_AT]}
        count={count}
        perPage={PER_PAGE}
        page={newArrivalsPage}
        setPage={setNewArrivalPage}
      />
      <ProductsList
        title='Best Sellers'
        loading={loading}
        products={product[SOLD]}
        count={count}
        perPage={PER_PAGE}
        page={bestSellersPage}
        setPage={setBestSellersPage}
      />
      <CategoryList />
    </>
  )
}

export default Home
