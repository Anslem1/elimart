import './App.css'

import Home from './Pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Allproducts from './Pages/Allroducts/Allproducts'
import Navbar from './Components/Navbar/Navbar'
import MobileNav from './Components/Navbar/MobileNav'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { isUserSignedin, updateCart } from './Redux/actions'
import Profile from './Pages/Profile/Profile'
import ToLogin from './Pages/toLogin/toLogin'
import SingleProductDetails from './Pages/SigleProductDetailes/SingleProductDetails'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout';

function App () {
  const auth = useSelector(state => state.auth)
  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserSignedin())
    }
  }, [auth.authenticated])

  useEffect(() => {
    dispatch(updateCart())
  }, [auth.authenticated])

  return (
    <div className='App'>
      <Navbar />
      <MobileNav />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/cart' element={<Cart />} />
        <Route
          path='/:productSlug/:productId/product'
          element={<SingleProductDetails />}
        />
        <Route path='/:slug' element={<Allproducts />} />
        <Route path='/profile' element={token ? <Profile /> : <ToLogin />} />
      </Routes>
    </div>
  )
}

export default App
