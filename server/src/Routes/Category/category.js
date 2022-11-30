const {
  createCategories,
  getAllCategories,
  updateCategories,
  deleteCategories
} = require('../../Controllers/Category/Category')
const {
  requireSignin,
  adminMiddleware,
  upload
} = require('../../Middlewares/middleware')
const shortid = require('shortid')
const path = require('path')
const multer = require('multer')

const router = require('express').Router()


router
  .post(
    '/create',
    requireSignin,
    adminMiddleware,
    upload.single('categoryImage'),
    createCategories
  )
  .post(
    '/update',
    requireSignin,
    adminMiddleware,
    upload.array('categoryImage'),
    updateCategories
  )
  .post(
    '/delete',
    requireSignin,
    adminMiddleware,
    deleteCategories
  )
  .get('/get', getAllCategories)

module.exports = router
