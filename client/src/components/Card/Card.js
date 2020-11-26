import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Meta } = Card

const ProductCard = ({ product, onRemoveIconHandler }) => {
  const {
    title,
    description,
    images
  } = product

  return (
    <Card
      cover={images.length ? (
        <img src={images[0].url} alt='product' style={{ height: '180px', objectFit: 'cover' }} className='p-1' />
      ) : <h1 style={{ textAlign: 'center', marginBottom: 0, paddingTop: '18px' }}>no image</h1>}
      className='m-2'
      actions={[
        <EditOutlined className='text-info' />,
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
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })),
  }).isRequired,
  onRemoveIconHandler: PropTypes.func.isRequired,
}

export default ProductCard
