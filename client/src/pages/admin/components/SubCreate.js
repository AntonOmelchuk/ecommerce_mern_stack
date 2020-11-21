import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from './CategoryForm'
import LoadingTitle from '../../../components/LoadingTitle/LoadingTitle'

const SubCreate = () => {
  const [subName, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    return () => setLoading(false)
  }, [])

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title='Create sub' />
          <CategoryForm value={subName} onChange={setName} />
          <input
            type='search'
            className='form-control mb-4'
            placeholder='Filter'
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SubCreate
