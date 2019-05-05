const express = require('express')
const router = new express.Router()
const OrderControllers = require('../controllers/order')
const authAdmin = require('../middleware/authAdmin')

router.get('/order', authAdmin, OrderControllers.getOrders)
router.post('/order', OrderControllers.createOrder)

module.exports = router;

