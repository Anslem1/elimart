import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addOrder } from '../../../../Redux/actions'

import './CheckoutPayment.css'

function CheckoutPayment ({ previousButton }) {
  const [confirmOrder, setConfirmOrder] = useState(false)
  const cart = useSelector(state => state.cart)
  const orders = useSelector(state => state.user)
  const selectedAddress = JSON.parse(localStorage.getItem('confirmAddress'))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onConfirmOrder () {
    if (confirmOrder) {
      const totalAmount = Object.keys(cart.cartItems).reduce(
        (totalPrice, key) => {
          const { price, quantity } = cart.cartItems[key]

          return totalPrice + price * quantity
        },
        0
      )

      const items = Object.keys(cart.cartItems).map(key => ({
        productId: key,
        payablePrice: cart.cartItems[key].price,
        purchasedQuantity: cart.cartItems[key].quantity
      }))

      const payload = {
        addressId: selectedAddress._id,
        totalAmount,
        items,
        paymentStatus: 'pending',
        paymentType: 'cod'
      }

      dispatch(addOrder(payload))
      setConfirmOrder(true)

      {
        Object.keys(cart.cartItems).reduce(function (totalPrice, key) {
          const { price, quantity } = cart.cartItems[key]
          return totalPrice + price * quantity
        }, 0)
      }
      orders.fetchedOrders && navigate('/orders')
    } else {
      alert('Please select a method of payment')
      return
    }
  }

  return (
    <>
      <div className='login-checkout  payment-container'>
        <div className='payment-type-container'>
          <input type='radio' onClick={() => setConfirmOrder(true)} />
          <p>Cash on delivary</p>
        </div>
        <div className='previous-next'>
          <button onClick={previousButton} className='cancel_btn'>
            previous
          </button>
          <button onClick={onConfirmOrder} className='edit-delivary-btn'>
            Confirm order
          </button>
        </div>
      </div>
    </>
  )
}

export default CheckoutPayment
