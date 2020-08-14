const db = require('../models')

const getHistory = async (req, res) => {
  const purchase = await db.orderedhistory_rest.findAll({ where: { user_id: req.params.userId } })
  res.status(200).send(purchase)
}

const addHistory = async (req, res) => {
  const { status, title, price, menu_pic, quantity } = req.body
  const newPurchase = await db.orderedhistory_rest.create({ status, title, price, menu_pic, quantity, user_id: req.params.userId })
  res.status(201).send(newPurchase)
}

const deleteHistory = async (req, res) => {
  const foundTarget = await db.orderedhistory_rest.findOne({ where: { user_id: req.params.userId, id: req.params.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}
module.exports = { getHistory, addHistory, deleteHistory }