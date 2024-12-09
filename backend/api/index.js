
const workoutRoutes = require('../routes/workouts')
const authRoutes = require('../routes/auth')
const searchRoutes = require('../routes/search');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const User = require('../models/UserModel')
const SharedSession = require('../models/SharedModel')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const { createServer } = require("http");


// attaches dotenv variables to process.env obj 
require('dotenv').config({})
const express = require('express')
const app = express()
const server = createServer(app);



const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: process.env.CLIENT_URL
    }
});


const activeSockets = {}

io.on("connect", async (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('register', async email => {
        activeSockets[email] = socket;
        console.log(email, 'registered on socket.io');
    
    })


    socket.on('shareActivity', async (receivers, mySession) => {

        receivers.map(async email => {
            const receivingSocket = activeSockets[email];
            
            if (receivingSocket) {
                await saveUndelivered(mySession, email, receivingSocket); 

            } else {
                await saveUndelivered(mySession, email); 
            }
        })
    });

    socket.on("disconnect", () => {
        for (let email in activeSockets) {
            if (activeSockets[email] === socket) {
                delete activeSockets[email];
                console.log(`${email} disconnected`);
                break;
            }
        }
    });
});


async function saveUndelivered(session, email, receivingSocket) {
    
    const {_id , createdAt , updatedAt, __v,  ...sessionEdited} = session;

    console.log('test', sessionEdited); 

    const sessionToBeSaved = {
        ...sessionEdited, 
        recieverEmail: email
    }
    console.log('session edited', sessionToBeSaved); 

    const exists = await SharedSession.findOne({
        date: sessionToBeSaved.date,
        day: sessionToBeSaved.day,
        sessionuser: sessionToBeSaved.sessionuser,
        email: sessionToBeSaved.email,
        recieverEmail: sessionToBeSaved.recieverEmail,
      });
    
      if (exists) {
        console.log('Duplicate document detected. The document already exists.');
        return;
      }

    try {
        const session = await SharedSession.create(sessionToBeSaved); 
        receivingSocket.emit('shareActivity', sessionToBeSaved)

    } catch(err) {
        console.log(err); 
    }
    
}





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
app.get('/api/', (req, res) => {
    res.status(200).json({ msg: 'express test' })
});

app.get('/api/two', (req, res) => {
    res.status(200).json({ msg: 'second express test' })
});






mongoose.connect(process.env.MONG_URI)
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log('listening to requests on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })





module.exports = app;


