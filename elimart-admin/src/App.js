import Body from './Components/Body/Body'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'

function App () {
  return (
    <>
      <BrowserRouter>
      <Body />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
