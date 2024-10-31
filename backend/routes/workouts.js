
const express = require('express')
const {
  getWorkouts, 
  createWorkout, 
  deleteWorkout
} = require('../controllers/workoutController')
const {requireAuth} = require('../middleware/authMiddleware')

const router = express.Router()

// GET all workouts
router.get('/', requireAuth, getWorkouts)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout 
router.delete('/:id', deleteWorkout); 

  

module.exports = router
