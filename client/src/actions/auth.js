import { LOGGED_IN_USER } from '../constants/actionTypes'
import authAPI from '../api/auth'

export const checkAuth = (authtoken, callback, toast, registrationName = '') => async (dispatch) => {
  try {
    const { status, data } = await authAPI.checkAuthToken(authtoken, registrationName)
    if (status === 200) {
      const {
        name, email, role, _id
      } = data;
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          name,
          email,
          authtoken,
          role,
          _id
        }
      })

      callback()
    } else {
      toast.error(`Error: ${data.error.message}`)
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`)
  }
}

export const logiut = () => {}
