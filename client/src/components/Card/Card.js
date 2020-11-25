import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

const { Meta } = Card

const ProductCard = ({ product }) => {
  const {
    title,
    description,
    images
  } = product

  return (
    <Card
      cover={(
        <img
          src={images[0].url}
          alt='product'
          style={{
            height: '150px',
            objectFit: 'cover'
          }}
        />
      )}
      className='m-2'
    >
      <Meta title={title} description={description} />
    </Card>
  )
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })),
  }).isRequired
}

export default ProductCard
