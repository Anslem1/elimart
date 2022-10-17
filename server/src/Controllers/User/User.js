const bcrypt = require('bcrypt')
const User = require('../../Models/User')

exports.signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    User.findOne({ email: req.body.email }).exec((error, user) => {
      if (user) return res.status(403).json({ message: 'Email already exists' })
      else if (error)
        return res
          .status(500)
          .json({ message: 'Something went wrong, try again' })
      else {
        const { firstName, lastName, email, password } = req.body
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          fullName: firstName + ' ' + lastName,
          username: Math.random().toString()
        })
        newUser.save((error, data) => {
          if (error)
            return res.status(500).json({ message: 'Something went wrong' })
          else if (data)
            return res.status(201).json({ message: 'User has been created' })
        })
      }
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.signIn = async (req, res) => {
  //   try {
  //     User.findOne({ email: req.body.email }).exec((error, user) => {
  //       if (!user)
  //         return res.status(404).json({ message: 'Wrong username or password' })
  //       else if (error)
  //         return res
  //           .status(500)
  //           .json({ message: 'Something went wrong, try again' })
  //     })
  //     const validated = await bcrypt.compare(req.body.password, email.password)
  //     const { password, ...userCreds } = email._doc
  //     if (validated) {
  //       res.status(200).json({ userCreds })
  //     } else {
  //       res.status(400).json({ message: 'Wrong username or password' })
  //     }
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
}
