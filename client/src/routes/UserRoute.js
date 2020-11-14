import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector(state => state.auth)

  return user?.token ? <Route {...rest} render={() => children} /> : <LoadingToRedirect />
}

UserRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default UserRoute
