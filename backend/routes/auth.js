
const express = require('express')


const {
  loginPost,
  signupPost,
  logout,
  findEmail
} = require('../controllers/authController')

const authRouter = express.Router()

authRouter.post('/signup', signupPost)


authRouter.post('/login', loginPost)
authRouter.get('/logout', logout)
authRouter.get('/findEmail', findEmail)
  

module.exports = authRouter
