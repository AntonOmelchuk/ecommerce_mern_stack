import React from 'react'
import UserNav from '../../components/nav/UserNav'

const History = () => {
  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>user history page</div>
      </div>
    </div>
  )
}

export default History
