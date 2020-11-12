import React from 'react'
import { Switch, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Header from './components/nav/Header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App
