import { batch } from 'react-redux'
import couponAPI from '../api/coupon'
import { COUPON_APPLIED, GET_COUPONS } from '../constants/actionTypes'
import { getCart } from './cart'
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

export const applyCoupon = (token, coupon, toast) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { data } = await couponAPI.applyCoupon(token, coupon)

    if (data) {
      batch(() => {
        dispatch({ type: COUPON_APPLIED, payload: true })
        dispatch(getCart(token))
      })
    }
    if (data.error) {
      dispatch({ type: COUPON_APPLIED, payload: false })
      toast.error(data.error)
    }
  } catch (error) {
    dispatch({ type: COUPON_APPLIED, payload: false })
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}
