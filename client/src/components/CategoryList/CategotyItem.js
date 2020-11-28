import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CategotyItem = ({ category, subs }) => {
  const { slug, name } = category
  const route = subs ? `/sub/${slug}` : `/category/${slug}`
  return (
    <div className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
      <Link to={route}>{name}</Link>
    </div>
  )
}

CategotyItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  subs: PropTypes.bool,
}

CategotyItem.defaultProps = {
  subs: false
}

export default CategotyItem
