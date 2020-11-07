import { LOGGED_IN_USER, LOGOUT_USER } from '../constants/actionTypes'

const initialState = {
  user: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
