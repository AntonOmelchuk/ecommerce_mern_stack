import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  saveCart(authtoken, cart) {
    return instance.post('/cart', { cart }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  getCart(authtoken) {
    return instance.get('/cart', {
      headers: {
        Authorization: authtoken
      }
    })
  },
  removeCart(authtoken) {
    return instance.delete('/cart', {
      headers: {
        Authorization: authtoken
      }
    })
  },
  saveAddress(authtoken, address) {
    return instance.post('/address', { address }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  getAddress(authtoken) {
    return instance.get('/address', {
      headers: {
        Authorization: authtoken
      }
    })
  },
  createOrder(authtoken, stripeResponse) {
    return instance.post('/user/order', { stripeResponse }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  getOrders(authtoken) {
    return instance.get('/user/orders', {
      headers: {
        Authorization: authtoken
      }
    })
  },
}
