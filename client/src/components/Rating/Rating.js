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
    <StarRatings
      name={id}
      numberOfStars={STARS_COUNT}
      rating={ratingValue(ratings)}
      changeRating={(newRating, name) => setRating(token, name, newRating)}
      isSelectable={isSelectable}
      starRatedColor='red'
    />
  )
}

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  ratings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isSelectable: PropTypes.bool.isRequired,
  setRating: PropTypes.func.isRequired,
}

export default Rating
