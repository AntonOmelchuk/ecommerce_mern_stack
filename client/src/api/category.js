import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getCategories() {
    return instance.post('/categories',)
  },
  getCategory(slug) {
    return instance.post(`/category/${slug}`)
  },
  createCategory(name, authtoken) {
    return instance.post('/category', { name }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  removeCategory(slug, authtoken) {
    return instance.delete(`/category/${slug}`, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  updateCategory(slug, authtoken, newName) {
    return instance.put(`/catagory/${slug}`, { newName }, {
      headers: {
        Authorization: authtoken
      }
    })
  }
}
