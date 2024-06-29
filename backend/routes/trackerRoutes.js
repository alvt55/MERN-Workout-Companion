const express = require('express'); 

const router = express.Router(); 
const Session = require('../models/sessionSchema'); 


router.post('/', async (req, res) => {


    try {

        const temp = await Session.create({
            date: "date", 
            day: "day", 
            exercises: ["aowejf", "awehf"]
        }); 
    
        res.status(200).send(temp); 
    } catch (err) {
        res.status(400).json({error: err.message});
    }

    
});


module.exports = router; 