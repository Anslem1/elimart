const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById
} = require('../../Controllers/Products/Products')

const {
  requireSignin,
  adminMiddleware,
  upload
} = require('../../Middlewares/middleware')

const router = require('express').Router()

router
  .post(
    '/product/create',
    requireSignin,
    adminMiddleware,
    upload.array('productPicture'),
    createProduct
  )
  .get('/products/:slug', getProductsBySlug)
  .get('/product/:productId', getProductDetailsById)

module.exports = router
