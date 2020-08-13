const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/', userController.getUser)

router.put('/', authentication, userController.updateUser)

module.exports = router