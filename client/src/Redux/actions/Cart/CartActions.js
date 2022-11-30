import { cartConstants } from '../constants/constants'
import store from '../../store'
import axios from '../../helpers/axios'

function getCartItems () {
  return async dispatch => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST })
      const res = await axios.get('/user/cart/get-cart-items')

      if (res.status === 200) {
        const { cartItems } = res.data

        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems }
          })
        }
      }
    } catch (error) {
      console.log({ error })
    }
  }
}

export function addToCart (product, cartItemQuantity = 1) {
  return async dispatch => {
    const {
      cart: { cartItems },
      auth
    } = store.getState()

    const quantity = cartItems[product._id]
      ? parseInt(cartItems[product._id].quantity + cartItemQuantity)
      : 1
    cartItems[product._id] = {
      ...product,
      quantity
    }

    if (auth.authenticated) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST })
      const payload = {
        cartItems: [{ product: product._id, quantity }]
      }

      const res = await axios.post('/user/cart/add-to-cart', payload)

      if (res.status === 200) {
        dispatch(getCartItems())
      } else {
        localStorage.setItem('cart', JSON.stringify(cartItems))
      }
    }

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems }
    })
  }
}

export function updateCart () {
  return async dispatch => {
    const { auth } = store.getState()
    let cartItems = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : null
    if (auth.authenticated) {
      localStorage.removeItem('cart')
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].quantity,
              product: cartItems[key]._id
            }
          })
        }
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post('/user/cart/add-to-cart', payload)
          if (res.status === 200) {
            dispatch(getCartItems())
          }
        }
      }
    } else if (cartItems) {
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems }
      })
    }
  }
}
export function removeCartItem (payload) {
  return async dispatch => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST })
      const res = await axios.post('/user/cart/remove', { payload })
      console.log({ res })
      if (res.status === 200) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS })
        dispatch(getCartItems())
      } else {
        const { error } = res.data
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error }
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }
}

export { getCartItems }
