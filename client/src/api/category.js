import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getCategories() {
    return instance.get('/categories')
  },
  getCategory(slug) {
    return instance.get(`/category/${slug}`)
  },
  createCategory(authtoken, name) {
    return instance.post('/category', { name }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  removeCategory(authtoken, slug) {
    return instance.delete(`/category/${slug}`, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  updateCategory(authtoken, slug, name) {
    return instance.put(`/category/${slug}`, { name }, {
      headers: {
        Authorization: authtoken
      }
    })
  }
}
