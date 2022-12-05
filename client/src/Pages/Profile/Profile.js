import './Profile.css'

import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Profile () {
  const auth = useSelector(state => state.auth)



  return (
    <div className='profile-container'>
      <div className='profile__info'>
        <h1>Hi, {auth.user.firstName}</h1>
        <p>
          {' '}
          <strong>email: </strong> {auth.user.email}
        </p>
        <p>
          {' '}
          <strong>full name: </strong> {auth.user.fullName}
        </p>
        <Link to='/orders' style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'table',
              margin: '0 auto',
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'rgb(124, 142, 9)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontFamily: 'Roboto'
            }}
          >
            My orders
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Profile
