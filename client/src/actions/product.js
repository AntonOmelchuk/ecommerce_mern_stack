import { setLoadingValue } from './general'
import productAPI from '../api/product'
import { SET_PRODUCTS, SET_UPDATE_PRODUCT } from '../constants/actionTypes'

export const getProducts = (count = 10) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data, status } = await productAPI.getProducts(count)

    if (status === 200) {
      dispatch({ type: SET_PRODUCTS, payload: data })
    } else {
      console.error(data.error)
    }
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
    console.log('product: ', product)
    const { status, data } = await productAPI.updateProduct(token, slug, product)
    console.log('status: ', status, data)
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
