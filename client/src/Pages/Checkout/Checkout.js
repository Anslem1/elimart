import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PriceDetails from '../../Components/PriceDetails/PriceDetails'
import './Checkout.css'
import CheckoutProgressBar from './CheckoutProgressBar/CheckoutProgressBar'
import { CheckoutFormItems } from './Components/CheckoutFormItem'

function Checkout () {

  const cart = useSelector(state => state.cart)
  const [index, setIndex] = useState(1)

  function previousButton () {
    if (index <= 1) return
    setIndex(prevIndex => prevIndex - 1)
  }
  function nextButton () {
    if (index >= 4) return
    setIndex(nextIndex => nextIndex + 1)
  }



  return (
    <div className='checkout-container'>
      <div className='progress-bar-content'>
        <div className='progress-bar-container'>
          <CheckoutProgressBar step={index} />
        </div>
      </div>
      <div className='page-price-item price-components'>
        <div className='price-components'>
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
        </div>
      </div>
      <div className='checkout-login-page'>
        <CheckoutFormItems
          index={index}
          setIndex={setIndex}
          previousButton={previousButton}
          nextButton={nextButton}
        />
      </div>
    </div>
  )
}

export default Checkout
