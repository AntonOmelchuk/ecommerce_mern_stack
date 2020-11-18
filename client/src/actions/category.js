import categoryAPI from '../api/category'
import { SET_CATEGORIES_DATA } from '../constants/actionTypes'

// eslint-disable-next-line import/prefer-default-export
export const getAllCategories = () => async (dispatch) => {
  try {
    const response = await categoryAPI.getCategories()

    if (response.status === 200) {
      dispatch({ type: SET_CATEGORIES_DATA, payload: response.data })
    } else {
      console.error(response.error)
    }
  } catch (error) {
    console.error(error)
  }
}
