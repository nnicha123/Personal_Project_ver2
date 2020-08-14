const db = require('../models')

const getPurchaseHistoryUser = async (req, res) => {
  const purchase = await db.purchase_history.findAll({ where: { user_id: req.params.userId } })
  res.status(200).send(purchase)
}

const getPurchaseHistory = async (req, res) => {
  const purchase = await db.purchase_history.findAll({})
  res.status(200).send(purchase)
}
const addPurchaseHistory = async (req, res) => {
  const { status, title, price, menu_pic, quantity } = req.body
  const newPurchase = await db.purchase_history.create({ status, title, price, menu_pic, quantity, user_id: req.params.userId })
  res.status(201).send(newPurchase)
}
const updatePurchaseHistory = async (req, res) => {
  const targetId = req.params.userId
  const { status, title, price, menu_pic, quantity } = req.body
  const foundTarget = await db.purchase_history.findOne({ where: { user_id: targetId, id: req.params.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.update({ status, title, price, menu_pic, quantity })
    res.status(200).send({ message: 'Successfully updated' })
  }
}

const deletePurchaseHistory = async (req, res) => {
  const targetId = req.params.userId
  const foundTarget = await db.purchase_history.findOne({ where: { user_id: targetId, id: req.params.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}

module.exports = { getPurchaseHistory, addPurchaseHistory, updatePurchaseHistory, deletePurchaseHistory, getPurchaseHistoryUser }