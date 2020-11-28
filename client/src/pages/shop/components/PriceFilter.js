import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'
import { Menu, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { searchProducts } from '../../../actions/product'
import { SET_SEARCH_VALUE } from '../../../constants/actionTypes'

const { SubMenu } = Menu

const PriceFilter = () => {
  const [price, setPrice] = useState([])
  const dispatch = useDispatch()

  const title = (
    <span className='h6'>
      <DollarOutlined />
      {' '}
      Price
    </span>
  )

  const filterProducts = () => {
    batch(() => {
      dispatch({ type: SET_SEARCH_VALUE, payload: '' })
      dispatch(searchProducts({ price, query: '' }))
    })
  }

  return (
    <Menu defaultOpenKeys={['1']} mode='inline'>
      <SubMenu
        key='1'
        title={title}
      >
        <div>
          <Slider
            className='ml-4 mr-4'
            tipFormatter={value => `$${value}`}
            range
            value={price}
            onChange={value => setPrice(value)}
            onAfterChange={filterProducts}
            max='4999'
          />
        </div>
      </SubMenu>
    </Menu>
  )
}

export default PriceFilter
