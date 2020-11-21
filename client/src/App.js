import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { auth } from './utils/firebase'
import { getCurrentUser } from './actions/auth'

import Header from './components/nav/Header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import History from './pages/user/History'
import PasswordUpdate from './pages/user/PasswordUpdate'
import Wishlist from './pages/user/WishList'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/CategoryCreate'
import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute'
import CategoryUpdate from './pages/admin/components/CategoryUpdate'
import SubCreate from './pages/admin/components/SubCreate'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      try {
        if (user) {
          const { token } = await user.getIdTokenResult()
          dispatch(getCurrentUser(token, toast))
        }
      } catch (error) {
        console.error(error)
      }
    })
    return () => unsubscribe()
  }, [dispatch])
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/ /password' component={ForgotPassword} />
        <UserRoute exact path='/user/history' children={<History />} />
        <UserRoute exact path='/user/password-update' children={<PasswordUpdate />} />
        <UserRoute exact path='/user/wishlist' children={<Wishlist />} />
        <AdminRoute exact path='/admin/dashboard' children={<AdminDashboard />} />
        <AdminRoute exact path='/admin/category' children={<CreateCategory />} />
        <AdminRoute exact path='/admin/category/:slug' children={<CategoryUpdate />} />
        <AdminRoute exact path='/admin/sub' children={<SubCreate />} />
      </Switch>
    </>
  );
};

export default App
