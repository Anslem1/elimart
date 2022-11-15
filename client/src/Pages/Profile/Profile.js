import './Profile.css'

import React from 'react'
import { useSelector } from 'react-redux'

function Profile () {
  const auth = useSelector(state => state.auth)

  console.log(auth)

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
      </div>
    </div>
  )
}
export default Profile
