const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const adminRoutes = require('./src/Routes/Auth/Admin/admin.auth')
const userRoutes = require('./src/Routes/Auth/User/user.auth')
const categoryRoutes = require('./src/Routes/Category/category')
const productRoutes = require('./src/Routes/Product/product')
const cartRoutes = require('./src/Routes/Cart/cart')
const pageTypeRoute = require('./src/Routes/Admin/Pagetype/Pagetype')
const initialDataRoutes = require('./src/Routes/Admin/initialdata')
const addressRoutes = require('./src/Routes/Address/address')

const app = express()

env.config()

app.use(express.json())
app.use('/public', express.static(path.join(__dirname, './src/uploads/')))

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Mongo working?'))
  .catch(err => console.log(err))

app.use(cors())
app
  .use('/api/auth/admin', adminRoutes)
  .use('/api/auth', userRoutes)
  .use('/api/categories', categoryRoutes)
  .use('/api', productRoutes)
  .use('/api/user/cart', cartRoutes)
  .use('/api/pagetype', pageTypeRoute)
  .use('/api', initialDataRoutes)
  .use('/api/user/address', addressRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`)
})
