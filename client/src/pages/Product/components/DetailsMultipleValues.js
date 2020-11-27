import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const DetailsMultipleValues = ({ title, values }) => {
  return (
    <li className='list-group-item'>
      {title}
      {
        values.map(({ _id, slug, name }) => (
          <Link to={`/sub/${slug}`} key={_id} className='label label-default label-pill pull-xs-right'>
            {name}
          </Link>
        ))
      }
    </li>
  )
}

DetailsMultipleValues.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

export default DetailsMultipleValues
