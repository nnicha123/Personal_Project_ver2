const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/all', authentication, bookController.getAllBookings)
router.get('/', authentication, bookController.getBookings)
router.post('/:user_id/:restaurant_id', authentication, bookController.addBooking)
router.put('/:user_id/:restaurant_id', authentication, bookController.updateBooking)
router.delete('/:user_id/:restaurant_id', authentication, bookController.deleteBooking)

module.exports = router