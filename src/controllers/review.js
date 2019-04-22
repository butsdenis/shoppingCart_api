const Review = require('../models/review')

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
    res.send(reviews)
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
}

exports.getProductReviews = (req, res, next) => {
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
}

exports.sendReview = async (req, res) => {
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
}