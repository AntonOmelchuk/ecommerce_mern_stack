import React from 'react'

const Checkout = () => {
  const saveAddress = () => {

  }
  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Adress</h4>
        <br />
        <br />
        textarea
        <button type='button' className='btn btn-primary mt-2' onClick={saveAddress}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>
      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>Products x</p>
        <hr />
        <p>List of products</p>
        <hr />
        <p>Cart Total: $x</p>

        <div className='row'>
          <div className='col-md-6'>
            <button type='button' className='btn btn-primary'>
              Place Order
            </button>
          </div>
          <div className='col-md-6'>
            <button type='button' className='btn btn-primary'>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
