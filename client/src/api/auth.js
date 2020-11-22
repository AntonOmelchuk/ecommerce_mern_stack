import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  checkAuthToken(authtoken, name) {
    return instance.post('/create-or-update-user', { name }, {
      headers: {
        Authorization: authtoken,
      }
    })
  },
  getCurrentUser(authtoken) {
    return instance.post('/current-user', {}, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  isAdmin(authtoken, email) {
    return instance.post('/current-admin', { email }, {
      headers: {
        Authorization: authtoken
      }
    })
  }
}
