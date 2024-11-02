
const express = require('express')


const {
  loginPost,
  signupPost,
  logout
} = require('../controllers/authController')

const authRouter = express.Router()

// GET all workouts
authRouter.post('/signup', signupPost)

// POST a new workout
authRouter.post('/login', loginPost)
authRouter.get('/logout', logout)
  

module.exports = authRouter
