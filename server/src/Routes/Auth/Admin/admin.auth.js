const {
  signUp,
  signIn,
  requireSignin
} = require('../../../Controllers/Auth/Admin/Auth')

const router = require('express').Router()

router.post('/signup', signUp)

router.post('/signin', signIn)

router.post('/profile', requireSignin, (req, res) => {
  res.status(200).json({ user: 'profile' })
})

module.exports = router
