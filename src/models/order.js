const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  
  name: {
    type: String, 
    required: true,
    trim: true,
    lowercase: true
    },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    },
  phone: {
    type: String, 
    required: true,
    trim: true,
    lowercase: true
    },
  order: [{
    price: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true
    },
  }]
  }, {versionKey: false}
);

const Order = mongoose.model('Order', orderSchema)
module.exports = Order