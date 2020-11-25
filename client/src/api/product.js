import * as axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getProducts(count) {
    return instance.get(`/products/${count}`)
  },
  getSub(slug) {
    return instance.get(`/sub/${slug}`)
  },
  createProduct(authtoken, product) {
    return instance.post('/products', { product }, {
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
