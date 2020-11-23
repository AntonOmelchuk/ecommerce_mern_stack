import { setLoadingValue } from './general'
import productAPI from '../api/product'
import { SET_PRODUCTS } from '../constants/actionTypes'

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setLoadingValue(true))
    const { data, status } = await productAPI.getProducts()

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

export const createProduct = (token, product, toast) => async (dispatch) => {
  try {
    dispatch(setLoadingValue(true))
    const { data, status } = await productAPI.createProduct(token, product)
    if (status === 200) {
      dispatch(getProducts())
      toast.success(`Product ${data.title} created`)
    } else {
      toast.error(data)
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}
