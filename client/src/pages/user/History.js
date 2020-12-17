import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserNav from '../../components/nav/UserNav'
import OrderItem from '../../components/Order/OrderItem'
import userAPI from '../../api/user'

const History = () => {
  const { user } = useSelector(state => state.auth)

  const [orders, serOrders] = useState([])

  useEffect(() => {
    userAPI.getOrders(user.token)
      .then(res => serOrders(res.data))
  }, [])

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
