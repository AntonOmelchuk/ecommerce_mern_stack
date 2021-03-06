/* eslint-disable no-use-before-define */
import { setLoadingValue } from './general'
import productAPI from '../api/product'
import {
  CLEAR_RELATED_PRODUCTS,
  SET_FILTER_VALUE,
  SET_PRODUCTS, SET_PRODUCT_WITH_DETAILS, SET_RELATED_PRODUCTS, SET_SORTED_PRODUCTS, SET_UPDATE_PRODUCT
} from '../constants/actionTypes'

export const setProducts = data => ({ type: SET_PRODUCTS, payload: data })

export const getProducts = (count = 10) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await productAPI.getProducts(count)

    dispatch(setProducts(data))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const setUpdateProduct = product => ({ type: SET_UPDATE_PRODUCT, payload: product })

export const getProduct = (token, slug, setProduct) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await productAPI.getProduct(token, slug)

    const {
      title, description, price, quantity, images,
    } = data

    const product = {
      title,
      description,
      price,
      quantity,
      images,
      shipping: [{ _id: 'Yes', name: 'Yes' }, { _id: 'No', name: 'No' }],
      color: [
        { _id: 0, name: 'Black' },
        { _id: 1, name: 'White' },
        { _id: 2, name: 'Silver' },
        { _id: 3, name: 'Brown' },
        { _id: 4, name: 'Blue' }
      ],
    }

    dispatch(setUpdateProduct(product))
    setProduct(product)
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const createProduct = (token, product, toast, callback) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data, status } = await productAPI.createProduct(token, product)
    if (status === 200) {
      callback()
      dispatch(getProducts())
      toast.success(`Product ${data.title} created`)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error?.data?.message || error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const removeProduct = (token, slug, toast) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data, status } = await productAPI.removeProduct(token, slug)
    if (status === 200) {
      dispatch(getProducts())
      toast.success(`Product ${data.title} deleted`)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error?.data?.message || error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const updateProduct = (token, slug, product, toast) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))

    const { status } = await productAPI.updateProduct(token, slug, product)

    if (status === 200) {
      toast.success(`${product.title} updated`)
      dispatch(getProducts())
    }
  } catch (error) {
    toast.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const getSortedProducts = (sort, order, limit) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await productAPI.getSortedList(sort, order, limit)

    dispatch({ type: SET_SORTED_PRODUCTS, payload: data, key: sort })
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const setProductRating = (token, productId, star, slug, toast) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { status } = await productAPI.setProductRating(token, productId, star)

    if (status === 200) {
      dispatch(getProductDetails(slug))
      toast.success('Thanks for your review.')
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const getRelatedProducts = productId => async dispatch => {
  try {
    dispatch(setLoadingValue(true))

    const { data } = await productAPI.getRelated(productId)

    dispatch(setRelatedProducts(data))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const setProductDetails = product => ({ type: SET_PRODUCT_WITH_DETAILS, payload: product })

export const getProductDetails = slug => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await productAPI.getProductDetails(slug)

    dispatch(setProductDetails(data))
    dispatch(getRelatedProducts(data.category._id))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const setRelatedProducts = data => ({ type: SET_RELATED_PRODUCTS, payload: data })

export const clearRelatedProducts = () => ({ type: CLEAR_RELATED_PRODUCTS })

export const searchProducts = search => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await productAPI.searchProducts(search)
    dispatch(setProducts(data))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const filterProducts = filter => ({ type: SET_FILTER_VALUE, payload: filter })
