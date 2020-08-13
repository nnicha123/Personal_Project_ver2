const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/', authentication, menuController.getAllMenu)
router.get('/:restaurant_id/:menu_id', authentication, menuController.getMenuById)
router.get('/:restaurant_id', authentication, menuController.getMenu)
router.post('/:restaurant_id', authentication, menuController.addMenu)
router.put('/:restaurant_id/:id', authentication, menuController.updateMenu)
router.delete('/:restaurant_id/:id', authentication, menuController.deleteMenu)
router.post('/addfeedback/:id', authentication, menuController.addMenuFeedback)

module.exports = router