const { addItemsToCart } = require('../../Controllers/Cart/Cart')
const {
  requireSignin,
  adminMiddleware,
  userMiddleware
} = require('../../Middlewares/middleware')

const router = require('express').Router()

router.post('/add-to-cart', requireSignin, userMiddleware, addItemsToCart)

module.exports = router
