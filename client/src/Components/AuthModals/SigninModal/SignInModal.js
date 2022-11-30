import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SigninUser } from '../../../Redux/actions'
import './SignInModal.css'

function SignInModal (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  const {
    isOpen,
    onAfterOpen,
    style,
    onRequestClose,
    ariaHideApp,
    openModal
  } = props

  function userSignIn (e) {
    e.preventDefault()
    const user = {
      email,
      password
    }
    dispatch(SigninUser(user))
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      style={style}
      ariaHideApp={ariaHideApp}
    >
      <div className='signin-content'>
        <div className='signUp-btn-container'>
          <button className='signup' onClick={openModal}>
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
    </Modal>
  )
}

export default SignInModal
