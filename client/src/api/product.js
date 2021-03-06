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
  getProduct(authtoken, slug) {
    return instance.get(`/product/${slug}`, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  createProduct(authtoken, product) {
    return instance.post('/products', { product }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  removeProduct(authtoken, slug) {
    return instance.delete(`/products/${slug}`, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  updateProduct(authtoken, slug, product) {
    return instance.put(`/product/${slug}`, product, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  getSortedList(sort, order, page) {
    return instance.post('/products-sort', { sort, order, page })
  },
  getProductsTotalCount() {
    return instance.get('/products-total')
  },
  getProductDetails(slug) {
    return instance.get(`/product-details/${slug}`)
  },
  setProductRating(authtoken, productId, star) {
    return instance.put(`/product-rating/${productId}`, { star }, {
      headers: {
        Authorization: authtoken
      }
    })
  },
  getRelated(productId) {
    return instance.get(`/products/related/${productId}`)
  },
  searchProducts(search) {
    return instance.post('/products/search/', search)
  }
}
