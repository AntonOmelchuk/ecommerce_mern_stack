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

export const checkAuth = (authtoken, history, registrationName = '') => async dispatch => {
  try {
    const { data } = await authAPI.checkAuthToken(authtoken, registrationName)
    redirectUserByRole(data.role, history)
    dispatch(setUserData(data, authtoken))
  } catch (error) {
    console.error(`Error: ${error.message}`)
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
