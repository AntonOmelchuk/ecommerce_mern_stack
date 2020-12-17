import React from 'react'
import PropTypes from 'prop-types'

const ShowPaymentInfo = ({ order, showStatus }) => {
  const { paymentIntent } = order;

  const formatedAmount = (paymentIntent.amount / 100).toLocaleString('en-US', {
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
        <span>{`Ordered on: ${new Date(paymentIntent.created * 1000).toLocaleString()}`}</span>
        <br />
        {showStatus && <span className='badge bg-primary text-white'>{` / Status: ${order.orderStatus} `}</span>}
      </p>
    </div>
  )
}

ShowPaymentInfo.propTypes = {
  order: PropTypes.shape({
    orderStatus: PropTypes.string,
    paymentIntent: PropTypes.shape({
      id: PropTypes.string,
      amount: PropTypes.number,
      currency: PropTypes.string,
      payment_method_types: PropTypes.arrayOf(PropTypes.string),
      status: PropTypes.string,
      created: PropTypes.number,
      orderStatus: PropTypes.string,
    })
  }).isRequired,
  showStatus: PropTypes.bool.isRequired,
}

export default ShowPaymentInfo
