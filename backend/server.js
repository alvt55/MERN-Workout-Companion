
const workoutRoutes = require('./routes/workouts')
const authRoutes = require('./routes/auth')
const cors = require('cors')
const cookieParser = require('cookie-parser')


// attaches dotenv variables to process.env obj 
require('dotenv').config() 



const express = require('express')
const mongoose = require('mongoose')
const app = express()




app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // accepts credentials sent by the client 
}));


app.use(cookieParser())

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


