import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Card } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ImageCarousel from './ImageCarousel'
import Details from './Details'
import ProductTabs from './ProductTabs'
import Rating from '../../../components/Rating/Rating'
import LoadingTitle from '../../../components/LoadingTitle/LoadingTitle'

const SingleProduct = ({ product, setRating }) => {
  const {
    title, images, slug, description, ratings, _id
  } = product

  if (!title || !slug || !ratings) {
    return <LoadingTitle />
  }

  return (
    <>
      <div className='col-md-7'>
        {images.length && <ImageCarousel images={images} />}
        <ProductTabs description={description} />
      </div>
      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        <Rating ratings={ratings} id={_id} isSelectable setRating={setRating} />
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
    _id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({})),
    ratings: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  setRating: PropTypes.func.isRequired,
}

export default SingleProduct
