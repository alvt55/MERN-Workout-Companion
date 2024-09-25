const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async (req, res) => {

    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)

}




// Post a workout
const createWorkout = async (req, res) => {
    const { date, day, exercises } = req.body // get workout properties from req obj 

    // add workout to db 
    try {
        const workout = await Workout.create({ date, day, exercises})
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}





module.exports = {
    getWorkouts,
    createWorkout,
}