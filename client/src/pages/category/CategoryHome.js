/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCategory } from '../../actions/category'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import { capitalize } from '../../utils/helpers/helpers'
import ProductCard from '../../components/Card/ProductCard'

const CategoryHome = () => {
  const dispatch = useDispatch()
  const { category: { categoryProducts }, general: { loading } } = useSelector(state => state)
  const { slug } = useParams()

  useEffect(() => {
    dispatch(getCategory(slug))
  }, [slug])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <LoadingTitle
            loading={loading}
            title={`${categoryProducts.length} Products in "${capitalize(slug)}" category`}
            styles=' text-center p-3 mt-5 mb-5 display-4 jumbotron'
          />
        </div>
      </div>
      <div className='row'>
        {categoryProducts.map(product => (
          <div key={product._id} className='col'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

CategoryHome.propTypes = {}

export default CategoryHome
