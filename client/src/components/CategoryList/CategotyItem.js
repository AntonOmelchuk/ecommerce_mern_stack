import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CategotyItem = ({ category }) => {
  const { slug, name } = category
  return (
    <div className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
      <Link to={`/category/${slug}`}>{name}</Link>
    </div>
  )
}

CategotyItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired
}

export default CategotyItem
