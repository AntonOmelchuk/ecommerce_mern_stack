/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const OrderItemTable = ({ order }) => {
  return (
    <table className='table table-boardered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map(p => (
          <tr key={p.product._id}>
            <td><b>{p.product.title}</b></td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>
              {
                p.product.shipping === 'Yes'
                  ? <CheckCircleOutlined style={{ color: 'green' }} />
                  : <CloseCircleOutlined style={{ color: 'red' }} />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
OrderItemTable.propTypes = {
  order: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
}

export default OrderItemTable
