import { SET_USER_DATA } from '../constants/actionTypes'
import authAPI from '../api/auth'
import { redirectUserByRole } from '../utils/helpers/helpers';

const setUserData = data => {
  const {
    name, email, role, authtoken, _id
  } = data;
  return {
    type: SET_USER_DATA,
    payload: {
      name,
      email,
      authtoken,
      role,
      _id
    }
  }
}

export const checkAuth = (authtoken, history, toast, registrationName = '') => async (dispatch) => {
  try {
    const { status, data } = await authAPI.checkAuthToken(authtoken, registrationName)
    if (status === 200) {
      dispatch(setUserData(data))
      redirectUserByRole(data.role, history)
    } else {
      toast.error(`Error: ${data.error.message}`)
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`)
  }
}

export const getCurrentUser = (authtoken, toast) => async (dispatch) => {
  try {
    const { status, data } = await authAPI.getCurrentUser(authtoken)
    if (status === 200) {
      dispatch(setUserData(data))
    }
  } catch (error) {
    toast.error(error)
  }
}
