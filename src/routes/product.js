const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const auth = require('../middleware/auth')
const Product = require('../models/product')
const router = new express.Router()


const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})

router.get('/products', auth, async (req, res) => {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
})

router.get('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })

    if (!product) {
      return res.status(404).send()
    }

    res.send(product)
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
})

router.post('/products', upload.single('image'), auth, async (req, res) => {
  const product = new Product({
    image: req.file.path,
    ...req.body
  })

  try {
    await product.save()
    res.status(201).send(product)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }

})

router.patch('/products/:id', upload.single('image'), auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['text', 'image', 'category', 'price', 'title']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (!isValid) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const product = await Product.findOne({ _id: req.params.id })

    if (!product) {
      return res.status(404).send()
    }
    if (req.file != undefined) {
      product.image = req.file.path
    }
    updates.forEach((update) => {
      product[update] = req.body[update]
    })
    await product.save()
    res.send(product)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
})

router.delete('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id })

    if (!product) {
      res.status(404).send()
    }

    res.send(product)
  } catch (e) {
    res.status(500).send({error: e.message})
  }
})


module.exports = router