import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { numberWithCommas } from '../../Midlleware'
import { addToCart, getProductDetailsById } from '../../Redux/actions'

import './SingleProductDetails.css'

function SingleProductDetails () {
  const dispatch = useDispatch()
  const params = useParams()
  const products = useSelector(state => state.products)
  const { productDetails } = products
  const cart = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)
  // const cartItems =
  const [cartItems, setCartItems] = useState(cart.cartItems)
  const [qunatity, setQuantity] = useState('')

  const { _id, quantity } = productDetails
  const navigate = useNavigate()

  useEffect(() => {
    const { productId } = params
    const payload = {
      params: {
        productId
      }
    }
    dispatch(getProductDetailsById(payload))
  }, [])
  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

  if (Object.keys(productDetails).length === 0) {
    return null
  }

  function addSingleItemToCart () {
    const { _id, name, price } = productDetails

    const cartImage = productDetails.productPictures[0].images

    dispatch(addToCart({ _id, name, price, cartImage }))
  }
  function buyNow () {
    const { _id, name, price } = productDetails
    const cartImage = productDetails.productPictures[0].images
    dispatch(addToCart({ _id, name, price, cartImage }))
    navigate('/checkout')
  }

  return (
    <div className='product-details-container'>
      <div className='product-image-container'>
        {<img src={productDetails.productPictures[0].images} alt='' />}
        <div className='other-images-container'>
          {productDetails.productPictures.map(images => {
            return (
              <a href={images.images} className='link'>
                <img src={images.images} alt='' className='other-images' />
              </a>
            )
          })}
        </div>
      </div>

      <div className='product-details-content'>
        <div className='product-name'>
          <h2>{productDetails.name}</h2>
          <p>{productDetails.description}</p>
        </div>
        <div className='product-name'>
          <p className='product-price'>
            {numberWithCommas(productDetails.price)}
          </p>
        </div>

        <div className='buy-add-to-cart'>
          <button className='add-to-cart' onClick={addSingleItemToCart}>
            Add to cart
          </button>
          <button className='buy-now' onClick={buyNow}>
            Buy now
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProductDetails
