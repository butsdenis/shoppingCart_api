const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const ReviewControllers = require('../controllers/review')

router.get('/reviews', auth, ReviewControllers.getReviews)
router.get('/reviews/:id', auth, ReviewControllers.getProductReviews)
router.post('/reviews/:id', auth, ReviewControllers.sendReview)

module.exports = router;
// router.get('/reviews/:id', auth, async (req, res) => {
//   try {
//     const reviews = await Review.find()
//     const user = {
//       path: 'user', 
//       select: 'avatar name'
//     }

//     if (!reviews) {
//       return res.status(404).send()
//     }
    
//     await reviews.populate(user).exec((err, doc) => {
//       if(err) {return console.log(err)}
//       res.send(doc)
//     })
    
//   } catch (e) {
//     return res.status(500).send({ error: e.message })
//   }
// })

