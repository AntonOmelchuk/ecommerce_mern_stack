import { LOGGED_IN_USER } from '../constants/actionTypes'

export const login = (name, email, authtoken) => ({
  type: LOGGED_IN_USER,
  payload: {
    name,
    email,
    authtoken
  }
})

export const logiut = () => {}
