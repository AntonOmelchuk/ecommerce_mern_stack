/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import UserNav from '../../components/nav/UserNav'
import userAPI from '../../api/user'
import OrderItem from './components/OrderItem'

const History = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const [orders, serOrders] = useState([])

  useEffect(() => {
    userAPI.getOrders(user.token)
      .then(res => serOrders(res.data))
  }, [])
  console.log('orders: ', orders)
  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col text-center'>
          <h4>
            {orders.length ? 'User purchase orders' : 'No purchase orders'}
          </h4>
          {orders.length && orders.map(order => <OrderItem key={order._id} order={order} />)}
        </div>
      </div>
    </div>
  )
}

export default History
