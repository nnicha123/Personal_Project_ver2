const express = require('express')
const router = express.Router()
const bankDetailController = require('../controllers/bank_detail')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/:restaurant_id', authentication, bankDetailController.getBankDetails)
router.post('/:restaurant_id', authentication, bankDetailController.addBankDetails)
router.put('/:restaurant_id/:id', authentication, bankDetailController.updateBankDetails)
router.delete('/:restaurant_id/:id', authentication, bankDetailController.deleteBankDetail)

module.exports = router