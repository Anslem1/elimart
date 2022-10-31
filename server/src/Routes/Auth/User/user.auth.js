const { signUp, signIn } = require('../../../Controllers/Auth/User/Auth')
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest
} = require('../../../Validators/Auth')

const router = require('express').Router()

router
  .post('/signup', validateSignUpRequest, isRequestValidated, signUp)
  .post('/signin', validateSignInRequest, isRequestValidated, signIn)

module.exports = router
