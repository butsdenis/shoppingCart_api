const express = require('express')
const authSuper = require('../middleware/authSuper')
const authAdmin = require('../middleware/authAdmin')
const CategoryControllers = require('../controllers/category')
const router = new express.Router()

router.get('/category', CategoryControllers.getCategories)
router.get('/category/:id', CategoryControllers.getCategoryById)
router.post('/category', authAdmin, CategoryControllers.addCategory)
router.patch('/category/:id', authAdmin, CategoryControllers.editCategory)
router.delete('/category/:id', authAdmin, CategoryControllers.deleteCategories)

module.exports = router;