import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  createPayment(authtoken, coupon) {
    return instance.post('/create-payment', { coupon }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
}
