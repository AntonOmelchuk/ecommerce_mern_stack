/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import OrderItemTable from './OrderItemTable'

const OrderItem = ({ order }) => {
  return (
    <div className='m-5 p-3 card'>
      <p>show payment info</p>
      <OrderItemTable order={order} />
      <div className='row'>
        <div className='col'>
          <p>PDF download</p>
        </div>
      </div>
    </div>
  )
}

OrderItem.propTypes = {
  order: PropTypes.shape({}).isRequired
}

export default OrderItem
