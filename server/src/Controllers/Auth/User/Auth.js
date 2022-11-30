const bcrypt = require('bcrypt')
const User = require('../../../Models/User')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.signUp = async (req, res) => {
  const salt = await bcrypt.genSalt(12)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    try {
      const username = await User.findOne({
        username: req.body.username
      })

      if (user || username)
        res.status(400).json({ message: 'Email or username already exists' })
      if (error) res.status(400).json({ error })
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
        newUser.save((error, user) => {
          try {
            if (error) res.status(400).json({ error })
            if (user) {
              const token = jwt.sign(
                { _id: user._id, role: user.role },
                process.env.JWT_SECRET,
                {
                  expiresIn: '1h'
                }
              )
              const { password, ...userCreds } = user._doc
              res.status(200).json({
                token,
                user: userCreds,
                message: 'User successfully created'
              })
            }
          } catch (error) {
            res.status({ error })
          }
        })
      }
    } catch (error) {
      return res.status(500).json({ error })
    }
  })
}

exports.signIn = async (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    try {
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
    } catch (error) {
      return res.status(500).json(error)
    }
  })
}

exports.signOut = async (req, res) => {
  const cookie = res.clearCookie('token')
  res.status(200).json({
    message: 'You have signed out successfully'
  })
}
