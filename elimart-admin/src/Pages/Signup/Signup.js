import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignUpUser } from '../../Redux/actions'
import './Signup.css'

function Signup () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function userSignin (e) {
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      username,
      email,
      password
    }
    dispatch(SignUpUser(user))
  }

  // if (user.signedUp === true) {
  //   return <Navigate to='/' replace />
  // }

  return (
    <>
      <form className='signup-container' action='' onSubmit={userSignin}>
        <div className='testin'>
          <div className='fullname'>
            <div className='firstname'>
              <p>First name</p>
              <input
                type='text'
                placeholder='e.g Yagami'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className='firstname'>
              <p>Last name</p>
              <input
                type='text'
                placeholder='e.g Light'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='usercred-container'>
            <div className='username-container'>
              <p>Email</p>
              <input
                type='text'
                placeholder='yagami@example.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='username-container'>
              <p>Username</p>
              <input
                type='text'
                placeholder='Ryuk'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='username-container'>
              <p>Password</p>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button className='signup_btn'>Sign up</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Signup
