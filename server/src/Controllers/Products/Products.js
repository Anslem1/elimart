const Product = require('../../Models/Product')
const slugify = require('slugify')

exports.createProduct = (req, res) => {
  //   res.status(200).json({ file: req.files, body: req.body })
  const { name, description, price, category, quantity, createdBy } = req.body
  let productPictures = []

  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      //   console.log(file.filename)
      return { images: file.filename }
    })
  }
  const product = new Product({
    name,
    slug: slugify(name),
    description,
    price,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id
  })

  product.save((error, product) => {
    if (error) res.status(400).json({ error })
    if (product) res.status(200).json({ product })
  })
}
