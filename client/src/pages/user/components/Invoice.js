/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Document, Page, Text, StyleSheet, View 
} from '@react-pdf/renderer';
import {
  Table, TableHeader, TableCell, TableBody, DataTableCell
} from '@david.kucsai/react-pdf-table'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const Invoice = ({ order }) => {
  const { paymentIntent } = order
  return (
    <Document>
      <Page style={styles.body}>

        <Text style={styles.header} fixed>{`~ ${new Date().toLocaleString()} ~`}</Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>MERN Ecommerce</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>

        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={({ product }) => product.title} />
            <DataTableCell getContent={({ product }) => `$${product.price}`} />
            <DataTableCell getContent={({ product }) => product.quantity} />
            <DataTableCell getContent={({ product }) => product.brand} />
            <DataTableCell getContent={({ product }) => product.color} />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>{`Date:                     ${new Date(paymentIntent.created * 1000)}`}</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{`Order Id:             ${paymentIntent.id}`}</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{`Order Status:      ${order.orderStatus}`}</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{`Total Paid:          ${paymentIntent.amount}`}</Text>
        </Text>

        <Text style={styles.footer}>~ Thank you for shipping with us ~</Text>
      </Page>
    </Document>
  )
}

Invoice.propTypes = {
  order: PropTypes.shape({
    orderStatus: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    paymentIntent: PropTypes.shape({
      created: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired
}

export default Invoice
