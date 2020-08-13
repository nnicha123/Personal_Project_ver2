const db = require('../models')

const getPurchaseHistoryUser = async (req, res) => {
  const purchase = await db.purchase_history.findAll({ where: { user_id: req.user.id } })
  res.status(200).send(purchase)
}

const getPurchaseHistory = async (req, res) => {
  const purchase = await db.purchase_history.findAll({})
  res.status(200).send(purchase)
}
const addPurchaseHistory = async (req, res) => {
  const { status, item, price } = req.body
  const userId = req.user.id
  const newPurchase = await db.purchase_history.create({ status, item, price, user_id: userId })
  res.status(201).send(newPurchase)
}
const updatePurchaseHistory = async (req, res) => {
  const targetId = req.params.id
  const { status, item, price } = req.body
  const foundTarget = await db.purchase_history.findOne({ where: { id: targetId, user_id: req.user.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.update({ status, item, price })
    res.status(200).send({ message: 'Successfully updated' })
  }
}

const deletePurchaseHistory = async (req, res) => {
  const targetId = req.params.id
  const foundTarget = await db.purchase_history.findOne({ where: { id: targetId, user_id: req.user.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}

module.exports = { getPurchaseHistory, addPurchaseHistory, updatePurchaseHistory, deletePurchaseHistory, getPurchaseHistoryUser }