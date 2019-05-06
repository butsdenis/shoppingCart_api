const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const ReviewControllers = require('../controllers/review')

router.get('/reviews', ReviewControllers.getReviews)
router.get('/reviews/:id', ReviewControllers.getProductReviews)
router.post('/reviews/:id', auth, ReviewControllers.sendReview)

module.exports = router;

