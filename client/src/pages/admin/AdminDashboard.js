import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../components/nav/AdminNav'
import adminAPI from '../../api/admin'
import Orders from './components/Orders'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector(state => state.auth)

  const getOrders = () => {
    adminAPI.getOrders(user.token)
      .then(({ data }) => setOrders(data))
  }

  const handleOrderStatus = (orderId, orderStatus) => {
    adminAPI.orderStatus(user.token, orderId, orderStatus)
      .then(() => {
        getOrders()
        toast.success('Status updated')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <h4>Admin Dashboard</h4>
          {orders && <Orders orders={orders} handleOrderStatus={handleOrderStatus} />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
