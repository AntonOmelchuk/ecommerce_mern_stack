import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ImageCarousel from './ImageCarousel'
import Details from './Details'

const SingleProduct = ({ product }) => {
  const {
    title, images, slug,
  } = product
  return (
    <>
      <div className='col-md-7'>
        {images.length && <ImageCarousel images={images} />}
      </div>
      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' />
              {' '}
              Add to Cart
            </>,
            <Link to={`/product-to-favourite/${slug}`}>
              <HeartOutlined className='text-info' />
              {' '}
              Add to Wishlist
            </Link>
          ]}
        >
          <Details product={product} />
        </Card>
      </div>
    </>
  )
}

SingleProduct.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
}

export default SingleProduct
