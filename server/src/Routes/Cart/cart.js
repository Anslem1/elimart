const { addItemsToCart, getCartItems } = require('../../Controllers/Cart/Cart')
const {
  requireSignin,
  adminMiddleware,
  userMiddleware
} = require('../../Middlewares/middleware')

const router = require('express').Router()

router
  .post('/add-to-cart', requireSignin, userMiddleware, addItemsToCart)
  .get('/get-cart-items', requireSignin, userMiddleware, getCartItems)

module.exports = router
