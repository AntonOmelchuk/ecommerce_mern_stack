import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Meta } = Card

const ProductCard = ({ product, onRemoveIconHandler }) => {
  const {
    title,
    description,
    images,
    slug
  } = product

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
          <EditOutlined className='text-info' />
        </Link>,
        <DeleteOutlined className='text-danger' onClick={onRemoveIconHandler} />
      ]}
    >
      <Meta title={title} description={description} />
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
  onRemoveIconHandler: PropTypes.func.isRequired,
}

export default ProductCard
