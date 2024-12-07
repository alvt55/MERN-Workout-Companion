
const workoutRoutes = require('../routes/workouts')
const authRoutes = require('../routes/auth')
const searchRoutes = require('../routes/search');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const User = require('../models/UserModel')
const mongoose = require('mongoose')


// attaches dotenv variables to process.env obj 
require('dotenv').config() 



const express = require('express')
// const mongoose = require('mongoose')
const app = express()


    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true // accepts credentials sent by the client 
    }));
    
    
    app.use(cookieParser())
    
    app.use(express.json());  // converts json to js objects 
    app.use((req, res, next) => {
        console.log(req.path, req.method)
        next()
    })
    
    app.use('/workouts', workoutRoutes)
    app.use('/auth', authRoutes)
    app.use('/search', searchRoutes)
    
    
    
    // vercel testing 
    app.get('/', (req, res) => {
        res.status(200).json({msg: 'express test'})
    });

    app.get('/two', (req, res) => {
      res.status(200).json({msg: 'second express test'})
  });



  
      

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