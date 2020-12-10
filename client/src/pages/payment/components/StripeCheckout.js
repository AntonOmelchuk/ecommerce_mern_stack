/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import stripeAPI from '../../../api/stripe'

const cartStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeCheckout = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [proccesing, setProccesing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    stripeAPI.createPayment(user.token)
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
  }, [])

  const handleSubmit = async e => {}

  const handleChange = async e => {}

  return (
    <>
      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement id='card-element' options={cartStyle} onChange={handleChange} />
        <button
          type='submit'
          className='stripe-button'
          disabled={proccesing || disabled || succeeded}
        >
          <span id='button-text'>
            {proccesing ? <div className='spinner' id='spinner' /> : 'Pay'}
          </span>
        </button>
      </form>
    </>
  )
}

export default StripeCheckout
