import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Modal from 'react-modal'
import './SignUpModal.css'
import { SignUpUser } from '../../../Redux/actions'

function SignUpModal (props) {
  const dispatch = useDispatch()

  const {
    isOpen,
    onAfterOpen,
    style,
    onRequestClose,
    ariaHideApp,
    openSignInModal
  } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function userSignUp (e) {
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      username,
      email,
      password
    }
    dispatch(SignUpUser(user))
    onRequestClose()

    setFirstName('')
    setLastName('')
    setEmail('')
    setUsername('')
    setPassword('')

  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={style}
      ariaHideApp={ariaHideApp}
    >
      <div className='signUp-btn-container'>
        <button className='sign_in_btn signin' onClick={openSignInModal}>
          Sign In
        </button>
      </div>

      <div className='sign-up-header'>
        <h1>Welcome to Elimart. Shop more, pay less.</h1>
      </div>
      <form className='signup-container' action='' onSubmit={userSignUp}>
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
    </Modal>
  )
}

export default SignUpModal
