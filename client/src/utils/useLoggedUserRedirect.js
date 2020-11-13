import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// eslint-disable-next-line import/prefer-default-export
export const useLoggedUserRedirect = () => {
  const { user } = useSelector(state => state.auth)
  const history = useHistory()

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user])
}
