import Body from './Components/Body/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import { ProSidebarProvider } from 'react-pro-sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { isUserSignedin } from './Redux/actions'
import { useEffect } from 'react'
import Orders from './Pages/Orders/Orders'
import Products from './Pages/Products/Product'
// import Product from '../../server/src/Models/Product';

function App () {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserSignedin())
    }
  }, [])

  return (
    <>
      <Body />
      <Routes>
        <Route path='/' exact element={token ? <Home /> : <Signin />} />
        <Route path='/products' element={token ? <Products /> : <Signin />} />
        <Route path='/orders' element={token ? <Orders /> : <Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
