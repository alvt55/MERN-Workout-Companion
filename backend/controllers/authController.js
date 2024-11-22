const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


require('dotenv').config()

const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {

  let errors = { email: '', password: '' };


  // login errors
  if (err.message === 'unregistered email') {
    errors.email = 'That email is not registered';
  }
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }


  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
  }

  // validation errors
  if (err.message.includes('user validation failed')) {

    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    
  }

  return errors;
}


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: maxAge
  });
};




const loginPost = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,  sameSite: 'None', secure: true});
    res.status(200).json({ user: user._id });

  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors });
  }

}


const signupPost = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000,  sameSite: 'None', secure: true});
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(409).json({ errors });
  }

}


const logout = async (req, res) => {

  try {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: 'logout successful' })
  } catch (err) {
    res.status(400).json({ err });
  }

}



module.exports = {
  loginPost,
  signupPost,
  logout
}