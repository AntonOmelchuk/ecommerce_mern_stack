import { SET_CATEGORIES_DATA, SET_CURRENT_CATEGORY, SET_CATEGORY_PRODUCTS } from '../constants/actionTypes'

const initialState = {
  categories: [],
  currentCategory: undefined,
  categoryProducts: []
}

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES_DATA: {
      return {
        ...state,
        categories: action.payload
      }
    }
    case SET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload
      }
    }
    case SET_CATEGORY_PRODUCTS: {
      return {
        ...state,
        categoryProducts: action.payload
      }
    }
    default:
      return state
  }
}
