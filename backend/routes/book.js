const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

module.exports = router