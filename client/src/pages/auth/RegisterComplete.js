import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import constants from '../../constants/general'
import { auth } from '../../utils/firebase'
import { validation } from '../../utils/helpers/helpers'
import { checkAuth } from '../../actions/auth'

const { localStorage } = window

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setEmail(localStorage.getItem(constants.REGISTRATION_EMAIL))
  }, [])

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validation(email, password, name)

    if (validationError.length > 0) {
      toast.error(validationError)
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

        const { token } = await user.getIdTokenResult()

        dispatch(checkAuth(token, history, toast, name))
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
  }).isRequired,
}

export default RegisterComplete
