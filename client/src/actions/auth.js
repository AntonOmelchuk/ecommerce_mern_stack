import { SET_USER_DATA } from '../constants/actionTypes'
import authAPI from '../api/auth'
import { redirectUserByRole } from '../utils/helpers/helpers';

const setUserData = (data, token) => {
  const {
    name, email, role, _id
  } = data;

  return {
    type: SET_USER_DATA,
    payload: {
      name,
      email,
      token,
      role,
      _id
    }
  }
}

export const checkAuth = (authtoken, history, toast, registrationName = '') => async dispatch => {
  try {
    const { status, data } = await authAPI.checkAuthToken(authtoken, registrationName)
    if (status === 200) {
      dispatch(setUserData(data, authtoken))
      redirectUserByRole(data.role, history)
    } else {
      toast.error(`Error: ${data.error.message}`)
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`)
  }
}

export const getCurrentUser = (authtoken, toast) => async dispatch => {
  try {
    const { status, data } = await authAPI.getCurrentUser(authtoken)
    if (status === 200) {
      dispatch(setUserData(data, authtoken))
    }
  } catch (error) {
    toast.error(error)
  }
}
