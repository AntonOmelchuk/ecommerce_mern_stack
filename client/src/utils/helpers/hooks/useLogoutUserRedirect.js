import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// eslint-disable-next-line import/prefer-default-export
export const useLogoutUserRedirect = () => {
  const auth = useSelector(state => state.auth)
  const history = useHistory()

  useEffect(() => {
    if (!auth || !auth.user || !auth.user.token) {
      history.push('/')
    }
  }, [auth])
}
