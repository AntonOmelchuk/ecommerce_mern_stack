import { SET_SUB_DATA, SET_CURRENT_SUB } from '../constants/actionTypes'

const initialState = {
  subs: [],
  currentSub: undefined
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
    default:
      return state
  }
}
