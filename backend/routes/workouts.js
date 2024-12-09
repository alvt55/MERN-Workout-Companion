
const express = require('express');
const {
  getWorkouts, 
  createWorkout, 
  deleteWorkout,
  getFriendWorkouts
} = require('../controllers/workoutController');
const {requireAuth} = require('../middleware/authMiddleware');

const router = express.Router()

// GET all workouts
router.get('/getWorkouts', requireAuth, getWorkouts)

// POST a new workout
router.post('/createWorkout', requireAuth, createWorkout)

// DELETE a workout 
router.delete('/:id/:userid', requireAuth, deleteWorkout); 

router.get('/getFriendWorkouts', requireAuth, getFriendWorkouts)




module.exports = router
