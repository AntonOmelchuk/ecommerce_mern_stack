import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllCategories } from '../../actions/category'
import CategotyItem from './CategotyItem'

const CategoryList = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  return (
    <>
      <h1 className='text-center p-3 mt-5 mb-5 dispaly-4 jumbotron'>
        Categories
      </h1>
      <div className='container'>
        <div className='row'>
          {categories.map(category => <CategotyItem key={category._id} category={category} />)}
        </div>
      </div>
    </>
  )
}

export default CategoryList
