const express = require('express')
const router = express.Router()
const orderedHistoryController = require('../controllers/orderedhistory_res')
const passport = require('passport')

const authentication = passport.authenticate("jwt", { session: false })

router.get('/:userId', authentication, orderedHistoryController.getHistory)
router.post('/:userId', authentication, orderedHistoryController.addHistory)
router.delete('/:userId/:id', authentication, orderedHistoryController.deleteHistory)

module.exports = router