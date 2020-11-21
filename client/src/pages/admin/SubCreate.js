import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import AdminNav from '../../components/nav/AdminNav'
import CategoryForm from './components/CategoryForm'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'
import CategoryItem from './components/CategoryItem'

import {
  createSub, getAllSubs, removeSub, setCurrentSub 
} from '../../actions/sub'
import { searchCategory } from '../../utils/helpers/helpers'
import { getAllCategories } from '../../actions/category'

const SubCreate = () => {
  const [subName, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const { auth: { user }, category, sub } = useSelector(state => state)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllSubs())
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(createSub(user.token, subName, categoryId, toast, setLoading, setName))
  }

  const subs = search.length > 0 ? searchCategory(search, sub.subs) : sub.subs

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title='Create sub category' />
          <div className='form-group'>
            <label name='category'>Category</label>
            <select name='category' className='form-control' onChange={({ target }) => setCategoryId(target.value)}>
              <option>Please, select category</option>
              {category.categories.length > 0 && (
                category.categories.map(({ name, _id }) => <option key={_id} value={_id}>{name}</option>)
              )}
            </select>
          </div>
          <CategoryForm
            value={subName}
            placeholder='Enter sub category name'
            onChange={setName}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          {
            subs.length > 0 && (
              <input
                type='search'
                className='form-control mb-4'
                placeholder='Filter'
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
            )
          }
          {subs.map(({ _id, name, slug }) => (
            <CategoryItem
              key={_id}
              name={name}
              slug={slug}
              setLoading={setLoading}
              removeHandler={() => dispatch(removeSub(user.token, slug, toast, setLoading))}
              setCurrentItem={() => dispatch(setCurrentSub(name))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubCreate
