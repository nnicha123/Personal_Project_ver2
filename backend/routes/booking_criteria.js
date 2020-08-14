const express = require('express')
const router = express.Router()
const bookingCriteriaController = require('../controllers/booking_criteria')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

module.exports = router