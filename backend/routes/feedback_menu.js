const express = require('express')
const router = express.Router()
const feedbackMenuController = require('../controllers/feedback_menu')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/:menu_id', authentication, feedbackMenuController.getFeedbackMenu)
// router.get('/', authentication, feedbackMenuController.getFeedbackMenu)
router.post('/:menu_id', authentication, feedbackMenuController.addFeedbackMenu)
router.put('/:menu_id', authentication, feedbackMenuController.updateFeedbackMenu)
router.delete('/:menu_id', authentication, feedbackMenuController.deleteFeedbackMenu)

module.exports = router