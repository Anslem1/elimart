import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar () {
  return (
    <>
          <div className='name'>
              <Link to='/' className='link'>
                  
        <p>Elimart Admin dashboard</p>
              </Link>
        <div className='sign-in_sign-out'>
          <Link to='/signin' className = 'link'
>
            <button className='signin'>Sign in</button>
          </Link>
          <Link to='/signup' className = 'link'>
            <button className='signup' >Sign up</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
