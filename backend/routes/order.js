const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/all', authentication, orderController.getAllPossibleOrder)
router.get('/', authentication, orderController.getOrder)
router.post('/:user_id/:menu_id', authentication, orderController.addOrder)
router.put('/:user_id/:menu_id', authentication, orderController.updateOrder)
router.delete('/:user_id/:menu_id', authentication, orderController.deleteOrder)

module.exports = router