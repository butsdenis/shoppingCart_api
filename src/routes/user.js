const express = require('express')
const multer = require('multer')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authSuper = require('../middleware/authSuper')
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

router.get('/users', authSuper, UserControllers.getAllUsers)
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
})
router.post('/users', upload.single('avatar'), UserControllers.createUser)
router.post('/users/login', UserControllers.loginUser)
router.patch('/users/:id', upload.single('avatar'), auth, UserControllers.editUser)
router.patch('/users/role/:id', authSuper, UserControllers.editUserRole)
router.delete('/users/:id', authSuper, UserControllers.deleteUser)



module.exports = router