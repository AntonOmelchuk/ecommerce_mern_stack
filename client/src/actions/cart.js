import { GET_CART, SET_CART_VALUE } from '../constants/actionTypes';
import userAPI from '../api/user'

export const setCartValue = value => ({ type: SET_CART_VALUE, payload: value })

export const getCart = token => async dispatch => {
  try {
    const { data } = await userAPI.getCart(token)

    dispatch({ type: GET_CART, payload: data })
  } catch (error) {
    console.error(error)
  }
}
