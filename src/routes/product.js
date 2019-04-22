const express = require('express')
const multer = require('multer')
const auth = require('../middleware/auth')
const ProductControllers = require('../controllers/product')
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

router.get('/products', auth, ProductControllers.getProducts)
router.get('/products/:id', auth, ProductControllers.getProduct) 
router.post('/products', upload.single('image'), auth, ProductControllers.createProduct)
router.patch('/products/:id', upload.single('image'), auth, ProductControllers.editProduct)
router.delete('/products/:id', auth, ProductControllers.deleteProduct)

module.exports = router