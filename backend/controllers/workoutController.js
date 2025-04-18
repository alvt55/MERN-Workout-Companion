const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

require('dotenv').config()

// Get all workouts
const getWorkouts = async (req, res) => {

    const token = req.cookies.jwt
    const decoded = jwt.verify(token, process.env.JWTSECRET)

    try {
        const workouts = await Workout.find({ sessionuser: decoded.id }).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}


// Get a  workouts
const getAWorkout = async (req, res) => {

    const { id } = req.params

    try {
        const workouts = await Workout.findById(id);
        res.status(200).json(workouts)
        console.log(workouts);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }

}


// Post a workout

const createWorkout = async (req, res) => {

    const token = req.cookies.jwt
    const decoded = jwt.verify(token, process.env.JWTSECRET)

    const { date, day, exercises } = req.body // get workout properties from req obj 

    // add workout to db 
    try {
        const workout = await Workout.create({ date, day, exercises, sessionuser: decoded.id })
        res.status(201).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


const updateWorkout = async (req, res) => {

    const token = req.cookies.jwt
    const decoded = jwt.verify(token, process.env.JWTSECRET)
    console.log('updating...')
    const { id, date, day, exercises } = req.body // get workout properties from req obj 
    console.log(req.body);
    // add workout to db 
    try {

        const workout = await Workout.findOneAndUpdate(
            { _id: id, sessionuser: decoded.id }, // Ensure the workout belongs to the authenticated user
            { date, day, exercises }, // Updated fields
            { new: true } // Return the updated document
        );
        res.status(201).json(workout)

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }
}


// delete a workout 
const deleteWorkout = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such workout" })
    }

    try {
        const result = await Workout.findByIdAndDelete(id);
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}




module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout,
    getAWorkout
}