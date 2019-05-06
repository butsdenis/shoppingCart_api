const Order = require('../models/order')

// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//     res.send(orders)
//   } catch (e) {
//     return res.status(500).send({ error: e.message })
//   }
// }

exports.getOrders = (req, res, next) => {
  Order.find()
    .populate({path: 'order.product_id', select: 'title price'})
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

exports.createOrder = async (req, res) => {
  const order = new Order({
    name: req.body.buyingForm.name,
    email: req.body.buyingForm.email,
    phone: req.body.buyingForm.phone,
    status: req.body.buyingForm.status,
    ...req.body
  })

  try {
    await order.save()
    res.status(201).send(order)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.changeStatus = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['status']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (req.body.status == 'expect' || 
      req.body.status == 'complited' || 
      req.body.status == 'canceled') {

        if (!isValid) {
          return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
          const order = await Order.findOne({ _id: req.params.id })
      
          if (!order) {
            return res.status(404).send()
          }
          updates.forEach((update) => {
            order[update] = req.body[update]
          })
          await order.save()
          res.send(order)
        } catch (e) {
          res.status(400).send({ error: e.message })
        }
  }
  return res.status(400).send({ error: 'Wrong status' }) 
}