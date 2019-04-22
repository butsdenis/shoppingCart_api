const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const ReviewControllers = require('../controllers/review')

router.get('/reviews', auth, ReviewControllers.getReviews)
router.get('/reviews/:id', auth, ReviewControllers.getProductReviews)
router.post('/reviews/:id', auth, ReviewControllers.sendReview)

module.exports = router;

