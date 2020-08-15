const db = require('../models')

const getAllRestaurantForCustomer = async (req, res) => {
  const restaurants = await db.restaurant.findAll({})
  res.status(200).send(restaurants)
}

const getRestaurantById = async (req, res) => {
  // Don't care who user is => because in this case user is customer (just need url to be different)
  const restaurants = await db.restaurant.findOne({ where: { id: req.params.restaurantId } })
  res.status(200).send(restaurants)
}

const getRestaurant = async (req, res) => {
  const restaurant = await db.restaurant.findAll({ where: { user_id: req.params.userId } })
  res.status(200).send(restaurant)
}
const addRestaurant = async (req, res) => {
  const { name, description, email, address, phone_number, profile_pic, cover_pic, back_theme, average_rating, user_id } = req.body
  const newRestaurant = await db.restaurant.create({ name, description, email, address, phone_number, profile_pic, cover_pic, back_theme, average_rating, user_id })
  res.status(201).send(newRestaurant)
}
const updateRestaurant = async (req, res) => {
  const { name, description, email, address, phone_number, profile_pic, cover_pic, back_theme, average_rating } = req.body
  const targetId = req.params.id
  const foundTarget = await db.restaurant.findOne({ where: { id: targetId } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.update({ name, description, email, address, phone_number, profile_pic, cover_pic, back_theme, average_rating })
    res.status(200).send({ message: 'Successfully updated' })
  }
}
const deleteRestaurant = async (req, res) => {
  const targetId = req.params.id
  const foundTarget = await db.restaurant.findOne({ where: { id: targetId, user_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}
// const createBank = async(req,res) => {
//   const {bank_name,account_number} = req.body
//   const newBank = await db.bank_detail.create({bank_name,account_number})
// }


module.exports = { getRestaurant, addRestaurant, updateRestaurant, deleteRestaurant, getAllRestaurantForCustomer, getRestaurantById }