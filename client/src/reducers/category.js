import { SET_CATEGORIES_DATA } from '../constants/actionTypes'

const initialState = {
  categories: []
}

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES_DATA: {
      return {
        ...state,
        categories: action.payload
      }
    }
    default:
      return state
  }
}
