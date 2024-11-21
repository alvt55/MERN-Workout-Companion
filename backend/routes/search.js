
const express = require('express')


const {
  getExercises
} = require('../controllers/searchController')

const searchRouter = express.Router()

// GET all workouts
searchRouter.get('/getExercises/', getExercises);

  

module.exports = searchRouter; 