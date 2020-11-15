import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import LoadingToRedirect from './LoadingToRedirect'
import authAPI from '../api/auth'

const AdminRoute = ({ children, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(true)
  const { user } = useSelector(state => state.auth)

  useEffect(async () => {
    const { email, token } = user;
    try {
      const { status } = await authAPI.isAdmin(email, token)
      if (status === 200) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.log(error)
      setIsAdmin(false)
    }

    return () => setIsAdmin(false)
  }, [isAdmin])

  return isAdmin ? <Route {...rest} /> : <LoadingToRedirect />
}

AdminRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AdminRoute
