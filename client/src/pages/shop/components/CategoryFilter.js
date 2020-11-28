import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Menu } from 'antd'
import { DownSquareOutlined } from '@ant-design/icons'
import { getAllCategories } from '../../../actions/category'
import { searchProducts } from '../../../actions/product'

const { SubMenu } = Menu

const CategoryFilter = () => {
  const dispatch = useDispatch()
  const [categoriesIds, setCategoriesIds] = useState([])
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

    if (categoriesIds.length) {
      dispatch(searchProducts({ category: categoriesIds, query: '' }))
    }
  }, [dispatch, categoriesIds])

  const handleCheck = ({ target }) => {
    if (categoriesIds.includes(target.value)) {
      setCategoriesIds(prev => prev.filter(id => id !== target.value))
    } else {
      setCategoriesIds(prev => prev.concat(target.value))
    }
  }

  return (
    <Menu defaultActiveFirst mode='inline'>
      <SubMenu title={title}>
        <div>
          {categories && categories.map(({ _id, name }) => (
            <div key={_id}>
              <Checkbox
                value={_id}
                onChange={handleCheck}
                checked={categoriesIds.includes(_id)}
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
