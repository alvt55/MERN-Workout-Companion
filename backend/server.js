
const workoutRoutes = require('./routes/workouts')
const authRoutes = require('./routes/auth')
const cors = require('cors')

// attaches dotenv variables to process.env obj 
require('dotenv').config() 



const express = require('express')
const mongoose = require('mongoose')
const app = express()


const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
};


app.use(cors(corsOptions));

app.use(express.json());  // converts json to js objects 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)
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


