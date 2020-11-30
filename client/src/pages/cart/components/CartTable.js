import React from 'react'
import PropTypes from 'prop-types'
import ProductInCartTable from './ProductInCartTable'

const CartTable = ({ cart }) => {
  return (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>
      {cart.map(item => (
        <ProductInCartTable key={item._id} item={item} />
      ))}
    </table>
  )
}

CartTable.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired
}

export default CartTable
