const {
  createCategories,
  getAllCategories
} = require('../../Controllers/Category/Category')
const {
  requireSignin,
  adminMiddleware
} = require('../../Middlewares/middleware')
const shortid = require('shortid')
const path = require('path')
const multer = require('multer')

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
  upload.single('categoryImage'),
  createCategories
)
router.get('/getcategories', getAllCategories)

module.exports = router
