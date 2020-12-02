import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  createCoupon(authtoken, coupon) {
    return instance.post('/coupons', coupon, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  getCoupons() {
    return instance.get('/coupons')
  },
  removeCoupon(authtoken, id) {
    return instance.delete(`/coupons/${id}`, {
      headers: {
        Authorization: authtoken
      }
    })
  },
}
