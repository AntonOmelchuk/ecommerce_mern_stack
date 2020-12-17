import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getOrders(authtoken) {
    return instance.get('/admin/orders', {
      headers: {
        Authorization: authtoken
      }
    })
  },
  orderStatus(authtoken, orderId, orderStatus) {
    return instance.put('/admin/order-status', { orderId, orderStatus }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
}
