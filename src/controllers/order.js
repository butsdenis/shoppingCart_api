const Order = require('../models/order')

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.send(orders)
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
}

exports.createOrder = async (req, res) => {
  console.log(req)
  const order = new Order({
    name: req.body.buyingForm.name,
    email: req.body.buyingForm.email,
    phone: req.body.buyingForm.phone,
    ...req.body
  })

  try {
    await order.save()
    res.status(201).send(order)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}