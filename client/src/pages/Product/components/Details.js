import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DetailsItem from './DetailsItem'
import DetailsMultipleValues from './DetailsMultipleValues'

const Details = ({ product }) => {
  const {
    price, description, subs, category, shipping, color, brand, quantity
  } = product
  const productDetails = {
    category, subs, description, price, color, brand, shipping, quantity
  }

  return (
    <ul className='list-group'>
      {Object.keys(productDetails).map(key => {
        if (typeof productDetails[key] !== 'object') {
          return <DetailsItem key={key} title={key} value={productDetails[key]} />
        } if (key === 'category') {
          const { slug, name } = productDetails.category
          return (
            <Link to={`/category/${slug}`}>
              <DetailsItem key={key} title={key} value={name} />
            </Link>
          )
        }
        return <DetailsMultipleValues title='Sub Categories' values={productDetails[key]} />
      })}
    </ul>
  )
}

Details.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    subs: PropTypes.shape({}).isRequired,
    category: PropTypes.shape({}).isRequired,
    shipping: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
}

export default Details
