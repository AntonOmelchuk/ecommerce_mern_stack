import React from 'react'
import PropTypes from 'prop-types'
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './Invoice';

const DownloadLink = ({ order }) => {
  return (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName='invoice.pdf'
      className='btn btn-sm btn-block btn-outline-primary'
    >
      Download PDF
    </PDFDownloadLink>
  )
}

DownloadLink.propTypes = {
  order: PropTypes.shape({}).isRequired
}

export default DownloadLink
