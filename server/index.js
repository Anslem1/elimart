const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')

const adminRoutes = require('./src/Routes/Auth/Admin/admin.auth')
const userRoutes = require('./src/Routes/Auth/User/user.auth')
const categoryRoutes = require('./src/Routes/Category/category')

const app = express()
env.config()
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Mongo working?'))
  .catch(err => console.log(err))

app.use('/api/auth/admin', adminRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/categories', categoryRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`)
})
