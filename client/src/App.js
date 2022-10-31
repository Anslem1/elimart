import './App.css'

import Home from './Pages/Home/Home'
import {  Routes, Route } from 'react-router-dom'
import Allproducts from './Pages/Allroducts/Allproducts'
import Navbar from './Components/Navbar/Navbar'
import MobileNav from './Components/Navbar/MobileNav'

function App () {
  return (
    <div className='App'>
      <Navbar />
      <MobileNav />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/:slug' element={<Allproducts />} />
      </Routes>
    </div>
  )
}

export default App
