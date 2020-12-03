import { GET_CART, SET_CART_VALUE } from '../constants/actionTypes'

const initialState = {
  cart: [],
  cartFromDB: {}
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART_VALUE:
      return {
        ...state,
        cart: action.payload
      }
    case GET_CART:
      return {
        ...state,
        cartFromDB: action.payload
      }
    default:
      return state
  }
}
