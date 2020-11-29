/* eslint-disable react/no-array-index-key */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd'
import { DownSquareOutlined } from '@ant-design/icons'
import StarRating from 'react-star-ratings'

import { filterProducts } from '../../../actions/product'

const { SubMenu } = Menu

const StarsFilter = () => {
  const STARS_MAX_VALUE = new Array(5).fill(' ')
  const { filter } = useSelector(state => state.product)
  const dispatch = useDispatch()

  const handleOnStarClick = rating => {
    dispatch(filterProducts({ rating: filter.rating === rating ? 0 : rating }))
  }

  return (
    <Menu defaultActiveFirst mode='inline'>
      <SubMenu
        key='1'
        title={(
          <span className='h6'>
            <DownSquareOutlined />
            {' '}
            Rating
          </span>
      )}
      >
        {STARS_MAX_VALUE.map((_, index) => (
          <div className='pr-4 pl-4 pb-2' key={index}>
            <StarRating
              changeRating={() => handleOnStarClick(STARS_MAX_VALUE.length - index)}
              numberOfStars={STARS_MAX_VALUE.length - index}
              starDimension='20px'
              starSpacing='2px'
              starHoverColor='red'
              starEmptyColor={filter.rating === STARS_MAX_VALUE.length - index ? 'red' : 'blue'}
            />
          </div>
        ))}
      </SubMenu>
    </Menu>
  )
}

export default StarsFilter
