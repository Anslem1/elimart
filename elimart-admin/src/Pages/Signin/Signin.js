import React, { useState, useEffect } from 'react'
import './Signin.css'
import { SigninUser } from '../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

function Signin () {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const auth = useSelector(state => state.auth)

  async function userSignin (e) {
    e.preventDefault()
    const user = {
      email,
      password
    }
    dispatch(SigninUser(user))
  }
  if (auth.authenticated === true) {
    return (
      <Navigate to='/' replace />
    )
  }
  return (
    <>
      <form action='' className='signin-container' onSubmit={userSignin}>
        <div className='email-container'>
          <h1>Welcome back</h1>
          <p>Email</p>
          <input
            type='text'
            placeholder='E.g yagami@gmail.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='password-container'>
          <p>Password</p>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className='sign_in_btn'>Sign in</button>
        </div>
      </form>
    </>
  )
}

export default Signin
