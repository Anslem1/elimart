const bcrypt = require('bcrypt')
const User = require('../../../Models/User')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.signUp = async (req, res) => {
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) res.status(400).json({ message: 'Email already exists' })
    else if (error)
      res.status(500).json({ message: 'Something went wrong, try again' })
    else {
      const { firstName, lastName, email } = req.body
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        fullName: firstName + ' ' + lastName,
        username: req.body.username
          ? req.body.username
          : Math.random().toString()
      })
      newUser.save((error, data) => {
        if (error) res.status(500).json({ message: 'Something went wrong' })
        else if (data)
          res.status(201).json({ message: 'User has been created' })
      })
    }
  })
}

exports.signIn = async (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (error) res.status(400).json({ error: 'Something went wrong' })
    if (user && validated && user.role === 'user') {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h'
        }
      )
      res.cookie('token', token, { expiresIn: '1h' })
      const { password, ...userCreds } = user._doc
      res.status(200).json({ token, user: userCreds })
    } else
      return res.status(400).json({ message: 'Wrong username or password' })
  })
}

exports.signOut = async (req, res) => {
  const cookie = res.clearCookie('token')
  res.status(200).json({
    message: 'You have signed out successfully'
  })
}
