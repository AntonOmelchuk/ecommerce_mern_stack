import {
  SET_PRODUCTS,
  SET_UPDATE_PRODUCT,
  SET_SORTED_PRODUCTS,
  SET_PRODUCT_WITH_DETAILS,
  SET_RELATED_PRODUCTS,
  SET_FILTER_VALUE,
  CLEAR_RELATED_PRODUCTS
} from '../constants/actionTypes'

const initialState = {
  products: [],
  updateProduct: {},
  productDetails: {},
  relatedProducts: [],
  filter: {
    price: [0, 0],
    category: [],
    rating: 0,
    colors: []
  }
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
    case SET_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProducts: action.payload
      }
    case SET_FILTER_VALUE:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      }
    case CLEAR_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProducts: [],
      }
    default:
      return state
  }
}
