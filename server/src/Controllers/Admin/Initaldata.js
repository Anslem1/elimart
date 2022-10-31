const Category = require('../../Models/Category')
const Product = require('../../Models/Product')

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
      parentId: cate.parentId,
      children: addCategories(categories, cate._id)
    })
  }
  return categoryList
}

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec()
  const products = await Product.find({})
    .select('_id name slug description productPictures quantity price category')
    .populate({path: 'category', select: '_id name'})
    .exec()
  res.status(200).json({ categories: addCategories(categories), products })
}