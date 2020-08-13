const express = require('express')
const router = express.Router()
const feedbackRestController = require('../controllers/feedback_rest')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/:restaurant_id', authentication, feedbackRestController.getFeedbackRest)
router.post('/:restaurant_id', authentication, feedbackRestController.addFeedbackRest)
router.put('/:restaurant_id', authentication, feedbackRestController.updateFeedbackRest)
router.delete('/:restaurant_id', authentication, feedbackRestController.deleteFeedbackRest)

module.exports = router