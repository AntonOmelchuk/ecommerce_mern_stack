import categoryAPI from '../api/category'
import { setLoadingValue } from './general'
import { SET_CATEGORIES_DATA, SET_CURRENT_CATEGORY } from '../constants/actionTypes'

export const setCurrentCategory = category => ({ type: SET_CURRENT_CATEGORY, payload: category })

export const getAllCategories = () => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const response = await categoryAPI.getCategories()

    if (response.status === 200) {
      dispatch({ type: SET_CATEGORIES_DATA, payload: response.data })
    } else {
      console.error(response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const createCategory = (token, name, toast, setName) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const { status } = await categoryAPI.createCategory(token, name)

    if (status === 200) toast.success(`Category "${name}" is created`)
    else toast.error('Something went wrong, please try again')
  } catch (error) {
    if (error.response.status === 400) toast.error(error.response.data)
    else console.error(error)
  } finally {
    setName('')
    dispatch(setLoadingValue(false))
    dispatch(getAllCategories())
  }
}

export const removeCategory = (token, slug, toast) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))
    const response = await categoryAPI.removeCategory(token, slug)

    if (response.status === 200) {
      const { data } = response
      toast.success(`Category "${data.name}" deleted`)
      dispatch(getAllCategories());
    } else {
      toast.error(response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const updateCategory = (token, slug, name, toast, history, currentCategory) => async dispatch => {
  try {
    dispatch(setLoadingValue(true))

    const response = await categoryAPI.updateCategory(token, slug, name)

    if (response.status === 200) {
      const { data } = response
      toast.success(`Category "${currentCategory}" updated to "${data.name}"`)
      dispatch(getAllCategories());
      history.push('/admin/category')
    } else {
      toast.error(response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setCurrentCategory(''))
    dispatch(setLoadingValue(false))
  }
}
