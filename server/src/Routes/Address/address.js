const { getAddress, addAddress } = require('../../Controllers/Address/Address')
const {
  requireSignin,
  userMiddleware
} = require('../../Middlewares/middleware')

const router = require('express').Router()

router
  .post('/create', requireSignin, userMiddleware, addAddress)
  .post('/get', requireSignin, userMiddleware, getAddress)

module.exports = router
