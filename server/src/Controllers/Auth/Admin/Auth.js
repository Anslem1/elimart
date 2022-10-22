const bcrypt = require('bcrypt')
const User = require('../../../Models/User')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {
  try {
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
            : Math.random().toString(),
          role: 'admin'
        })
        newUser.save((error, data) => {
          if (error) res.status(500).json({ message: 'Something went wrong' })
          else if (data)
            res.status(200).json({ message: 'Admin has been created' })
        })
      }
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.signIn = async (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) res.status(400).json({ error: 'Something went wrong' })
    if (user) {
      const validated = await bcrypt.compare(req.body.password, user.password)

      if (validated && user.role === 'admin') {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: '1000d'
          }
        )
        res.cookie('token', token, { expiresIn: '1h' })
        const { password, ...userCreds } = user._doc
        res.status(200).json({ token, user: userCreds })
      } else res.status(400).json({ message: 'Wrong username or password' })
    } else res.status(400).json({ message: 'Wrong username or password' })
  })
}

exports.signOut = async (req, res) => {
  const cookie = res.clearCookie('token')
  console.log(cookie)

  res.status(200).json({
    message: 'You have signed out successfully'
  })
}

// exports.requireSignin = (req, res, next) => {
//   const token = req.headers.authorization.split(' ')[1]
//   const user = jwt.verify(token, process.env.JWT_SECRET)
//   // console.log(token)
//   req.user = user
//   next()
// }
