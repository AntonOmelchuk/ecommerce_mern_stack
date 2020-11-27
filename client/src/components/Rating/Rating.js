/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import StarRatings from 'react-star-ratings'
import { ratingValue } from '../../utils/helpers/helpers'

const Rating = ({
  ratings, id, isSelectable, setRating
}) => {
  const STARS_COUNT = 5
  const { user: { token } } = useSelector(state => state.auth)

  return (
    <div className='text-center pt-1 pb-3'>
      <span>
        <StarRatings
          starDimension='20px'
          starSpacing='2px'
          name={id}
          numberOfStars={STARS_COUNT}
          rating={ratingValue(ratings)}
          changeRating={(newRating, name) => setRating(token, name, newRating)}
          isSelectable={isSelectable}
          starRatedColor='red'
        />
        {' '}
        (
        {ratings.length}
        )
      </span>
    </div>
  )
}

Rating.propTypes = {
  id: PropTypes.string,
  ratings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isSelectable: PropTypes.bool.isRequired,
  setRating: PropTypes.func,
}

Rating.defaultProps = {
  id: '',
  setRating: () => {},
}

export default Rating
