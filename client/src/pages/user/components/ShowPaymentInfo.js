import React from 'react'
import PropTypes from 'prop-types'

const ShowPaymentInfo = ({ order }) => {
  const { paymentIntent } = order;
  console.log('order: ', order)
  const formatedAmount = (paymentIntent.amount /= 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return (
    <div>
      <p>
        <span>{`Order Id: ${paymentIntent.id} / `}</span>
        <span>{`Amount: ${formatedAmount} / `}</span>
        <span>{`Currency: ${paymentIntent.currency.toUpperCase()} / `}</span>
        <span>{`Method: ${paymentIntent.payment_method_types[0]} / `}</span>
        <span>{`Payment: ${paymentIntent.status.toUpperCase()} / `}</span>
        <span>{`Ordered on: ${new Date(paymentIntent.created * 1000).toLocaleString()} / `}</span>
        <span className='badge bg-primary text-white'>{`Status: ${order.orderStatus} `}</span>
      </p>
    </div>
  )
}

ShowPaymentInfo.propTypes = {
  order: PropTypes.shape({
    orderStatus: PropTypes.string.isRequired,
    paymentIntent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      payment_method_types: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      orderStatus: PropTypes.string.isRequired,
    })
  }).isRequired
}

export default ShowPaymentInfo
