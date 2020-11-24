import subAPI from '../api/sub'
import { SET_SUB_DATA, SET_CURRENT_SUB, SET_CATEGORY_SUBS } from '../constants/actionTypes'
import { setLoadingValue } from './general'

export const setCurrentSub = sub => ({ type: SET_CURRENT_SUB, payload: sub })

export const getAllSubs = () => async (dispatch) => {
  try {
    const response = await subAPI.getSubs()

    if (response.status === 200) {
      dispatch({ type: SET_SUB_DATA, payload: response.data })
    } else {
      console.error(response.error)
    }
  } catch (error) {
    console.error(error)
  }
}

export const createSub = (token, name, category, toast, setName) => async (dispatch) => {
  try {
    dispatch(setLoadingValue(true))
    const { status } = await subAPI.createSub(token, name, category)

    if (status === 200) toast.success(`Sub "${name}" is created`)
    else toast.error('Something went wrong, please try again')
  } catch (error) {
    if (error.response.status === 400) toast.error(error.response.data)
    else console.error(error)
  } finally {
    setName('')
    dispatch(setLoadingValue(false))
    dispatch(getAllSubs())
  }
}

export const removeSub = (token, slug, toast) => async (dispatch) => {
  try {
    dispatch(setLoadingValue(true))
    const response = await subAPI.removeSub(token, slug)

    if (response.status === 200) {
      const { data } = response
      toast.success(`Sub "${data.name}" deleted`)
      dispatch(getAllSubs());
    } else {
      toast.error(response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setLoadingValue(false))
  }
}

export const updateSub = (token, slug, name, toast, history, currentSub) => async (dispatch) => {
  try {
    dispatch(setLoadingValue(true))

    const response = await subAPI.updateSub(token, slug, name)

    if (response.status === 200) {
      const { data } = response
      toast.success(`Sub "${currentSub}" updated to "${data.name}"`)
      dispatch(getAllSubs());
      history.push('/admin/sub')
    } else {
      toast.error(response.error)
    }
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setCurrentSub(''))
    dispatch(setLoadingValue(false))
  }
}

export const getCurrentCategorySubs = (id, callback) => async (dispatch) => {
  try {
    const { data, status } = await subAPI.getCurrentCategorySubs(id)

    if (status === 200) {
      callback()
      dispatch({ type: SET_CATEGORY_SUBS, payload: data })
    } else {
      console.error(data)
    }
  } catch (error) {
    console.error(error)
  }
}
