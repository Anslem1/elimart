const { check, validationResult } = require('express-validator')

exports.validateSignUpRequest = [
  check('firstName')
    .notEmpty()
    .withMessage('firstname is required'),
  check('lastName')
    .notEmpty()
    .withMessage('Lastname is required'),
  check('email')
    .notEmpty()
    .withMessage('email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password is should be more than 6 characters')
]
exports.validateSignInRequest = [
  check('email')
    .notEmpty()
    .withMessage('email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password is should be more than 6 characters')
]

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length > 0)
        return res.status(400).json({ error: errors.array()[0].msg })
    next()
}
