import { COUPON_APPLIED, GET_COUPONS } from '../constants/actionTypes'

const initialState = {
  coupons: [],
  appliedCoupon: false
}

export default function couponReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
        coupons: action.payload
      }
    case COUPON_APPLIED:
      return {
        ...state,
        appliedCoupon: action.payload
      }
    default:
      return state
  }
}
