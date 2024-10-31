const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


require('dotenv').config() 

const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {
  
  let errors = { email: '', password: '' };


   // login errors
   if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }


  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    console.log('hello')
    
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const handleLoginErrors = (err) => {
  console.log(err)
}

const createToken = (id) => {
    return jwt.sign({ id }, 'testingsecretchangelater', {
      expiresIn: maxAge
    });
  };




const loginPost = async (req, res) => {
    const {email, password} = req.body 

    try {
      const user = await User.login(email, password); 
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
      res.status(200).json({user: user._id}); 
      
    } catch (err) {
      const errors = handleErrors(err)
      res.status(400).json({errors}); 
    }
   
    // res.send('user login')
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