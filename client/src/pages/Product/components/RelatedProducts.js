import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../../../components/Card/ProductCard'

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className='row pb-5'>
      {relatedProducts.map(product => (
        <div key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}

RelatedProducts.propTypes = {
  relatedProducts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default RelatedProducts
