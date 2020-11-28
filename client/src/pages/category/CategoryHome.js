/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { getCategory } from '../../actions/category'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import { capitalize } from '../../utils/helpers/helpers'
import ProductCard from '../../components/Card/ProductCard'
import { getSubRelatedProducts } from '../../actions/sub'

const CategoryHome = () => {
  const [isCategory, setIsCategory] = useState(true)
  const dispatch = useDispatch()
  const { category: { categoryProducts }, sub: { subProducts }, general: { loading } } = useSelector(state => state)
  const { slug } = useParams()
  const location = useLocation()

  const products = isCategory ? categoryProducts : subProducts

  useEffect(() => {
    if (location.pathname.includes('/sub/')) {
      setIsCategory(false)
      dispatch(getSubRelatedProducts(slug))
    } else {
      setIsCategory(true)
      dispatch(getCategory(slug))
    }
  }, [slug, dispatch])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <LoadingTitle
            loading={loading}
            title={`${products.length} Products in "${capitalize(slug)}" ${isCategory ? 'category' : 'sub category'}`}
            styles=' text-center p-3 mt-5 mb-5 display-4 jumbotron'
          />
        </div>
      </div>
      <div className='row'>
        {products.map(product => (
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
