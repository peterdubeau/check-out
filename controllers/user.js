const User = require('../models/user')
const db = require('../db/connection')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const getUsers = async(req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const { email } = req.params
    // const user = await User.findById(id)
    const user = await User.findOne({email:email})
    if (user) {
      return res.json(user)
    } 
    res.status(404).json({message: 'User not found!'})
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message})
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  await User.findByIdAndUpdate(id, req.body, { new: true }, (error, user) => {
    if (error) {
      return res.status(500).json({error: error.message}) 
    } 
    if (!user) {
      return res.status(404).json({ message: "user not found!"})
    }
    res.status(200).json(user)
  })
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await User.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('User Deleted')
    } 
    throw new Error("user not found")
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body
    // const user = await User.findById(id)
    const user = await User.findOne({email:email})
    if (user) {
      return res.json(user)
    } 
    res.status(404).json({message: 'User not found!'})
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail
}