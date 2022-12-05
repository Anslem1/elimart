import Body from './Components/Body/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import './App.css'

import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, getInitialData, isUserSignedin } from './Redux/actions'
import { useEffect } from 'react'
import Orders from './Pages/Orders/Orders'
import Products from './Pages/Products/Product'
import Category from './Pages/Category/Category'
import PageType from './Pages/Pagetype/PageType'


export function numberWithCommas (x) {
  return x && `₦${' '}${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function App () {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserSignedin())
    }
    if (auth.authenticated) dispatch(getInitialData())
  }, [auth.authenticated])

  return (
    <>
      <Body />
      <Routes>
        <Route path='/' exact element={token ? <Home /> : <Signin />} />
        <Route path='/products' element={token ? <Products /> : <Signin />} />
        <Route path='/orders' element={token ? <Orders /> : <Signin />} />
        <Route path='/category' element={token ? <Category /> : <Signin />} />
        <Route path='/page-type' element={token ? <PageType /> : <Signin />} />
        <Route path='/signin' element={token ? <Home /> : <Signin />} />
        <Route path='/signup' element={token ? <Home /> : <Signup />} />
   
      </Routes>
    </>
  )
}

export default App
