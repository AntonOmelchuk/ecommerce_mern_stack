import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Slider, Menu } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { filterProducts } from '../../../actions/product'

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

  const handleSetPrice = () => {
    dispatch(filterProducts({ price }))
  }

  return (
    <Menu defaultActiveFirst mode='inline'>
      <SubMenu title={title}>
        <div>
          <Slider
            className='ml-4 mr-4'
            tipFormatter={value => `$${value}`}
            range
            value={price}
            onChange={value => setPrice(value)}
            onAfterChange={handleSetPrice}
            max='4999'
          />
        </div>
      </SubMenu>
    </Menu>
  )
}

export default PriceFilter
