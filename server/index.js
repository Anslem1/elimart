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

const app = express()

env.config()


app.use(express.json())
app.use('/public',express.static(path.join(__dirname, './src/uploads/')))

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Mongo working?'))
  .catch(err => console.log(err))

app.use(cors())
app.use('/api/auth/admin', adminRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/user/cart', cartRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`)
})
