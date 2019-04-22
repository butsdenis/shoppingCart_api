const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  
  product_id:  { 
    type: Schema.Types.ObjectId, 
    required: true
  },

  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },

  rate: { 
    type: Number, 
    required: true 
  },
  
  text: { 
    type: String, 
    required: true,
    trim: true
  }
  }, {versionKey: false}
);

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review