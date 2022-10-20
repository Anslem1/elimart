const { createProduct } = require('../../Controllers/Products/Products')
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const shortid = require('shortid')
const path = require('path')

const {
  requireSignin,
  adminMiddleware
} = require('../../Middlewares/middleware')

const router = require('express').Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), '../uploads/'))
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post(
  '/create',
  requireSignin,
  adminMiddleware,
  upload.array('productPicture'),
  createProduct
)

module.exports = router
