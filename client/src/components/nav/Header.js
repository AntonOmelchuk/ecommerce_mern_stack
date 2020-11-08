import React, { useState } from 'react'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../utils/firebase'
import { LOGOUT_USER } from '../../constants/actionTypes'

const { SubMenu, Item } = Menu

const Header = () => {
  const [state, setState] = useState('home')

  const { user } = useSelector(store => store.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    auth.signOut()
    dispatch({ type: LOGOUT_USER })
    history.push('/login')
  }

  return (
    <Menu onClick={({ key }) => setState(key)} selectedKeys={[state]} mode='horizontal'>
      <Item key='home' icon={<AppstoreOutlined />}>
        <Link to='/'>Home</Link>
      </Item>
      {
        !user && (
          <Item key='register' icon={<UserAddOutlined />} className='float-right'>
            <Link to='/register'>Register</Link>
          </Item>
        )
      }
      {
        !user && (
          <Item key='login' icon={<UserOutlined />} className='float-right'>
            <Link to='/login'>Login</Link>
          </Item>
        )
      }
      {
        user && (
          <SubMenu
            key='SubMenu'
            className='float-right'
            icon={<SettingOutlined />}
            title={user?.name.split(' ')[0] || user?.email.split('@')[0] || 'USERNAME'}
          >
            <Item key='setting:1'>Option 1</Item>
            <Item key='setting:2'>Option 2</Item>
            <Item icon={<LogoutOutlined />} onClick={() => logout()}>Logout</Item>
          </SubMenu>
        )
      }
    </Menu>
  )
}

export default Header
