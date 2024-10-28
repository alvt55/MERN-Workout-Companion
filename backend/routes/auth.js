
const express = require('express')


const {
  loginPost,
  signupPost 
} = require('../controllers/authController')

const authRouter = express.Router()

// GET all workouts
authRouter.post('/signup', signupPost)

// POST a new workout
authRouter.post('/login', loginPost)
  

module.exports = authRouter
