const jwt = require('jsonwebtoken')

const authSuper = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, process.env.JWT_KEY_SUPER)
		req.user = decoded
		next()
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate.' })
	}
}

module.exports = authSuper