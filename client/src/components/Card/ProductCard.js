import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Meta } = Card

const ProductCard = ({ product }) => {
  const {
    title, description, images, slug
  } = product
  const descr = description.length > 43 ? `${description.substring(0, 42)}...` : description
  return (
    <Card
      cover={images.length ? (
        <img src={images[0].url} alt='product' style={{ height: '180px', objectFit: 'cover' }} className='p-1' />
      ) : (
        <h1 style={{
          height: '162px', textAlign: 'center', marginBottom: 0, paddingTop: '18px'
        }}
        >
          no image
        </h1>
      )}
      className='m-2'
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className='text-info' />
          {' '}
          <br />
          {' '}
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined className='text-info' />
          {' '}
          <br />
          {' '}
          Add to Cart
        </>
      ]}
    >
      <Meta title={title} description={descr} />
    </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })),
  }).isRequired,
}

export default ProductCard
