const express = require('express')
const auth = require('../middleware/auth')
const CategoryControllers = require('../controllers/category')
const router = new express.Router()

router.get('/category', auth, CategoryControllers.getCategories)
router.post('/category', auth, CategoryControllers.addCategory)
router.delete('/category/:id', auth, CategoryControllers.deleteCategories)


module.exports = router;