import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../../../utils/helpers/helpers'

const DetailsItem = ({ title, value }) => {
  return (
    <li className='list-group-item'>
      {capitalize(title)}
      <span className='label label-default label-pill pull-xs-right'>{value}</span>
    </li>
  )
}

DetailsItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default DetailsItem
