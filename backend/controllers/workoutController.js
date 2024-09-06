const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async (req, res) => {

    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)

}

// Get a workout
const getWorkout = async (req, res) => {


    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' })
    }

    const workout = await Workout.findById(id)


    if (!workout) {
        return res.status(400).json({ error: 'no such workout' });
    }

    res.status(200).json(workout)
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

// delete a workout
const deleteWorkout = async (req, res) => {
    
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' })
    }

    const workout = await Workout.findByIdAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({ error: 'no such workout' });
    }

    res.status(200).json(workout)


}

// update a workout
const updateWorkout = async (req, res) => {

    const { id } = req.params
   

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' })
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: 'no such workout' });
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}