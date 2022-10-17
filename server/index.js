const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')

const userRoutes = require('./src/Routes/user')

const app = express()
env.config()
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Mongo working?'))
  .catch(err => console.log(err))

//

app.use('/api/auth', userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`)
})