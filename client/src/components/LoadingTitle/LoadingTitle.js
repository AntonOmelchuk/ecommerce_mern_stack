import React from 'react'
import PropTypes from 'prop-types'

const LoadingTitle = ({ loading, title, styles }) => (
  <h4 className={[loading ? 'text-info' : '', styles && styles]}>
    {loading ? 'Loading...' : title}
  </h4>
)

LoadingTitle.propTypes = {
  loading: PropTypes.bool.isRequired,
  styles: PropTypes.shape({}),
  title: PropTypes.string.isRequired,
}

LoadingTitle.defaultProps = {
  styles: {},
}

export default LoadingTitle
