const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session')
const passport = require('passport');
const mongoose = require('mongoose');
const passportSetup = require('./passport.js')
const googleAuthRoute = require('./routes/googleAuth')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const app = express();

require('dotenv').config()
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['devlog'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET,POST,PUT,DELETE',
    credentials: true,
}))

//routes
app.use('/auth', googleAuthRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

 


app.listen('3001', ()=>{
    console.log('Server is running on port 3001 ;)')
})



const url = "mongodb+srv://rjhay005:12345@cluster0.z0zc5mv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true })
        .then(()=>{
            console.log("Database is connected =)")
        })
        .catch((error) => {
            console.log(error);
        })