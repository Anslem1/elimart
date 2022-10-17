const {  signUp, signIn } = require('../Controllers/User/User')

const router = require('express').Router()

router.post('/signup', signUp)

router.post('/signin', signIn)

module.exports = router
