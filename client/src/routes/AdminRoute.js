import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import LoadingToRedirect from './LoadingToRedirect'
import authAPI from '../api/auth'

const AdminRoute = ({ children, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(true)
  const { auth } = useSelector(state => state)

  useEffect(async () => {
    if (auth.user) {
      const { email, token } = auth.user;
      try {
        const { status } = await authAPI.isAdmin(token, email)
        if (status === 200) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        setIsAdmin(false)
      }
    } else {
      setIsAdmin(false)
    }
  }, [auth])

  return isAdmin ? <Route {...rest} render={() => children} /> : <LoadingToRedirect />
}

AdminRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AdminRoute
