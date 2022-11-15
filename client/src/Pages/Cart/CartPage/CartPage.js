import React, { useState } from 'react'
import { numberWithCommas } from '../../../Midlleware'
import { generatePublicURL } from '../../../Redux/helpers/urlConfig'
import '../Cart.css'

function CartPage (props) {
  const { cartImage, name, price, key, _id } = props.cartItems
  const [quantity, setQuantity] = useState(props.cartItems.quantity)

  function incrementQuantity () {
    setQuantity(quantity + 1)
    props.incrementQuantity(_id, quantity + 1)
  }
  function decrementQuantity () {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
    props.decrementQuantity(_id, quantity - 1)
  }

  return (
    <div className='cart-content-container'>
      <div className='cart-content' key={key}>
        <div className='cart-image-container'>
          <img src={generatePublicURL(cartImage)} alt='' />
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
          <p>₦ {numberWithCommas(price)}</p>
        </div>
      </div>
      <div className='remove-save-later'>
        <div className='remove-save-later'>
          <p>
            Remove item <i className='fa-solid fa-trash'></i>
          </p>
          <p>
            Save for later <i className='fa-solid fa-heart'></i>
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
