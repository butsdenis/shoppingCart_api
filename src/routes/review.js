const express = require('express')
const auth = require('../middleware/auth')

const Review = require('../models/review')
const router = new express.Router()


router.get('/reviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find()
    res.send(reviews)
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
})

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

router.get('/reviews/:id', auth, (req, res, next) => {
  Review.find({product_id: req.params.id})
    .populate({path: 'user', select: 'avatar name'})
    .exec()
    .then(docs => {
      res.status(200).send(docs);
    })
    .catch(err => {
      res.status(500).send({
        error: err
      })
    })
})

router.post('/reviews/:id', auth, async (req, res) => {
  const id = req.params.id
  const review = new Review({
    product_id: id,
    user: req.user._id,
    ...req.body
  })

  try {
    await review.save()
    res.status(201).send(review)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }

})


module.exports = router;