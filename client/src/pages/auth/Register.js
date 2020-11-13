import React, { useState } from 'react'
import { toast } from 'react-toastify'
import constants from '../../constants/general'
import { auth } from '../../utils/firebase'
import { useLoggedUserRedirect } from '../../utils/helpers/hooks/useLoggedUserRedirect'

const { localStorage } = window

const Register = () => {
  const [email, setEmail] = useState('')

  useLoggedUserRedirect()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true
      }

      await auth.sendSignInLinkToEmail(email, config)
      toast.success(`Email is sent to ${email}. Click the link to complete your registration`)
      localStorage.setItem(constants.REGISTRATION_EMAIL, email)
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    } finally {
      setEmail('')
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Reigster</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Your email"
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
