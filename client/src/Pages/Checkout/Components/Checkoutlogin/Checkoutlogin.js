import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isUserSignedin, SigninUser } from '../../../../Redux/actions'
import './Checkoutlogin.css'

const customStyles = {
  content: {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '90%',
    diplay: 'block',
    overflow: 'auto',
    padding: '10px',
    transform: 'translate(-50%, -50%)',
    zIndex: '1'
  }
}

function Checkoutlogin ({ index, previousButton, nextButton }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [tokenAUth, setTokenAuth] = useState(auth.token)


  function userSignIn (e) {
    e.preventDefault()
    const user = {
      email,
      password
    }

    dispatch(SigninUser(user))

  }


  return (
    <div className='login-checkout'>
      <div className='signUp-btn-container signup-checkout'>
        <button
          className='signup'
          // onClick={openModal}
        >
          Sign up
        </button>
      </div>

      <form action='' className='signin-container' onSubmit={userSignIn}>
        <div className='email-container'>
          <h1>Welcome back</h1>
          <p>Email</p>
          <input
            type='text'
            placeholder='E.g yagami@gmail.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='password-container'>
          <p>Password</p>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className='sign_in_btn'>Sign in</button>
        </div>
      </form>
    
    </div>
  )
}

export default Checkoutlogin
