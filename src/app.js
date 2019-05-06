const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')

mongoose.connect('mongodb+srv://Denis:' 
  + process.env.MONGO_ATLAS_PW 
  +'@firstapp-o9zmw.mongodb.net/test?retryWrites=true',
  {
    useNewUrlParser: true
  }
)

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)
app.use(reviewRoutes)
app.use(categoryRoutes)
app.use(orderRoutes)




module.exports = app;
