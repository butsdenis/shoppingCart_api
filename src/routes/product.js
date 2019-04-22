const express = require('express')
const multer = require('multer')
const authSuper = require('../middleware/authSuper')
const authAdmin = require('../middleware/authAdmin')
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

router.get('/products', ProductControllers.getProducts)
router.get('/products/:id', ProductControllers.getProductById) 
router.get('/products/category/:category', ProductControllers.getProductsByCategory) 
router.post('/products', upload.single('image'), [authSuper || authAdmin], ProductControllers.createProduct)
router.patch('/products/:id', upload.single('image'), [authSuper || authAdmin], ProductControllers.editProduct)
router.delete('/products/:id', [authSuper || authAdmin], ProductControllers.deleteProduct)

module.exports = router