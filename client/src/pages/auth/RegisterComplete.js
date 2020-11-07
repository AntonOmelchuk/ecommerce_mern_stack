import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import constants from '../../constants/general'
import { auth } from '../../utils/firebase'

const { localStorage } = window

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setEmail(localStorage.getItem(constants.REGISTRATION_EMAIL))
  }, [])

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password || !name) {
      return toast.error('All fields are required')
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters long')
    }

    if (name.length < 2) {
      return toast.error('Password must be at least 2 characters long')
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)

      if (result.user.emailVerified) {
        localStorage.removeItem(constants.REGISTRATION_EMAIL)

        const user = auth.currentUser
        await user.updatePassword(password)
        await user.updateProfile({
          displayName: name
        })

        history.push('/')
      } else {
        toast.error('Something went wrong. Please, try one more time')
      }
    } catch (error) {
      if (error.message !== 'The email address is badly formatted.') {
        toast.error(`Error: ${error.message}`)
      }
    } finally {
      setPassword('')
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register Complete</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              value={email}
              disabled
            />
            <input
              type='text'
              className='form-control my-3'
              value={name}
              onChange={({ target }) => setName(target.value)}
              placeholder='Name'
            />
            <input
              type='password'
              className='form-control my-3'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder='Password'
            />
            <button type='submit' className='btn btn-raised my-3'>complete registration</button>
          </form>
        </div>
      </div>
    </div>
  )
}

RegisterComplete.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default RegisterComplete
