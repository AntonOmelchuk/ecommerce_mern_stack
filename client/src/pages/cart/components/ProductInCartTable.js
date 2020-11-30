import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ModalImage from 'react-modal-image'
import { setCartValue } from '../../../actions/cart'

const ProductInCartTable = ({ item }) => {
  const defaultColors = ['Black', 'White', 'Silver', 'Brown', 'Blue']

  const {
    images, title, price, brand, count, color, shipping, _id
  } = item

  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)

  const handleColorChange = ({ target }) => {
    const newCart = cart.map(cartItem => {
      if (cartItem._id === _id) {
        return { ...cartItem, color: target.value }
      }
      return cartItem
    })

    dispatch(setCartValue(newCart))
  }

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '200px', height: '150px' }}>
            <ModalImage large={images[0].url} small={images[0].url} />
          </div>
        </td>
        <td>{title}</td>
        <td>{price}</td>
        <td>{brand}</td>
        <td>
          <select onChange={handleColorChange} name='color' className='form-control'>
            <option>{color}</option>
            {defaultColors.filter(c => c !== color).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </td>
        <td>{count}</td>
        <td>{shipping}</td>
      </tr>
    </tbody>
  )
}

ProductInCartTable.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    shipping: PropTypes.string.isRequired,
  }).isRequired
}

export default ProductInCartTable
