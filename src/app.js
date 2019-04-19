const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const categoryRoutes = require('./routes/category')

mongoose.connect('mongodb+srv://Denis:' 
  + process.env.MONGO_ATLAS_PW 
  +'@firstapp-o9zmw.mongodb.net/test?retryWrites=true',
  {
    useNewUrlParser: true
  }
)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)
app.use(reviewRoutes)
app.use(categoryRoutes)

module.exports = app;