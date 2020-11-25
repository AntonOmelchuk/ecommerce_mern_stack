import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  upload(authtoken, image) {
    return instance.post('/images', { image }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
}
