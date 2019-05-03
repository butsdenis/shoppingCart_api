const express = require('express')
const router = new express.Router()
const OrderControllers = require('../controllers/order')

router.get('/order', OrderControllers.getOrders)
router.post('/order', OrderControllers.createOrder)

module.exports = router;

