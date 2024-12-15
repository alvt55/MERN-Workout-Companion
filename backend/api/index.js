
const workoutRoutes = require('../routes/workouts')
const authRoutes = require('../routes/auth')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const User = require('../models/UserModel')
const mongoose = require('mongoose')


// attaches dotenv variables to process.env obj 
require('dotenv').config() 



const express = require('express')
const app = express()


    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true 
    }));
    
    
    app.use(cookieParser())
    
    app.use(express.json());  
    app.use((req, res, next) => {
        console.log(req.path, req.method)
        next()
    })
    
    app.use('/workouts', workoutRoutes)
    app.use('/auth', authRoutes)



    mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening to requests on port', process.env.PORT)
        })
    })
    .catch((error) => {
       console.log(error)
    })


    


module.exports = app; 