import {
  SET_SUB_DATA, SET_CURRENT_SUB, SET_CATEGORY_SUBS, SET_SUB_PRODUCTS
} from '../constants/actionTypes'

const initialState = {
  subs: [],
  currentSub: undefined,
  categorySubs: [],
  subProducts: []
}

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUB_DATA: {
      return {
        ...state,
        subs: action.payload
      }
    }
    case SET_CURRENT_SUB: {
      return {
        ...state,
        currentSub: action.payload
      }
    }
    case SET_CATEGORY_SUBS: {
      return {
        ...state,
        categorySubs: action.payload
      }
    }
    case SET_SUB_PRODUCTS:
      return {
        ...state,
        subProducts: action.payload
      }
    default:
      return state
  }
}
