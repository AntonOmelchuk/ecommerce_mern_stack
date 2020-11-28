import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { SET_SEARCH_VALUE } from '../../constants/actionTypes'

const SearchForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { search } = useSelector(state => state.general)

  const handleSubmit = e => {
    e.prevendDefault()
    history.push(`/shop?${search}`)
  }

  const onChangeHandle = ({ target }) => dispatch({ type: SET_SEARCH_VALUE, payload: target.value })

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        type='serach'
        className='form-control mr-sm-2'
        placeholder='Search'
        value={search}
        onChange={onChangeHandle}
      />
      <SearchOutlined onClick={handleSubmit} />
    </form>
  )
}

export default SearchForm
