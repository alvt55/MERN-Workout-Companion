const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')

require('dotenv').config()

// Get all workouts
const getWorkouts = async (req, res) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWTSECRET)
    console.log(decoded)

    console.log(decoded); 

    try {
        const workouts = await Workout.find({sessionuser: decoded.id}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
    
}


// Post a workout
const createWorkout = async (req, res) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWTSECRET)
    let email; 

    const { date, day, exercises } = req.body // get workout properties from req obj 

    try {
         const user = await User.findById(decoded.id); 
         email = user.email; 
    } catch (err) {
        console.log(err); 
    }

    // add workout to db 
    try {
        const workout = await Workout.create({ date, day, exercises, sessionuser : decoded.id, email});
        res.status(201).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete a workout 
const deleteWorkout = async (req, res) => {

    const { id, userid} = req.params
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWTSECRET)


    if (userid !== decoded.id) {
        return res.status(400).json({error: "unauthorized user tried to delete"});
    }
  

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
    deleteWorkout
}