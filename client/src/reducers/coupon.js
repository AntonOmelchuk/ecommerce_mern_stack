import { GET_COUPONS } from '../constants/actionTypes'

const initialState = {
  coupons: []
}

export default function couponReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        coupons: action.payload
      }
    default:
      return state
  }
}
