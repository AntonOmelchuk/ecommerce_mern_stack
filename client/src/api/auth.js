import * as axios from 'axios'

const url = process.env.REACT_APP_API_BASE_URL

export default {
  checkAuthToken(authtoken) {
    axios.post(`${url}/create-or-update-user`, {}, {
      headers: {
        authtoken
      }
    })
  }
}
