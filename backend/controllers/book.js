const db = require('../models')

const getAllBookings = async (req, res) => {
  const bookings = await db.book.findAll({})
  res.status(200).send(bookings)
}
const getBookings = async (req, res) => {
  const bookings = await db.book.findAll({ where: { user_id: req.user.id } })
  res.status(200).send(bookings)
}
const addBooking = async (req, res) => {
  const { date, time, restaurantName, paidTotal } = req.body
  const newBooking = await db.book.create({ date, time, status: 'pending', restaurantName, paidTotal, user_id: req.params.user_id, restaurant_id: req.params.restaurant_id })
  res.status(201).send(newBooking)
}
const updateBooking = async (req, res) => {
  const { date, time, status, paidTotal } = req.body
  const foundTarget = await db.book.findOne({ where: { restaurant_id: req.params.restaurant_id, user_id: req.params.user_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.update({ date, time, status, paidTotal })
    res.status(200).send({ message: 'Successfully updated' })
  }
}

const deleteBooking = async (req, res) => {
  const foundTarget = await db.book.findOne({ where: { user_id: req.params.user_id, restaurant_id: req.params.restaurant_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}

module.exports = { getAllBookings, getBookings, addBooking, updateBooking, deleteBooking }