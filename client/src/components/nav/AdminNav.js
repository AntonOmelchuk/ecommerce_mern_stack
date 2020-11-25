import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, batch } from 'react-redux'
import { getAllCategories } from '../../actions/category'
import { getProducts } from '../../actions/product'
import { getAllSubs } from '../../actions/sub'

const AdminNav = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    batch(() => {
      dispatch(getAllCategories())
      dispatch(getProducts())
      dispatch(getAllSubs())
    })
  }, [])

  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/dashboard' className='nav-link'>Dashboard</Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/product' className='nav-link'>Product</Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/products' className='nav-link'>Products</Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/category' className='nav-link'>Category</Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/sub' className='nav-link'>Sub Category</Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/coupon' className='nav-link'>Coupon</Link>
        </li>
        <li className='nav-item'>
          <Link to='/forgot/password' className='nav-link'>Password</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNav
