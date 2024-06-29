const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const path = require('path'); 

const trackerRoutes = require('./routes/trackerRoutes')



const app = express();

app.use(express.urlencoded({ extended: true }));

require('dotenv').config(); 
app.use(express.json()); 
app.use(cors()); 





app.get('/', (req, res) => {
    res.json({"hello": "yes"}); 
})

app.use('/tracker', trackerRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(4000, () => { console.log('Server started on port 5000') })
    })
    .catch(err => console.log(err));


   

 





