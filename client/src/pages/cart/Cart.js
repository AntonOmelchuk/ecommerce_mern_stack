import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import CartTable from './components/CartTable'

import { totalCost } from '../../utils/helpers/helpers'
import userAPI from '../../api/user'

const Cart = () => {
  const { cart: { cart }, auth: { user } } = useSelector(state => state)
  const history = useHistory()

  const cartCount = cart.length

  const buttonHandler = () => {
    userAPI.saveCart(user.token, cart).then(res => {
      if (res.data.ok) {
        history.push('/checkout')
      }
    }).catch(err => console.error(err))
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          <h4>{`Cart / ${cartCount} ${cartCount > 1 ? 'Products' : 'Product'}`}</h4>
          {
            !cart.length ? <h4>No products in cart.</h4> : (
              <CartTable cart={cart} />
            )
          }
        </div>
        <div className='col-md-4'>
          <h4>Order Sumary</h4>
          <hr />

          <p>Product</p>
          {cart.map(({ title, count, price }) => (
            <div key={title}>
              <p>{`${title} x ${count} = $${count * price}`}</p>
            </div>
          ))}
          {`Total: ${totalCost(cart)}`}
          <hr />
          {
            user ? (
              <button
                type='button'
                onClick={buttonHandler}
                disabled={!cart.length}
                className='btn btn-small btn-primary mt-2'
              >
                Proceed to Checkout
              </button>
            ) : (
              <button type='button' className='btn btn-small btn-primary mt-2'>
                <Link to={{ pathname: '/login', state: { from: 'cart' } }}>Login to Checkout</Link>
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart
