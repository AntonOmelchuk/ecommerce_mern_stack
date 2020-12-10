import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  createPayment(authtoken) {
    return instance.post('/create-payment', {}, {
      headers: {
        Authorization: authtoken
      }
    })
  },
}
