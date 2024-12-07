const mongoose = require('mongoose')

const Schema = mongoose.Schema 


const undeliveredSchema = new Schema({
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
    sessionuser: {
        type: String, 
        required: true 
    }, 
    email: {
        type: String, 
        required: false 
    },
    recieverEmail: {
        type: String, 
        required: true
    }
}, {timestamps: true})


// creates a collection of "sessions"
module.exports = mongoose.model('undeliveredSession', undeliveredSchema); 








