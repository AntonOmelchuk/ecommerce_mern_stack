/* eslint-disable import/prefer-default-export */
import { SET_CART_VALUE } from '../constants/actionTypes';

export const setCartValue = value => ({ type: SET_CART_VALUE, payload: value })
