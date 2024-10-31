const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


require('dotenv').config() 

const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {
    console.log(err.message, err.code)

    let errors = {email: '', password: ''}

    if (err.code === 11000) {
        errors.email = 'email already registered'
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).map(({properties}) => {
           
            console.log(properties)
            errors[properties.path] = properties.message
        })
    }

    return errors; 

}

const createToken = (id) => {
    return jwt.sign({ id }, 'testingsecretchangelater', {
      expiresIn: maxAge
    });
  };

// Get all workouts
const loginPost = async (req, res) => {
    const {email, password} = req.body 

    console.log(email, password) 
    res.send('user login')
}


const signupPost = async (req, res) => {
     
    const { email, password } = req.body;

    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
      res.status(201).json({ user: user._id });
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
    
}



module.exports = {
    loginPost, 
    signupPost
}