const express = require('express')
const authSuper = require('../middleware/authSuper')
const authAdmin = require('../middleware/authAdmin')
const CategoryControllers = require('../controllers/category')
const router = new express.Router()

router.get('/category', CategoryControllers.getCategories)
router.post('/category', [authSuper || authAdmin], CategoryControllers.addCategory)
router.patch('/category/:id', [authSuper || authAdmin], CategoryControllers.editCategory)
router.delete('/category/:id', [authSuper || authAdmin], CategoryControllers.deleteCategories)

module.exports = router;