const express = require('express')
const router = express.Router()
const purchaseHistoryController = require('../controllers/purchase_history')
const passport = require('passport')

const authentication = passport.authenticate("jwt", { session: false })

router.get('/:userId', authentication, purchaseHistoryController.getPurchaseHistoryUser)
// router.get('/', authentication, purchaseHistoryController.getPurchaseHistory)
router.post('/:userId', authentication, purchaseHistoryController.addPurchaseHistory)
router.put('/:userId/:id', authentication, purchaseHistoryController.updatePurchaseHistory)
router.delete('/:userId/:id', authentication, purchaseHistoryController.deletePurchaseHistory)

module.exports = router