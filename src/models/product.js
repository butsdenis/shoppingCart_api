const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
  title: { 
    type: String, 
    required: true,
    trim: true 
  },

  image: { 
    type: String
  },

  text: { 
    type: String, 
    required: true,
    trim: true 
  },

  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category'
  },

  price: { 
    type: Number, 
    required: true 
  }
}, 
  {versionKey: false}
);

const Product = mongoose.model('Product', productSchema)
module.exports = Product