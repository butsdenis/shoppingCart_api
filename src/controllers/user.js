const User = require('../models/user')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
}

exports.createUser = async (req, res) => {
	const user = new User(req.body)
	try {
		const users = await User.findOne({ email: req.body.email })
		if (users) {
			throw new Error('Duplicate email')
		}

		await user.save()
		res.status(201).send(user)
	} catch (e) {
		res.status(400).send({ error: e.message }) 
	}
}

exports.loginUser = async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({token})
	} catch (e) {
		res.status(400).send({ error: e.message })
	}
}

exports.editUser = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'avatar']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (!isValid) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findOne({ _id: req.params.id })

    if (!user) {
      return res.status(404).send()
    }
    if (req.file != undefined) {
      user.avatar = req.file.path
    }
    updates.forEach((update) => {
      user[update] = req.body[update]
    })
    await user.save()
    res.send(user)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.editUserRole = async (req, res) => {
  console.log(req.body.role)
  const updates = Object.keys(req.body)
  const allowedUpdates = ['role']
  const isValid = updates.every((update) => allowedUpdates.includes(update))

  if (req.body.role == 'admin' || 
      req.body.role == 'super' || 
      req.body.role == 'editor') {

        if (!isValid) {
          return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
          const user = await User.findOne({ _id: req.params.id })
      
          if (!user) {
            return res.status(404).send()
          }
          updates.forEach((update) => {
            user[update] = req.body[update]
          })
          await user.save()
          res.send(user)
        } catch (e) {
          res.status(400).send({ error: e.message })
        }
  }
  return res.status(400).send({ error: 'Wrong role' }) 
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id })

    if (!user) {
      res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send({error: e.message})
  }
}