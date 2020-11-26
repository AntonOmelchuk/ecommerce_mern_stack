import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from '../../components/Card/ProductCard'
import Jumbotron from '../../components/Jumbotron/Jumbotron'
import SkeletonCard from '../../components/Card/SkeletonCard'

import { getProducts } from '../../actions/product'

const Home = () => {
  const PRODUCT_COUNT = 10
  const dispatch = useDispatch()
  const { product: { products }, general: { loading } } = useSelector(state => state)

  useEffect(() => {
    dispatch(getProducts(PRODUCT_COUNT))
  }, [dispatch])

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotron text={loading ? ['Loading...'] : ['Latest Products', 'New arrivals', 'Best Sellers']} />
      </div>
      <div className='container'>
        <div className='row'>
          {loading
            ? <SkeletonCard count={3} />
            : products.map(product => (
              <div key={product._id} className='col-md-4'>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Home
