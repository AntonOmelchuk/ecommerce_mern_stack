import React from 'react'
import PropTypes from 'prop-types'
import SkeletonCard from '../../../components/Card/SkeletonCard'
import ProductCard from '../../../components/Card/ProductCard'

const BestSellers = ({ loading, products }) => {
  return (
    <>
      <h1 className='text-center dispaly-3 p-3 mt-5 mb-5 jumbotron'>Best Sellers</h1>
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

BestSellers.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default BestSellers
