import { SET_LOADING_VALUE, SET_SEARCH_VALUE } from '../constants/actionTypes'

const initialState = {
  loading: false,
  search: ''
}

export default function generalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_VALUE:
      return {
        ...state,
        loading: action.payload
      }
    case SET_SEARCH_VALUE:
      return {
        ...state,
        search: action.payload
      }
    default:
      return state
  }
}
