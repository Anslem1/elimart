import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SignInModal from '../AuthModals/SigninModal/SignInModal'
import SignUpModalComponent from '../AuthModals/SignUpModal/SignUpModal'
import { signOutUser } from '../../Redux/actions'
import MobileSideBar from './MobileSideBar'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '85%',
    diplay: 'block',
    overflow: 'auto',
    padding: '10px',
    transform: 'translate(-50%, -50%)',
    zIndex: '1'
  }
}
const signUpCustomStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '85%',
    diplay: 'block',
    overflow: 'auto',
    padding: '10px',
    transform: 'translate(-50%, -50%)',
    zIndex: '1',
    height: '70vh'
  }
}

function MobileNav () {
  const [showCategory, setShowCategory] = useState(false)

  const category = useSelector(state => state.category)
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const [signInModal, setSignInModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)

  const auth = useSelector(state => state.auth)

  let subtitle

  function afterOpenSignInModal () {
    subtitle.styles.color = '#f00'
  }

  function closeSigninModal () {
    setSignInModal(false)
  }

  function openSignInModal () {
    closeSignUpModal(false)
    setSignInModal(true)
  }

  function openSignUpModal () {
    setSignInModal(false)
    setSignUpModal(true)
  }
  function afterOpenSignUpModal () {
    subtitle.styles.color = '#f00'
  }

  function closeSignUpModal () {
    setSignUpModal(false)
  }

  function loginModal () {
    return (
      <SignInModal
        isOpen={signInModal}
        onAfterOpen={afterOpenSignInModal}
        onRequestClose={closeSigninModal}
        style={customStyles}
        ariaHideApp={false}
        openModal={openSignUpModal}
      />
    )
  }

  function signOut () {
    dispatch(signOutUser())
  }

  function signUpModalFunc () {
    return (
      <SignUpModalComponent
        isOpen={signUpModal}
        onAfterOpen={afterOpenSignUpModal}
        onRequestClose={closeSignUpModal}
        style={signUpCustomStyles}
        openSignInModal={openSignInModal}
        ariaHideApp={false}
      />
    )
  }

  return (
    <>
      <nav className='mobile-navbar-container'>
        <div className='mobile-header '>
          <div className='mobile-nav-item-container'>
            <MobileSideBar />

            <Link to='/' className='link'>
              <h3>
                <i className='fa-solid fa-cart-plus'></i>
                Elimart
              </h3>
            </Link>
          </div>

          <div className='mobile-nav-item-container'>
            <Link to='/cart' className='link'>
              <p className='cart-count'>
                <i className='fa-solid fa-cart-arrow-down'></i>
                {
                  <>
                    {Object.keys(cart.cartItems).length > 0 && (
                      <span>{Object.keys(cart.cartItems).length}</span>
                    )}
                  </>
                }
              </p>
            </Link>
            {auth.token && (
              <Link to={'/profile'} className='link'>
                <p>
                  <i className='fa-solid fa-user'></i>
                </p>
              </Link>
            )}
            {auth.token ? (
              <p onClick={signOut}>
                Logout
                <i class='fa-solid fa-right-from-bracket'></i>
              </p>
            ) : (
              <p onClick={openSignInModal}>
                Login
                <i className='fa-solid fa-right-to-bracket'></i>
              </p>
            )}
          </div>
        </div>
        <div className='mobile-input-container'>
          <input type='text' name='' id='' placeholder='Search' />
          <div className='mobile-search-container'>
            <i className='fa-solid fa-search'></i>
          </div>
        </div>
      </nav>
      {loginModal()}
      {signUpModalFunc()}
    </>
  )
}

export default MobileNav
