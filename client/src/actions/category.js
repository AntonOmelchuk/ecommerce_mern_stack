import categoryAPI from '../api/category'
import { SET_CATEGORIES_DATA, SET_CURRENT_CATEGORY } from '../constants/actionTypes'

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

export const createCategory = (token, name, toast, setLoading, setName) => async (dispatch) => {
  try {
    setLoading(true)
    const { status } = await categoryAPI.createCategory(token, name)

    if (status === 200) toast.success(`Category "${name}" is created`)
    else toast.error('Something went wrong, please try again')
  } catch (error) {
    if (error.response.status === 400) toast.error(error.response.data)
    else console.error(error)
  } finally {
    setName('')
    setLoading(false)
    dispatch(getAllCategories())
  }
}

export const removeCategory = (token, slug, toast, setLoading) => async (dispatch) => {
  try {
    setLoading(true)
    const response = await categoryAPI.removeCategory(token, slug)

    if (response.status === 200) {
      const { data } = response
      toast.success(`Category ${data.name} deleted`)
      dispatch(getAllCategories());
    } else {
      toast.error(response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

export const updateCategory = (token, slug, name, toast, setLoading, history) => async (dispatch) => {
  try {
    setLoading(true)

    const response = await categoryAPI.updateCategory(token, slug, name)

    if (response.status === 200) {
      const { data } = response
      toast.success(`Category ${name} updated to ${data.name}`)
      dispatch(getAllCategories());
      history.push('/admin/category')
    } else {
      toast.error(response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

export const setCurrentCategory = category => ({ type: SET_CURRENT_CATEGORY, payload: category })
