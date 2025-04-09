
const express = require('express')
const {
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getAWorkout
} = require('../controllers/workoutController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

// GET all workouts
router.get('/getWorkouts', requireAuth, getWorkouts)

// GET all workouts
router.get('/getAWorkout/:id', getAWorkout)

// POST a new workout
router.post('/createWorkout', requireAuth, createWorkout)

router.post('/updateWorkout', requireAuth, updateWorkout)

// DELETE a workout 
router.delete('/:id', requireAuth, deleteWorkout);



module.exports = router
