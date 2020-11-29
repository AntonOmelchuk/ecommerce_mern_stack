import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Menu } from 'antd'
import { DownSquareOutlined } from '@ant-design/icons'
import { getAllCategories } from '../../../actions/category'
import { filterProducts } from '../../../actions/product'

const { SubMenu } = Menu

const CategoryFilter = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector(state => state.product)
  const { categories } = useSelector(state => state.category)

  const title = (
    <span className='h6'>
      <DownSquareOutlined />
      {' '}
      Categories
    </span>
  )

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const handleCheck = ({ target }) => {
    if (filter.category.includes(target.value)) {
      const newCategories = filter.category.filter(name => name !== target.value)
      dispatch(filterProducts({ category: newCategories }))
    } else {
      const newCategories = filter.category.concat(target.value)
      dispatch(filterProducts({ category: newCategories }))
    }
  }

  return (
    <Menu defaultActiveFirst mode='inline'>
      <SubMenu key='1' title={title}>
        <div>
          {categories && categories.map(({ _id, name }) => (
            <div key={_id}>
              <Checkbox
                value={name}
                onChange={handleCheck}
                checked={filter.category.includes(name)}
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

export default CategoryFilter
