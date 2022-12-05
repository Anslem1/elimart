import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PriceDetails from '../../Components/PriceDetails/PriceDetails'
import { numberWithCommas } from '../../Midlleware'
import { addToCart, getCartItems, removeCartItem } from '../../Redux/actions'
import { generatePublicURL } from '../../Redux/helpers/urlConfig'

import CartPage from './CartPage/CartPage'

function Cart () {
  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  function navigateToCheckout () {
    navigate('/checkout')
  }
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

  const onRemoveCartItem = _id => {
    dispatch(removeCartItem({ productId: _id }))
  }

  return (
    <main className='main-cart-container'>
      {Object.keys(cart.cartItems).length > 0 && (
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (
            quantity,
            key
          ) {
            return quantity + cart.cartItems[key].quantity
          },
          0)}
          totalPrice={Object.keys(cart.cartItems).reduce(function (
            totalPrice,
            key
          ) {
            const { price, quantity } = cart.cartItems[key]
            return totalPrice + price * quantity
          },
          0)}
        />
     
      )}

      {Object.keys(cartItems).length > 0 ? (
        <div className='cart-container'>
          <p>
            <i className='fa-solid fa-cart-shopping'></i>
            Items in your cart
          </p>
          {Object.keys(cartItems).map((key, index) => (
            <>
              <CartPage
                key={key}
                cartItems={cartItems[key]}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                onRemoveCartItem={onRemoveCartItem}
              />
            </>
          ))}
          <div className='subtotal'>
            {/* <h1>Subtotal:</h1> */}
            <button onClick={navigateToCheckout}>Place order</button>
            {/* <span>₦ {numberWithCommas('price')}</span> */}
          </div>
        </div>
      ) : (
        <>
          <div className='empty-cart'>
            <h1>
              Opps, looks like you have an empty cart{' '}
              <i className='fa-solid fa-magnifying-glass'></i>
            </h1>
          </div>
        </>
      )}
    </main>
  )
}

export default Cart
