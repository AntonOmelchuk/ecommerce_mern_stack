import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'
import { auth } from './utils/firebase'
import { getCurrentUser } from './actions/auth'
import './index.css'

const Header = lazy(() => import('./components/nav/Header'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Home = lazy(() => import('./pages/home/Home'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const History = lazy(() => import('./pages/user/History'))
const PasswordUpdate = lazy(() => import('./pages/user/PasswordUpdate'))
const Wishlist = lazy(() => import('./pages/user/WishList'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CreateCategory = lazy(() => import('./pages/admin/CategoryCreate'))
const UserRoute = lazy(() => import('./routes/UserRoute'))
const AdminRoute = lazy(() => import('./routes/AdminRoute'))
const CategoryUpdate = lazy(() => import('./pages/admin/components/CategoryUpdate'))
const SubCreate = lazy(() => import('./pages/admin/SubCreate'))
const ProductCreate = lazy(() => import('./pages/admin/ProductCreate'))
const AllPoducts = lazy(() => import('./pages/admin/components/AllProducts'))
const ProductUpdate = lazy(() => import('./pages/admin/ProductUpdate'))
const Product = lazy(() => import('./pages/Product/Product'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const Shop = lazy(() => import('./pages/shop/Shop'))
const Cart = lazy(() => import('./pages/cart/Cart'))
const Checkout = lazy(() => import('./pages/checkout/Checkout'))
const CraeteCoupon = lazy(() => import('./pages/admin/coupon/CraeteCoupon'))
const Payment = lazy(() => import('./pages/payment/Payment'))

const App = () => {
  const { loading } = useSelector(state => state.general)
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
    <Suspense fallback={(
      <div className='col text-center p-5'>
        __ React Redux Node Mongo EC
        <LoadingOutlined />
        MMERCE
        __
      </div>
    )}
    >
      <div className={loading ? 'loadingOverlay' : ''}>
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
          <AdminRoute exact path='/admin/product' children={<ProductCreate />} />
          <AdminRoute exact path='/admin/products' children={<AllPoducts />} />
          <AdminRoute exact path='/product/:slug' children={<ProductUpdate />} />
          <AdminRoute exact path='/admin/coupon' children={<CraeteCoupon />} />
          <Route exact path='/product/details/:slug' children={<Product />} />
          <Route exact path='/category/:slug' children={<CategoryHome />} />
          <Route exact path='/sub/:slug' children={<CategoryHome />} />
          <Route exact path='/shop' children={<Shop />} />
          <UserRoute exact path='/cart' children={<Cart />} />
          <UserRoute exact path='/checkout' children={<Checkout />} />
          <UserRoute exact path='/payment' children={<Payment />} />
        </Switch>
      </div>
    </Suspense>
  );
};

export default App
