import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DetailsItem from './DetailsItem'
import DetailsMultipleValues from './DetailsMultipleValues'

const Details = ({ product }) => {
  const {
    price, subs, category, shipping, color, brand, quantity
  } = product
  const productDetails = {
    category, subs, price, color, brand, shipping, quantity
  }

  return (
    <ul className='list-group'>
      {Object.keys(productDetails).map(key => {
        if (typeof productDetails[key] !== 'object') {
          return <DetailsItem key={key} title={key} value={productDetails[key]} />
        } if (key === 'category') {
          const { slug, name } = productDetails.category
          return (
            <Link to={`/category/${slug}`} key={key}>
              <DetailsItem title={key} value={name} />
            </Link>
          )
        }
        return <DetailsMultipleValues key={key} title='Sub Categories' values={productDetails[key]} />
      })}
    </ul>
  )
}

Details.propTypes = {
  product: PropTypes.shape({
    color: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    subs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    category: PropTypes.shape({}).isRequired,
    shipping: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
}

export default Details
