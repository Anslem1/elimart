import React, { useState } from 'react'
import { numberWithCommas } from '../../../Midlleware'

import '../Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { authConstants } from '../../../Redux/actions/constants/constants'

function CartPage (props) {
  const { cartImage, name, price, key, _id } = props.cartItems
  const [quantity, setQuantity] = useState(props.cartItems.quantity)
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)

  function incrementQuantity () {
    setQuantity(quantity + 1)
    props.incrementQuantity(_id, quantity + 1)
  }
  function decrementQuantity () {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
    props.decrementQuantity(_id, quantity - 1)
  }

  function removeCareItem () {
    if (auth.authenticated) {
      props.onRemoveCartItem(_id)
    } 
  }

  return (
    <div className='cart-content-container'>
      <div className='cart-content' key={_id}>
        <div className='cart-image-container'>
          <img src={cartImage} alt='' />
          <div className='increase-cart-amount'>
            <button onClick={decrementQuantity}> − </button>
            <span>
              <strong>{quantity} </strong>{' '}
            </span>
            <button onClick={incrementQuantity}>+</button>
          </div>
        </div>
        <div className='cart-name-price'>
          <p> {name}</p>
          <p>{numberWithCommas(price)}</p>
        </div>
      </div>
      <div className='remove-save-later'>
        <div className='remove-save-later'>
          <p onClick={() => props.onRemoveCartItem(_id)}>
            Remove item <i className='fa-solid fa-trash'></i>
          </p>
        </div>
        <div className='arrives-container'>
          <p>
            {' '}
            <i className='fa-solid fa-truck'></i>
            Arrives in 2 -3 days
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartPage
