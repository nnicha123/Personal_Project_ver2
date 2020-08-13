const express = require('express')
const router = express.Router()
const purchaseHistoryController = require('../controllers/purchase_history')
const passport = require('passport')

const authentication = passport.authenticate("jwt", { session: false })

router.get('/', authentication, purchaseHistoryController.getPurchaseHistoryUser)
// router.get('/', authentication, purchaseHistoryController.getPurchaseHistory)
router.post('/', authentication, purchaseHistoryController.addPurchaseHistory)
router.put('/:id', authentication, purchaseHistoryController.updatePurchaseHistory)
router.delete('/:id', authentication, purchaseHistoryController.deletePurchaseHistory)

module.exports = router