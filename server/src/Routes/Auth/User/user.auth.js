const {
  signUp,
  signIn,
  requireSignin
} = require('../../../Controllers/Auth/User/Auth')
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest
} = require('../../../Validators/Auth')

const router = require('express').Router()

router.post('/signup', validateSignUpRequest, isRequestValidated, signUp)

router.post('/signin', validateSignInRequest, isRequestValidated, signIn)

router.post('/profile', requireSignin, (req, res) => {
  res.status(200).json({ user: 'profile' })
})

module.exports = router
