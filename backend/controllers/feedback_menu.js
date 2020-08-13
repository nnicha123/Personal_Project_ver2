const db = require('../models')

const getMenu = async (req, res) => {
  const targetMenu = await db.menu.findOne({ where: { id: req.params.menu_id } })
  res.status(200).send(targetMenu)

}

const getFeedbackMenu = async (req, res) => {
  const feedback = await db.feedback_menu.findAll({ where: { menu_id: req.params.menu_id } })
  res.status(200).send(feedback)
}
const addFeedbackMenu = async (req, res) => {
  const { comment, no_of_stars } = req.body
  const newFeedback = await db.feedback_menu.create({ comment, no_of_stars, user_id: req.user.id, menu_id: req.params.menu_id })
  res.status(201).send(newFeedback)
}
const updateFeedbackMenu = async (req, res) => {
  const { comment, no_of_stars } = req.body
  const targetId = req.params.menu_id
  const foundTarget = await db.feedback_menu.findOne({ where: { menu_id: targetId, user_id: req.user.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Unsuccessful update, target not found' })
  }
  else {
    await foundTarget.update({ comment, no_of_stars })
    res.status(200).send({ message: 'Successfully updated feedback' })
  }
}
const deleteFeedbackMenu = async (req, res) => {
  const targetId = req.params.menu_id
  const foundTarget = await db.feedback_menu.findOne({ where: { menu_id: targetId, user_id: req.user.id } })
  if (!foundTarget) {
    res.status(404).send({ message: 'Delete unsuccessful, target not found' })
  }
  else {
    await foundTarget.destroy()
    res.status(200).send({ message: 'Successfully deleted feedback' })
  }
}

module.exports = { getFeedbackMenu, addFeedbackMenu, updateFeedbackMenu, deleteFeedbackMenu, getMenu }