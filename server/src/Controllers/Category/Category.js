const Category = require('../../Models/Category')
const slugify = require('slugify')

function addCategories (categories, parentId = null) {
  const categoryList = []
  let category
  if (parentId === null) {
    category = categories.filter(cate => cate.parentId == undefined)
  } else {
    category = categories.filter(cate => cate.parentId == parentId)
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: addCategories(categories, cate._id)
    })
  }
  return categoryList
}

exports.createCategories = (req, res) => {
  const categoryObject = {
    name: req.body.name,
    slug: slugify(req.body.name)
  }

  let categoryImageUrl
  if (req.file) {
    categoryImageUrl = process.env.API + '/public/' + req.file.filename
    categoryObject.categoryImage = categoryImageUrl
  }

  if (req.body.parentId) {
    categoryObject.parentId = req.body.parentId
  }
  const cate = new Category(categoryObject)
  cate.save((error, category) => {
    if (error) res.status(400).json({ error })
    if (category) res.status(200).json({ category })
  })
}

exports.getAllCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) res.status(400).json({ error })
    if (categories) {
      const categoryLists = addCategories(categories)
      res.status(200).json({ categoryLists })
    }
  })
}
