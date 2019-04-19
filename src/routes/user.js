const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users', async (req, res) => {
	const user = new User(req.body)
	try {
		const users = await User.findOne({ email: req.body.email })
		if (users) {
			throw new Error('Duplicate email')
		}

		await user.save()
		res.status(201).send(user) //201 Created
	} catch (e) {
		res.status(400).send({ error: e.message }) //400-Bad Request 
	}
})

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({token})
	} catch (e) {
		res.status(400).send({ error: e.message })
	}
})

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
})



module.exports = router