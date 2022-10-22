import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutUser } from '../../Redux/actions'
import './Navbar.css'

function Navbar () {
  const auth = useSelector(state => state.auth)
  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  function signOut () {
    dispatch(signOutUser())
  }

  function renderNonSignedInUsers () {
    return (
      <div className='name'>
        <Link to='/' className='link'>
          <p>
            <i className='fa-solid fa-cart-plus'></i> Elimart
          </p>
        </Link>
        <div className='sign-in_sign-out'>
          <Link to='/signin' className='link'>
            <button className='signin'>Sign in</button>
          </Link>
          <Link to='/signup' className='link'>
            <button className='signup'>Sign up</button>
          </Link>
        </div>
      </div>
    )
  }

  function renderSignedInUsers () {
    return (
      <div className='name'>
        <Link to='/' className='link'>
          <p>
            {' '}
            <i className='fa-solid fa-cart-plus'></i> Elimart Admin dashboard
          </p>
        </Link>
        <div className='sign-in_sign-out'>
          <button className='signup' onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return token ? renderSignedInUsers() : renderNonSignedInUsers()
}

export default Navbar
