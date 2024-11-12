
const workoutRoutes = require('./routes/workouts')
const authRoutes = require('./routes/auth')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {Server} = require('socket.io')
const { createServer } = require("http");

// attaches dotenv variables to process.env obj 
require('dotenv').config() 


const express = require('express')
const mongoose = require('mongoose')
const app = express()

const server = createServer(app);

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:3000"
  }
});



io.on("connect", (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('sharedSession', (s) => {
        console.log('Received "sharedSession" from client:', s);
        io.emit('sharedSession', s);  // Broadcast to all clients
        console.log('Broadcasted "sharedSession" to all clients');
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});



app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // accepts credentials sent by the client 
}));


app.use(cookieParser())

app.use(express.json());  // converts json to js objects 


app.use('/api/workouts', workoutRoutes)
app.use('/auth', authRoutes)


// web sockets 
// listens for incoming sesisons to share
// emits these sessions 
// frontend displays these 



mongoose.connect(process.env.MONG_URI)
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log('listening to requests on port', process.env.PORT)
    })
})
.catch((error) => {
   console.log(error)
})


module.exports = app 