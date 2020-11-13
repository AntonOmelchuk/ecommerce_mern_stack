import { LOGOUT_USER, SET_USER_DATA } from '../constants/actionTypes'

const initialState = {
  user: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.payload
      }
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
