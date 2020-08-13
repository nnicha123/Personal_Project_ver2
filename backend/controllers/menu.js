const db = require('../models')

const getMenuById = async (req, res) => {
  const menuById = await db.menu.findOne({ where: { id: req.params.menu_id } })
  res.status(200).send(menuById)
}

const getAllMenu = async (req, res) => {
  const allMenu = await db.menu.findAll({})
  res.status(200).send(allMenu)
}

const getMenu = async (req, res) => {
  const menu = await db.menu.findAll({ where: { restaurant_id: req.params.restaurant_id } })
  res.status(200).send(menu)
}
const addMenu = async (req, res) => {
  const { title, description, menu_pic, price, average_rating, promotion, category } = req.body
  const newMenu = await db.menu.create({ title, description, menu_pic, price, average_rating, promotion, category, restaurant_id: req.params.restaurant_id })
  res.status(201).send(newMenu)
}
const updateMenu = async (req, res) => {
  const targetId = req.params.id
  const { title, description, menu_pic, price, average_rating, promotion, category } = req.body
  const foundTarget = await db.menu.findOne({ where: { id: targetId, restaurant_id: req.params.restaurant_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.update({ title, description, menu_pic, price, average_rating, promotion, category })
    res.status(200).send({ message: 'Successfully updated target' })
  }
}
const deleteMenu = async (req, res) => {
  const targetId = req.params.id
  const foundTarget = await db.menu.findOne({ where: { id: targetId, restaurant_id: req.params.restaurant_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}

const addMenuFeedback = async (req, res) => {
  const targetMenu = req.params.id
  const { comment, no_of_stars } = req.body
  const createFeedback = await db.feedback_menu.create({ comment, no_of_stars, menu_id: req.params.id, user_id: req.user.id })
  res.status(201).send(createFeedback)
}

module.exports = { getMenu, addMenu, updateMenu, deleteMenu, addMenuFeedback, getAllMenu, getMenuById }