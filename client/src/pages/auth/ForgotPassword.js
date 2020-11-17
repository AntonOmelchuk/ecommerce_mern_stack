import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { auth } from '../../utils/firebase'
import { useLogoutUserRedirect } from '../../utils/helpers/hooks/useLogoutUserRedirect'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useLogoutUserRedirect()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true
      }

      await auth.sendPasswordResetEmail(email, config)
      toast.success(`Check your email ${email} for password reset link`)
      history.push('/')
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    } finally {
      setEmail('')
      setLoading(false)
    }
  }

  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      <LoadingTitle loading={loading} title='Forgot Password' />
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder='Type your email'
          autoFocus
        />
        <button type='submit' className='btn btn-raised my-3' disabled={!email}>Submit</button>
      </form>
    </div>
  )
}

ForgotPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default ForgotPassword
