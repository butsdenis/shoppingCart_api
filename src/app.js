const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Denis:' 
  + process.env.MONGO_ATLAS_PW 
  +'@firstapp-o9zmw.mongodb.net/test?retryWrites=true',
  {
    useNewUrlParser: true
  }
);


app.use(express.json())
app.use(userRoutes);



module.exports = app;