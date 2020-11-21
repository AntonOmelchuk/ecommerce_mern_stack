import React, { useState, useEffect } from 'react'

import AdminNav from '../../components/nav/AdminNav'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'

const ProductCreate = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => setLoading(false)
  }, [])

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          <LoadingTitle loading={loading} title='Create product' />
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
