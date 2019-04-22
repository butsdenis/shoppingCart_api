const express = require('express')
const multer = require('multer')
const auth = require('../middleware/auth')
const UserControllers = require('../controllers/user')
const router = new express.Router()

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})

router.get('/users', auth, UserControllers.getAllUsers)
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
})
router.post('/users', upload.single('avatar'), UserControllers.createUser)
router.post('/users/login', UserControllers.loginUser)
router.patch('/users/:id', upload.single('avatar'), auth, UserControllers.editUser)
router.delete('/users/:id', auth, UserControllers.deleteUser)



module.exports = router