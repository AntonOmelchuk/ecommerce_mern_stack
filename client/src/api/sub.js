import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getSubs() {
    return instance.get('/subs')
  },
  getSub(slug) {
    return instance.get(`/sub/${slug}`)
  },
  createSub(authtoken, name, category) {
    return instance.post('/sub', { name, category }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  removeSub(authtoken, slug) {
    return instance.delete(`/sub/${slug}`, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  updateSub(authtoken, slug, name) {
    return instance.put(`/sub/${slug}`, { name }, {
      headers: {
        Authorization: authtoken
      }
    })
  }
}
