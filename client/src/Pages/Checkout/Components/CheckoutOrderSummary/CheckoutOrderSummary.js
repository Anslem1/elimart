import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../../Redux/actions'
import CartPage from '../../../Cart/CartPage/CartPage'
import './CheckoutOrderSummary.css'

function CheckoutOrderSummary ({ previousButton, nextButton }) {
  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)
  const [cartItems, setCartItems] = useState(cart.cartItems)
  const [orderCofirmation, setOrderConfirmation] = useState(false)

  const dispatch = useDispatch()

  function incrementQuantity (_id, quantity) {
    if (auth.authenticated) {
      const { name, price, cartImage } = cartItems[_id]
      dispatch(addToCart({ _id, name, price, cartImage }, +1))
    }
  }

  function decrementQuantity (_id, quantity) {
    if (auth.authenticated) {
      const { name, price, cartImage } = cartItems[_id]
      dispatch(addToCart({ _id, name, price, cartImage }, -1))
    }
  }

  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

  function userOrderConfirmation () {
    nextButton()
  }

  return (
    <>
      <div className='cart-container price-components'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <button
            onClick={() => previousButton()}
            className='edit-delivary-btn cancel_btn order-summary-btn'
          >
            {' '}
            Previous
          </button>
          <button
            style={{
              width: '80px'
            }}
            onClick={userOrderConfirmation}
            className='edit-delivary-btn  order-summary-btn'
          >
            Continue
          </button>
        </div>

        <p className='confirmation'>
          An order confirmation email would be sent to{' '}
          <strong>{auth.user.email}</strong>{' '}
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
      </div>
    </>
  )
}

export default CheckoutOrderSummary
