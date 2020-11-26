import React from 'react'
import PropTypes from 'prop-types'

import { Pagination } from 'antd'
import SkeletonCard from '../../../components/Card/SkeletonCard'
import ProductCard from '../../../components/Card/ProductCard'

const BestSellers = ({
  loading, products, count, perPage, page, setPage
}) => {
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
      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>
          <Pagination current={page} total={(count / perPage) * 10} onChange={value => setPage(value)} />
        </nav>
      </div>
    </>
  )
}

BestSellers.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default BestSellers
