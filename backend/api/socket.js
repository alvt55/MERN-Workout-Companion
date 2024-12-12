const SharedSession = require('../models/SharedModel');



// share function
async function saveFriendSession(session, email, receivingSocket) {

    const { _id, createdAt, updatedAt, __v, ...sessionEdited } = session;

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
        if (receivingSocket) {
            receivingSocket.emit('shareActivity', sessionToBeSaved);
        }

    } catch (err) {
        console.log(err);
    }

}

module.exports = {saveFriendSession};