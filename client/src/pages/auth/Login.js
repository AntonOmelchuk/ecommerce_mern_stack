import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { auth } from '../../utils/firebase'
import { LOGGED_IN_USER } from '../../constants/actionTypes'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

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

      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          name: user.displayName,
          email: user.email,
          token
        }
      })

      history.push('/')
    } catch (error) {
      if (error.message !== 'The email address is badly formatted.') {
        toast.error(`Error: ${error.message}`)
      }
    } finally {
      setPassword('')
      setLoading(false)
    }
  }
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4 className={loading ? 'text-info' : ''}>{loading ? 'Loading...' : 'Login'}</h4>
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
              className='btn btn-raised my-3'
              block
              icon={<MailOutlined />}
              shape='round'
              size='large'
              disabled={!email || password.length < 6 || loading}
            >
              sign in with email
            </Button>
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
