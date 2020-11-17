import React from 'react'
import PropTypes from 'prop-types'

const LoadingTitle = ({ loading, title }) => (
  <h4 className={loading ? 'text-info' : ''}>{loading ? 'Loading...' : title}</h4>
)

LoadingTitle.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export default LoadingTitle
