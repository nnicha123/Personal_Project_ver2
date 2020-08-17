const db = require('../models')

const getUserNotification = async (req, res) => {
  const userNotification = await db.notification.findOne({ where: { user_id: req.params.user_id } })
  res.status(200).send(userNotification)
}
const postNotification = async (req, res) => {
  const { menu_request, booking_request, your_order, your_booking } = req.body
  const newNotification = await db.notification.create({ menu_request, booking_request, your_order, your_booking, user_id: req.params.user_id })
  res.status(201).send(newNotification)
}
const updateNotification = async (req, res) => {
  const { menu_request, booking_request, your_order, your_booking } = req.body
  const targetNotification = await db.notification.findOne({ where: { id: req.params.id, user_id: req.params.user_id } })
  if (!targetNotification) {
    res.status(400).send({ message: 'Target user not found' })
  } else {
    await targetNotification.update({ menu_request, booking_request, your_order, your_booking })
    res.status(200).send({ message: 'Successfully updated' })
  }
}
const deleteNotification = async (req, res) => {
  const targetNotification = await db.notification.findOne({ where: { id: req.params.id, user_id: req.params.user_id } })
  if (!targetNotification) {
    res.status(400).send({ message: 'Target user not found' })
  } else {
    await targetNotification.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}

module.exports = { getUserNotification, postNotification, updateNotification, deleteNotification }