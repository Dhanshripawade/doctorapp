const express = require('express')
const { default: mongoose } = require('mongoose')
const userDoctorRoute = require('./routes/userDoctorRoute')
const userReceptionRoute = require('./routes/userReceptionRoutes')
const hospitalAdminRoute = require('./routes/hospitalAdmin')

require('dotenv').config();
const cors = require('cors')
// const passport = require('passport')
// const session = require('express-session')

// const userModel = require('./model/userDoctor')



const app = express();
app.use(express.json());
app.use(cors());

//db
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', async () => {
    console.log('database is connected');
    // const myDb = mongoose.connection.useDb();
    // let collList = await myDb.db.listCollections().toArray();
    // console.log(collList)
});

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     next();
// })
//db
app.use('/admin', hospitalAdminRoute);
app.use('/reception', userReceptionRoute);
app.use('/doctor', userDoctorRoute);

// app.use('/doctordashboard', doctorDahboardRoute);
// app.use('/receptionentry', receptionRoute);



const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})