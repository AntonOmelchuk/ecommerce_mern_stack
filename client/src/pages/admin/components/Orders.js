/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from '../../../components/ShowPaymentInfo/ShowPaymentInfo'

const Orders = ({ orders, handleOrderStatus }) => {
  return (
    <>
      {orders.map(order => (
        <div key={order._id} className='row pb-5'>
          <div className='btn-btn-block bg-light'>
            <ShowPaymentInfo order={order} showStatus={false} />
            <div className='row'>
              <div className='col-md-4'>Dilivery Status</div>
              <div className='col-md-8'>
                <select
                  onChange={({ target }) => handleOrderStatus(order._id, target.value)}
                  className='fomr-control'
                  defaultValue={order.orderStatus}
                  name='status'
                >
                  <option value='Not Processed'>Not Processed</option>
                  <option value='Processing'>Processing</option>
                  <option value='Dispatched'>Dispatched</option>
                  <option value='Cancelled'>Cancelled</option>
                  <option value='Completed'>Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

Orders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleOrderStatus: PropTypes.func.isRequired,
}

export default Orders
