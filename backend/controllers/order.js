const db = require('../models')

const getAllPossibleOrder = async (req, res) => {
  const order = await db.order.findAll({})
  res.status(200).send(order)
}

const getOrder = async (req, res) => {
  const order = await db.order.findAll({ where: { user_id: req.user.id } })
  res.status(200).send(order)
}
const addOrder = async (req, res) => {
  const { status, title, price, menu_pic } = req.body
  const newOrder = await db.order.create({
    status, title, price, menu_pic, user_id: req.params.user_id, menu_id: req.params.menu_id,
    quantity: 1
  })
  res.status(201).send(newOrder)
}
const updateOrder = async (req, res) => {
  const { status, title, price, menu_pic, quantity } = req.body
  const targetId = req.params.menu_id
  const foundTarget = await db.order.findOne({ where: { menu_id: targetId, user_id: req.params.user_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.update({ status, title, price, menu_pic, quantity })
    res.status(200).send({ message: 'Successfully updated' })
  }
}
const deleteOrder = async (req, res) => {
  const targetId = req.params.menu_id
  const foundTarget = await db.order.findOne({ where: { menu_id: targetId, user_id: req.params.user_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}

module.exports = { getOrder, addOrder, updateOrder, deleteOrder, getAllPossibleOrder }