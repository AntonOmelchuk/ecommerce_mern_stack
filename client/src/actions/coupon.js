import couponAPI from '../api/coupon'
import { GET_COUPONS } from '../constants/actionTypes'
import { setLoadingValue } from './general'

export const getCoupons = () => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await couponAPI.getCoupons()

    dispatch({ type: GET_COUPONS, payload: data })
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const createCoupon = (token, coupon) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await couponAPI.createCoupon(token, coupon)

    if (data.coupon) {
      dispatch(getCoupons())
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const removeCoupon = (token, id) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await couponAPI.removeCoupon(token, id)

    if (data.ok) {
      dispatch(getCoupons())
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}
