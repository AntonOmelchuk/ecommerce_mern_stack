import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { Card, Tooltip } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Rating from '../Rating/Rating'

import { setCartValue } from '../../actions/cart'

const { Meta } = Card

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add')

  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)

  const {
    title, description, images, slug, ratings, price
  } = product
  const descr = description.length > 43 ? `${description.substring(0, 42)}...` : description

  const handleSetCartValue = () => {
    cart.push({
      ...product,
      count: 1
    })

    const unique = _.unionWith(cart, _.isEqual)

    dispatch(setCartValue(unique))
    setTooltip('Added')
  }

  return (
    <>
      {
          ratings.length > 0 ? (
            <Rating ratings={ratings} isSelectable={false} />
          ) : (
            <div className='text-center pt-1 pb-3'>No rating yet</div>
          )
        }
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
          <Link to={`/product/details/${slug}`}>
            <EyeOutlined className='text-info' />
            {' '}
            <br />
            {' '}
            View Product
          </Link>,
          <Tooltip title={tooltip}>
            <div onClick={handleSetCartValue}>
              <ShoppingCartOutlined className='text-info' />
              {' '}
              <br />
              {' '}
              Add to Cart
            </div>
          </Tooltip>
        ]}
      >
        <Meta title={`${title} - $${price}`} description={descr} />
      </Card>
    </>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    ratings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })),
  }).isRequired,
}

export default ProductCard
