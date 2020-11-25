import { SET_PRODUCTS } from '../constants/actionTypes'

const initialState = {
  products: [],
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    default:
      return state
  }
}
