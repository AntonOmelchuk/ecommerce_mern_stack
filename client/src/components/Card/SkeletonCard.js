/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { Card, Skeleton } from 'antd'

const SkeletonCard = ({ count }) => {
  const CustomCard = () => (
    <Card className='col-md-4 m-3'>
      <Skeleton active />
    </Card>
  )
  return (
    Array.from(Array(count), (_, i) => <CustomCard key={i} />)
  )
}

SkeletonCard.propTypes = {
  count: PropTypes.number.isRequired,
}

export default SkeletonCard
