import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../../utils/firebase'
import 'react-toastify/dist/ReactToastify.css';

const { localStorage } = window

const Register = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const config = {
        url: 'http://localhost:3000/register/complete',
        handleCodeInApp: true
      }

      await auth.sendSignInLinkToEmail(email, config)
      toast.success(`Email is sent to ${email}. Click the link to complete your registration`)
      localStorage.setItem('emailForRegistration', email)
    } catch (error) {
      toast.error('Sorry, something went wrong. Try one more time', email)
    } finally {
      setEmail('')
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Reigster</h4>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              autoFocus
            />
            <button type='submit' className='btn btn-raised my-3'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
