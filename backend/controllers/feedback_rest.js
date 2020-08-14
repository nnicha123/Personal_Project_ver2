const db = require('../models')

const getFeedbackRest = async (req, res) => {
  const feedback = await db.feedback_rest.findAll({ where: { restaurant_id: req.params.restaurant_id } })
  res.status(200).send(feedback)
}
const addFeedbackRest = async (req, res) => {
  const { comment, no_of_stars } = req.body
  const newFeedback = await db.feedback_rest.create({ comment, no_of_stars, user_id: req.user.id, restaurant_id: req.params.restaurant_id, reported: false })
  res.status(201).send(newFeedback)
}
const updateFeedbackRest = async (req, res) => {
  const targetId = req.params.restaurant_id
  const { comment, no_of_stars, reported } = req.body
  const foundTarget = await db.feedback_rest.findOne({ where: { restaurant_id: targetId, user_id: req.user.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  } else {
    await foundTarget.update({ comment, no_of_stars, reported })
    res.status(200).send({ message: 'Updated successfully' })
  }
}
const deleteFeedbackRest = async (req, res) => {
  const targetId = req.params.restaurant_id
  const foundTarget = await db.feedback_rest.findOne({ where: { restaurant_id: targetId, user_id: req.params.user_id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Target not found' })
  } else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted' })
  }
}

module.exports = { getFeedbackRest, addFeedbackRest, updateFeedbackRest, deleteFeedbackRest }