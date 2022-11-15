import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { numberWithCommas } from '../../Midlleware'
import { addToCart, getCartItems } from '../../Redux/actions'
import { generatePublicURL } from '../../Redux/helpers/urlConfig'

import CartPage from './CartPage/CartPage'

function Cart () {
  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  // const cartItems =
  const [cartItems, setCartItems] = useState(cart.cartItems)
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(getCartItems())
    }
  }, [auth.authenticated])

  function incrementQuantity (_id, quantity) {
    const { name, price, cartImage } = cartItems[_id]
    dispatch(addToCart({ _id, name, price, cartImage }, +1))
  }

  function decrementQuantity (_id, quantity) {
    const { name, price, cartImage } = cartItems[_id]
    dispatch(addToCart({ _id, name, price, cartImage }, -1))
  }

  return (
    <main className='main-cart-container'>
      {Object.keys(cartItems).length > 0 ? (
        <div className='cart-container'>
          <p>
            <i className='fa-solid fa-cart-shopping'></i>
            Items in your cart
          </p>
          {Object.keys(cartItems).map((key, index) => (
            <>
              <CartPage
                key={index}
                cartItems={cartItems[key]}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            </>
          ))}
          <div className='subtotal'>
            <h1>Subtotal:</h1>
            <span>₦ {numberWithCommas('price')}</span>
          </div>
        </div>
      ) : (
        <>
          <div className='empty-cart'>
            <h1>
              Looks like you are yet to add any item to your cart{' '}
              <i className='fa-solid fa-magnifying-glass'></i>
            </h1>
          </div>
        </>
      )}
    </main>
  )
}

export default Cart
