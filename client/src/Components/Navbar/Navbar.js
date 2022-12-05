import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../Redux/actions/Category/CategoryAction'
import { Link } from 'react-router-dom'
import SignUpModalComponent from '../AuthModals/SignUpModal/SignUpModal'
import SignInModal from '../AuthModals/SigninModal/SignInModal'
import { signOutUser } from '../../Redux/actions'

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

function Navbar () {
  const [showCategory, setShowCategory] = useState(false)
  const [signInModal, setSignInModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)

  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)

  let subtitle

  function afterOpenSignInModal () {
    subtitle.styles.color = '#f00'
  }

  function closeSigninModal () {
    setSignInModal(false)
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

  function openSignInModal () {
    closeSignUpModal(false)
    setSignInModal(true)
  }

  function signOut () {
    dispatch(signOutUser())
  }

  const category = useSelector(state => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  function renderCategories (categories) {
    let allCategories = []
    for (let category of categories) {
      allCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&pagetype=${category.pagetype}`}
              onClick={() => setShowCategory(false)}
            >
              {category.name}
            </a>
          ) : (
            <span>
              {' '}
              <a
                href={`/${category.slug}?cid=${category._id}&pagetype=${category.pagetype}`}
                  onClick={() => setShowCategory(false)}
                  className='link'
              >
                {' '}
                {category.name}
              </a>
            </span>
          )}
          {category.children.length > 0 && (
            <ul>{renderCategories(category.children)}</ul>
          )}
        </li>
      )
    }
    return allCategories
  }

  function categoryHeader () {
    return (
      showCategory && (
        <div>
          <ul>
            {category.categories.length > 0
              ? renderCategories(category.categories)
              : null}
          </ul>
        </div>
      )
    )
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

  function signUpModalFunc () {
    return (
      <SignUpModalComponent
        isOpen={signUpModal}
        onAfterOpen={afterOpenSignUpModal}
        onRequestClose={closeSignUpModal}
        style={customStyles}
        openSignInModal={openSignInModal}
        ariaHideApp={false}
      />
    )
  }

  return (
    <>
      <nav className='navbar-container'>
        <Link to='/' className='link'>
          <h3>
            <i className='fa-solid fa-cart-plus'></i>
            Elimart
          </h3>
        </Link>
        <div className='category-header'>
          <p onClick={() => setShowCategory(show => !show)}>
            Categories
            {showCategory ? (
              <i className='fa-solid fa-angle-up'></i>
            ) : (
              <i className='fa-solid fa-angle-down'></i>
            )}
          </p>

          {categoryHeader()}
        </div>
        <div className='input-container'>
          <input type='text' name='' id='' placeholder='Search' />
          <div className='search-container'>
            <i className='fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <Link to='/cart' className='link'>
          <p className='cart-count'>
            <i className='fa-solid fa-cart-arrow-down'></i>
            Cart
            {Object.keys(cart.cartItems).length > 0 && (
              <span>{Object.keys(cart.cartItems).length}</span>
            )}
          </p>
        </Link>
        {auth.token && (
          <Link to={'/profile'}>
            <p>
              <i className='fa-solid fa-user'></i>
            </p>
          </Link>
        )}
        {auth.token ? (
          <p onClick={signOut}>
            {' '}
            Signout
            <i className='fa-solid fa-arrow-right-to-bracket'></i>
          </p>
        ) : (
          <p onClick={openSignInModal}>
            {' '}
            Login
            <i className='fa-solid fa-arrow-right-to-bracket'></i>
          </p>
        )}
      </nav>
      {signUpModalFunc()}
      {loginModal()}
    </>
  )
}

export default Navbar
