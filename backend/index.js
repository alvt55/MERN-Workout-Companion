const app = require('./server')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONG_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening to requests on port', process.env.PORT)
    })
})
.catch((error) => {
   console.log(error)
})