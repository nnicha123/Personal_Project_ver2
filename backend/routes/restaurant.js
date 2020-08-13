const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurant')
const passport = require('passport')
const authentication = passport.authenticate("jwt", { session: false })

router.get('/', authentication, restaurantController.getAllRestaurantForCustomer)
router.get('/:userId', authentication, restaurantController.getRestaurant)
router.get('/:userId/:restaurantId', authentication, restaurantController.getRestaurantById)
router.post('/', restaurantController.addRestaurant)
router.put('/:id', authentication, restaurantController.updateRestaurant)
router.delete('/:id', authentication, restaurantController.deleteRestaurant)

module.exports = router