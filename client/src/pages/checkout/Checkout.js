import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useHistory } from 'react-router-dom'
import Button from './components/Button'
import ApplyCoupon from './components/ApplyCoupon'

import userAPI from '../../api/user'
import { getCart, setCartValue } from '../../actions/cart'
import { applyCoupon } from '../../actions/coupon'

const Checkout = () => {
  const [address, setAddress] = useState('')
  const [savedAddress, setSavedAddress] = useState(false)
  const [coupon, setCoupon] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const { auth: { user }, cart: { cartFromDB } } = useSelector(state => state)

  useEffect(() => {
    dispatch(getCart(user.token))
    userAPI.getAddress(user.token).then(({ data }) => {
      if (data) {
        setAddress(data)
        setSavedAddress(true)
      }
    })
  }, [dispatch])

  const saveAddress = async () => {
    const { data } = await userAPI.saveAddress(user.token, address)

    if (data.ok) {
      setSavedAddress(true)
      toast.success('Address saved')
    }
  }

  const removeCart = () => {
    userAPI.removeCart(user.token)
    dispatch(setCartValue([]))
    setCoupon('')
  }

  const applyCouponHandler = () => {
    dispatch(applyCoupon(user.token, coupon, toast))
    setCoupon('')
  }

  const { total, products = [], totalWithDiscount = 0 } = cartFromDB
  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery Adress</h4>
        <br />
        <br />
        <ReactQuill theme='snow' value={address} onChange={value => setAddress(value)} />
        <button type='button' className='btn btn-primary mt-2' onClick={saveAddress}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        <ApplyCoupon
          value={coupon}
          onChange={setCoupon}
          onBtnClick={applyCouponHandler}
        />
      </div>
      <div className='col-md-6'>
        <h4>Order Summary</h4>
        <hr />
        <p>{`Products ${products.length}`}</p>
        <hr />
        {products.map(({
          color, count, price, product: { title }
        }) => (
          <div key={title}>
            <p>{`${title} (${color}) x ${count} = ${count * price}`}</p>
          </div>
        ))}
        <hr />
        <p>{`Cart Total: $${total || ''}`}</p>

        {totalWithDiscount > 0 && (
          <p className='bg-success p-2'>
            {`Discount Applied: Total Payable: $${totalWithDiscount}`}
          </p>
        )}
        <div className='row'>
          <Button
            title='PLACE ORDER'
            onClick={() => history.push('/payment')}
            disabled={!products.length || !savedAddress}
          />
          <Button
            title='EMPTY CART'
            onClick={() => removeCart()}
            disabled={!products.length}
          />
        </div>
      </div>
    </div>
  )
}

export default Checkout
