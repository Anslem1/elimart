const {
  signUp,
  signIn,
  signOut
} = require('../../../Controllers/Auth/Admin/Auth')
const { requireSignin } = require('../../../Middlewares/middleware')
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest
} = require('../../../Validators/Auth')

const router = require('express').Router()

router.post('/signup', validateSignUpRequest, isRequestValidated, signUp)

router.post('/signin', validateSignInRequest, isRequestValidated, signIn)

router.post('/signout', requireSignin, signOut)

module.exports = router
