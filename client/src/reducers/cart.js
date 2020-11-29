import { SET_CART_VALUE } from '../constants/actionTypes'

const initialState = {
  cart: []
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART_VALUE:
      return {
        ...state,
        cart: action.payload
      }
    default:
      return state
  }
}
