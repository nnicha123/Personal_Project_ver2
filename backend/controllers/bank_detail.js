const db = require('../models')

const getBankDetails = async (req, res) => {
  const detail = await db.bank_detail.findAll({ where: { restaurant_id: req.params.restaurant_id } })
  res.status(200).send(detail)
}
const addBankDetails = async (req, res) => {
  const { bank_name, account_number } = req.body
  const newBank = await db.bank_detail.create({ bank_name, account_number, restaurant_id: req.params.restaurant_id })
  res.status(201).send(newBank)
}
const updateBankDetails = async (req, res) => {
  const targetId = req.params.id
  const { bank_name, account_number } = req.body
  const targetBank = await db.bank_detail.findOne({ where: { id: targetId, restaurant_id: req.params.restaurant_id } })
  if (targetBank) {
    await targetBank.update({ bank_name, account_number })
    res.status(200).send({ message: 'Bank details updated' })
  }
  else {
    res.status(404).send({ message: 'Update unsuccessful' })
  }
}
const deleteBankDetail = async (req, res) => {
  const targetId = req.params.id
  const targetFound = await db.bank_detail.findOne({ where: { id: targetId, restaurant_id: req.params.restaurant_id } })
  if (targetFound) {
    await targetFound.destroy()
    res.status(200).send({ message: 'Target deleted' })
  }
}

module.exports = { getBankDetails, addBankDetails, updateBankDetails, deleteBankDetail }