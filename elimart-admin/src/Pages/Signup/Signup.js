import React from 'react'
import './Signup.css'

function Signup () {
  return (
    <>
      <form className='signup-container' action=''>
        <div className='testin'>
          <div className='fullname'>
            <div className='firstname'>
              <p>First name</p>
              <input type='text' placeholder='e.g Yagami' />
            </div>

            <div className='firstname'>
              <p>Last name</p>
              <input type='text' placeholder='e.g Light' />
            </div>
          </div>

          <div className='usercred-container'>
            <div className='username-container'>
              <p>Email</p>
              <input type='text' placeholder='yagami@example.com' />
            </div>
            <div className='username-container'>
              <p>Username</p>
              <input type='text' placeholder='Ryuk' />
            </div>
            <div className='username-container'>
              <p>Password</p>
              <input type='password' placeholder='Password' />
              <button className='signup_btn'>Sign up</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Signup
