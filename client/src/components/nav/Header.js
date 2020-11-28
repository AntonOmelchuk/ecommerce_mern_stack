import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingOutlined
} from '@ant-design/icons'

import SearchForm from '../SearchForm/SearchForm'

import { auth } from '../../utils/firebase'
import { LOGOUT_USER } from '../../constants/actionTypes'

const { SubMenu, Item } = Menu

const Header = () => {
  const [state, setState] = useState('home')

  const { user } = useSelector(store => store.auth)

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
      <Item key='shop' icon={<ShoppingOutlined />}>
        <Link to='/shop'>Shop</Link>
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
            {
              user?.role && (
              <Item key='setting:1'>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/history'}>Dashboard</Link>
              </Item>
              )
            }
            <Item icon={<LogoutOutlined />} onClick={() => logout()}>Logout</Item>
          </SubMenu>
        )
      }
      <span className='float-right p-1'>
        <SearchForm />
      </span>
    </Menu>
  )
}

export default Header
