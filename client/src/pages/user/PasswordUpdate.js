import React, { useState } from 'react'
import { toast } from 'react-toastify'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../utils/firebase'

const PasswordUpdate = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await auth.currentUser.updatePassword(password)
      .then(() => {
        toast.success('Password updated')
      })
      .catch(err => toast.error(err))
      .finally(() => {
        setPassword('')
        setLoading(false)
      })
  }

  return (
    <div className='container-fluid px-5 py-2'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <h4 className={loading ? 'text-info' : ''}>{loading ? 'Loading...' : 'Password Update'}</h4>
            <input
              type='password'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              className='form-control mt-4'
              placeholder='Enter new password'
              minLength={6}
              maxLength={21}
              disabled={loading}
            />
            <button disabled={password.length < 6 || loading} type='submit' className='btn btn-raised my-3'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordUpdate
