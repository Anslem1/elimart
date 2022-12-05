import './App.css'

import Home from './Pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Allproducts from './Pages/Allroducts/Allproducts'
import Navbar from './Components/Navbar/Navbar'
import MobileNav from './Components/Navbar/MobileNav'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getAddress,
  getAllCategory,
  getCartItems,
  // getOrder,
  getOrders,
  isUserSignedin,
  updateCart
} from './Redux/actions'
import Profile from './Pages/Profile/Profile'
import ToLogin from './Pages/toLogin/toLogin'
import SingleProductDetails from './Pages/SigleProductDetailes/SingleProductDetails'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout'
import Order from './Pages/Orders/Order'
import OrderDetails from './Pages/OrderDetails/OrderDetails'
import Empty from './Empty'

function App () {
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)
  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.authenticated) {
  token && dispatch(getOrders())
  token && dispatch(updateCart())
  token && dispatch(getCartItems())
  token && dispatch(getAddress())
    } else {
      dispatch(isUserSignedin())
    }
  }, [auth.authenticated])

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  return (
    <div className='App'>
      <Navbar />
      <MobileNav />
      <Routes>
        <Route path='/' exact element={<Home />} />

        <Route
          path='/orders'
          exact
          element={
            auth.authenticated ? (
              user.orders.length > 0 ? (
                <Order />
              ) : (
                <Empty title={'Opps, looks like you have no orders, yet'} />
              )
            ) : (
              <ToLogin />
            )
          }
        />
        <Route
          path='/order_details/:orderId'
          exact
          element={
            auth.authenticated ? (
              user.orders.length > 0 ? (
                <OrderDetails />
              ) : (
                <Empty title={'Opps, looks like you have no orders, yet'} />
              )
            ) : (
              <ToLogin />
            )
          }
        />

        <Route
          path='/checkout'
          element={
            auth.authenticated ? (
              Object.keys(cart.cartItems).length > 0 ? (
                <Checkout />
              ) : (
                <Empty
                  title={" You don't have any item to your cart to checkout"}
                />
              )
            ) : (
              <ToLogin />
            )
          }
        />

        <Route
          path='/:productSlug/:productId/product'
          element={<SingleProductDetails />}
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='/:slug' element={<Allproducts />} />
        <Route path='/profile' element={token ? <Profile /> : <ToLogin />} />
      </Routes>
    </div>
  )
}

export default App
