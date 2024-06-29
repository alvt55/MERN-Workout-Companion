const mongoose = require('mongoose'); 

const sessionSchema = new mongoose.Schema(
    {
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
        }


    }
); 

module.exports = mongoose.model('session', sessionSchema); 