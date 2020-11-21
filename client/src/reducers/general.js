import { SET_LOADING_VALUE } from '../constants/actionTypes'

const initialState = {
  loading: false
}

export default function generalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_VALUE:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}
