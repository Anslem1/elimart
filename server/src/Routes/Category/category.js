const {
  createCategories,
  getAllCategories
} = require('../../Controllers/Category/Category')
const {
  requireSignin,
  adminMiddleware
} = require('../../Middlewares/middleware')

const router = require('express').Router()

router.post('/create', requireSignin, adminMiddleware, createCategories)
router.get('/getcategories', getAllCategories)

module.exports = router
