import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { numberWithCommas } from '../../Midlleware'
import { addToCart, getProductDetailsById } from '../../Redux/actions'


import './SingleProductDetails.css'

function SingleProductDetails () {
  const dispatch = useDispatch()
  const params = useParams()
  const products = useSelector(state => state.products)
  const { productDetails } = products
  const cart = useSelector(state => state.cart)
  // const cartItems =
  const [cartItems, setCartItems] = useState(cart.cartItems)
  const [qunatity, setQuantity] = useState('')

  console.log(cartItems)

  const { _id, quantity } = productDetails

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

  // console.log(productDetails)

  function addSingleItemToCart () {
    const { _id, name, price } = productDetails
    console.log({
      _id,
      name,
      price
    })

    const cartImage = productDetails.productPictures[0].images
    console.log(cartImage)
    dispatch(addToCart({ _id, name, price, cartImage }))
  }

  return (
    <div className='product-details-container'>
      <div className='product-image-container'>
          {
            <img
              src={(productDetails.productPictures[0].images)}
              alt=''
            />
          }
        <div className='other-images-container'>
          {productDetails.productPictures.map(images => {
            return (
              <img
                src={(images.images)}
                alt=''
                className='other-images'
              />
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
          <button className='buy-now'>Buy now</button>
        </div>
      </div>
    </div>
  )
}

export default SingleProductDetails
