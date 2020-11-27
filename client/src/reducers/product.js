import {
  SET_PRODUCTS, SET_UPDATE_PRODUCT, SET_SORTED_PRODUCTS, SET_PRODUCT_WITH_DETAILS
} from '../constants/actionTypes'

const initialState = {
  products: [],
  updateProduct: {},
  productDetails: {}
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case SET_UPDATE_PRODUCT:
      return {
        ...state,
        updateProduct: action.payload
      }
    case SET_SORTED_PRODUCTS:
      return {
        ...state,
        [action.key]: action.payload
      }
    case SET_PRODUCT_WITH_DETAILS:
      return {
        ...state,
        productDetails: action.payload
      }
    default:
      return state
  }
}
