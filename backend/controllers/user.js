const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
  const user = await db.user.findAll({})
  res.status(200).send(user)
}

const registerUser = async (req, res) => {
  const { username, password, email, first_name, last_name, phone_number, profile_pic, role } = req.body
  const usernameReplicate = await db.user.findOne({ where: { username } })
  if (usernameReplicate) {
    res.status(404).send({ message: 'Username already taken' })
  }
  else {
    const salt = bcrypt.genSaltSync(Number(process.env.ROUNDS))
    const hashPassword = bcrypt.hashSync(password, salt)
    await db.user.create({ username, password: hashPassword, email, first_name, last_name, phone_number, profile_pic, user_grade: 'normal', role })
    res.status(201).send({ message: 'User created' })
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body
  const user = await db.user.findOne({ where: { username } })

  if (!user) {
    res.status(400).send({ message: 'username or password not found' })
  }
  else {
    const isSuccess = bcrypt.compareSync(password, user.password)
    if (!isSuccess) {
      res.status(400).send({ message: 'username or password not found' })
    }
    else {
      const payload = {
        id: user.id,
      }
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 })
      res.status(200).send({ token, message: "User found & logged in", id: user.id, role: user.role })
    }
  }
}
const updateUser = async (req, res) => {
  const { username, password, email, first_name, last_name, phone_number, profile_pic, role } = req.body
  const targetUser = await db.user.findOne({ where: { id: req.user.id } })
  if (!targetUser) {
    res.status(404).send("No user")
  } else {
    await targetUser.update({ username, password, email, first_name, last_name, phone_number, profile_pic, role })
    res.status(204).send({ message: 'Successfully updated' })
  }
}

module.exports = { registerUser, loginUser, getUser, updateUser }