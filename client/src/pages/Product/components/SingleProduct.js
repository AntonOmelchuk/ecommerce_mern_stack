/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ImageCarousel from './ImageCarousel'

const { Meta } = Card

const SingleProduct = ({ product }) => {
  const {
    title, description, images, slug
  } = product
  return (
    <>
      <div className='col-md-7'>
        {images.length && <ImageCarousel images={images} />}
      </div>
      <div className='col-md-5'>
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
          <Meta title={title} description={description} />
        </Card>
      </div>
    </>
  )
}

SingleProduct.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape)
  }).isRequired,
}

export default SingleProduct
