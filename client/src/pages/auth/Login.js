/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { GoogleOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { auth, googleAuthProvider } from '../../utils/firebase'
import { useLoggedUserRedirect } from '../../utils/helpers/hooks/useLoggedUserRedirect'
import { checkAuth } from '../../actions/auth'
import LoadingTitle from '../../components/LoadingTitle/LoadingTitle'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  // check if user logged in
  useLoggedUserRedirect()

  useEffect(() => {
    setEmail('')
    setPassword('')
    return () => setLoading(false)
  }, [])

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !password) {
      return toast.error('All fields are required')
    }

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      const { token } = await user.getIdTokenResult()
      dispatch(checkAuth(token, history))
    } catch (error) {
      if (error.message !== 'The email address is badly formatted.') {
        toast.error(`Error: ${error.message}`)
      }
    } finally {
      setPassword('')
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    try {
      const { user } = await auth.signInWithPopup(googleAuthProvider)
      const { token } = await user.getIdTokenResult()

      dispatch(checkAuth(token, history))
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <LoadingTitle loading={loading} title='Login' />
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              autoFocus
            />
            <input
              type='password'
              className='form-control my-3'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder='Password'
            />
            <Button
              onClick={handleSubmit}
              type='primary'
              className='my-3'
              block
              icon={<MailOutlined />}
              shape='round'
              size='large'
              disabled={!email || password.length < 6 || loading}
            >
              SIGN IN WITH EMAIL
            </Button>
            <Button
              onClick={googleLogin}
              type='danger'
              className='my-3'
              block
              icon={<GoogleOutlined />}
              shape='round'
              size='large'
              disabled={loading}
            >
              SIGN IN WITH GOOGLE
            </Button>

            <Link to='/forgot/password' className='float-right text-danger'>Forgot Password</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Login
