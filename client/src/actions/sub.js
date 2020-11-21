import subAPI from '../api/sub'
import { SET_SUB_DATA, SET_CURRENT_SUB } from '../constants/actionTypes'

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

export const createSub = (token, name, toast, setLoading, setName) => async (dispatch) => {
  try {
    setLoading(true)
    const { status } = await subAPI.createSub(token, name)

    if (status === 200) toast.success(`Sub "${name}" is created`)
    else toast.error('Something went wrong, please try again')
  } catch (error) {
    if (error.response.status === 400) toast.error(error.response.data)
    else console.error(error)
  } finally {
    setName('')
    setLoading(false)
    dispatch(getAllSubs())
  }
}

export const removeSub = (token, slug, toast, setLoading) => async (dispatch) => {
  try {
    setLoading(true)
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
    setLoading(false)
  }
}

export const updateSub = (token, slug, name, toast, setLoading, history, currentSub) => async (dispatch) => {
  try {
    setLoading(true)

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
    setLoading(false)
  }
}

export const setCurrentCategory = sub => ({ type: SET_CURRENT_SUB, payload: sub })
