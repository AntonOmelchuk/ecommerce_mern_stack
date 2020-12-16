import React from 'react'
import PropTypes from 'prop-types'
import OrderItemTable from './OrderItemTable'
import ShowPaymentInfo from './ShowPaymentInfo'
import DownloadLink from './DownloadLink'

const OrderItem = ({ order }) => {
  return (
    <div className='m-5 p-3 card'>
      <ShowPaymentInfo order={order} />
      <OrderItemTable order={order} />
      <div className='row'>
        <div className='col'>
          <DownloadLink order={order} />
        </div>
      </div>
    </div>
  )
}

OrderItem.propTypes = {
  order: PropTypes.shape({}).isRequired
}

export default OrderItem
