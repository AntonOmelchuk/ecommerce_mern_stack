import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Menu } from 'antd'
import { filterProducts } from '../../../actions/product'
import initialState from '../../../constants/initialStates'

const { SubMenu } = Menu

const ColorsFilter = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector(state => state.product)

  const title = (
    <span className='h6'>
      Colors
    </span>
  )

  const handleCheck = ({ target }) => {
    if (filter.colors.includes(target.value)) {
      const colors = filter.colors.filter(name => name !== target.value)
      dispatch(filterProducts({ colors }))
    } else {
      const colors = filter.colors.concat(target.value)
      dispatch(filterProducts({ colors }))
    }
  }

  return (
    <Menu defaultActiveFirst mode='inline'>
      <SubMenu key='1' title={title}>
        <div>
          {initialState.color.map(({ _id, name }) => (
            <div key={_id}>
              <Checkbox
                value={name}
                onChange={handleCheck}
                checked={filter.colors.includes(name)}
                className='pb-2 pl-4 pr-4'
              >
                {name}
              </Checkbox>
            </div>
          ))}
        </div>
      </SubMenu>
    </Menu>
  )
}

export default ColorsFilter
