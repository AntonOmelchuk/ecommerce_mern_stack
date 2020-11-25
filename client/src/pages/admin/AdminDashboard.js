import React from 'react'
import AdminNav from '../../components/nav/AdminNav'

const AdminDashboard = () => {
  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
