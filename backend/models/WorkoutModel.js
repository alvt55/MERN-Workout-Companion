const mongoose = require('mongoose')

const Schema = mongoose.Schema 


const workoutSchema = new Schema({
    date: {
        type: String, 
        required: true
    }, 
    day: {
        type: String, 
        required: true
    }, 
    exercises: {
        type: Array, 
        required: true
    }, 
}, {timestamps: true})


// creates a collection of "sessions"
module.exports = mongoose.model('session', workoutSchema)



