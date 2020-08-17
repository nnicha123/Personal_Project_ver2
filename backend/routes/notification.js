const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notification')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/:user_id', authentication, notificationController.getUserNotification)
router.post('/:user_id', authentication, notificationController.postNotification)
router.put('/:id/:user_id', authentication, notificationController.updateNotification)
router.delete('/:id/:user_id', authentication, notificationController.deleteNotification)

module.exports = router