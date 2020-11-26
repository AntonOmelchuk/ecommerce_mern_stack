import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/product'
import ProductCard from '../../components/Card/ProductCard'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'

const Home = () => {
  const dispatch = useDispatch()
  const { product: { products }, general: { loading } } = useSelector(state => state)

  useEffect(() => {
    dispatch(getProducts(10))
    return () => {}
  }, [dispatch])

  return (
    <>
      <div className='jumbotron'>
        <LoadingTitle title='All Products' loading={loading} />
      </div>
      <div className='container'>
        <div className='row'>
          {products.map(product => (
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
