import { SET_CATEGORIES_DATA, SET_CURRENT_CATEGORY } from '../constants/actionTypes'

const initialState = {
  categories: [],
  currentCategory: undefined
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
    default:
      return state
  }
}
