
const workoutRoutes = require('../routes/workouts')
const authRoutes = require('../routes/auth')
const searchRoutes = require('../routes/search');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const User = require('../models/UserModel')
const UndeliveredSession = require('../models/UndeliveredSessions')
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

        // TODO: fetch any sessions that are marked as notDelivered and are intended for this user
        // emit these sessions immediately
        // mark session as delivered 

        activeSockets[email] = socket;
        console.log(email, 'registered on socket.io');
   

        const missed  = await findUndelivered(email);
        
        if (missed.length !== 0) {
            console.log("missed", missed); 
            missed.map(session => {
                socket.emit('shareActivity', session); 
            })
        }

        
    })


    socket.on('shareActivity', async (receivers, mySession) => {

        receivers.map(email => {
            const receivingSocket = activeSockets[email];
            
            if (receivingSocket) {
                receivingSocket.emit('shareActivity', mySession)
            } else {
                // TODO: emit a message if saving to db failsm, await??
                saveUndelivered(mySession, email); 
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


async function saveUndelivered(session, email) {
    
    const {_id , createdAt , updatedAt, __v,  ...sessionEdited} = session;

    const sessionToBeSaved = {
        ...sessionEdited, 
        recieverEmail: email
    }
    console.log('session edited', sessionToBeSaved); 

    try {
        const session = await UndeliveredSession.create(sessionToBeSaved); 
    } catch(err) {
        console.log(err); 
    }
    
}

async function findUndelivered(email) {

    try {
        const missed = await UndeliveredSession.find({recieverEmail: email});
        return missed; 
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


