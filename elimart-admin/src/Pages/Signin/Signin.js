import React from 'react'
import './Signin.css'

function Signin () {
  return (
    <>
      <form action='' className='signin-container'>
        <div className='email-container'>
          <h1>Welcome back</h1>
          <p>Email</p>
          <input type='text' placeholder='E.g yagami@gmail.com' />
        </div>
        <div className='password-container'>
          <p>Password</p>
          <input type='password' placeholder='Password' />
        <button className='sign_in_btn'>Sign in</button>
        </div>
      </form>
    </>
  )
}

export default Signin
