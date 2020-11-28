import React from 'react'
import PropTypes from 'prop-types'
import CategotyItem from './CategotyItem'

const CategoryList = ({ categories, title, subs }) => {
  return (
    <>
      <h1 className='text-center p-3 mt-5 mb-5 dispaly-4 jumbotron'>
        {title}
      </h1>
      <div className='container'>
        <div className='row'>
          {categories.map(category => <CategotyItem key={category._id} subs={subs} category={category} />)}
        </div>
      </div>
    </>
  )
}

CategoryList.propTypes = {
  subs: PropTypes.bool,
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

CategoryList.defaultProps = {
  subs: false,
}

export default CategoryList
