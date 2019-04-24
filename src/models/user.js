const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    unique: true, 
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalide')
      }
    }
  },
  
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password can\'t contain "password"')
      }
    }
  },

  role: {
    type: String,
    default: 'editor'
  },
  
  avatar: { 
    type: String,
    default: 'uploads/2b3b787fdeb42b4364dffa3920f89d4e' 
  }

}, {versionKey: false} )

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  let token;

  if (user.role == 'super') {
    this.token = jwt.sign(
      {
        _id:user._id.toString(),
        name:user.name.toString(),
        role:user.role.toString()
      },process.env.JWT_KEY_SUPER,
      {
        expiresIn: '1h'
      })
    await user.save()
    return this.token
  }

  if (user.role == 'admin') {
    this.token = jwt.sign(
      {
        _id:user._id.toString(),
        name:user.name.toString(),
        role:user.role.toString()
      },process.env.JWT_KEY_ADMIN,
      {
        expiresIn: '1h'
      })
    await user.save()
    return this.token
  } else {
    this.token = jwt.sign(
      {
        _id:user._id.toString(),
        name:user.name.toString(),
        role:user.role.toString()
      },process.env.JWT_KEY,
      {
        expiresIn: '100000h'
      })
    await user.save() 
    return this.token
  }
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Wrong e-mail')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Wrong password')
  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User