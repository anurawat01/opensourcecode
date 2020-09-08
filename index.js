const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const update = require('./routes/name-update');
const profile = require('./routes/profile');

// middleware
app.use(bodyParser.json());

//Import Routes
const authRoute = require('./routes/auth');

mongoose.connect("mongodb+srv://Avengers:xFhNToRoacwbu0TH@cluster0.jwsdq.mongodb.net/Avengers?retryWrites=true&w=majority",
{
    useNewUrlParser: true
},

() => {
     console.log('Connected DB');
});


//Routes Middleware
app.use('/v1',authRoute);
app.use('/v1/',profile);
app.use('/v1/', update);


//Middleware 
app.use(express.json()); 


app.listen(8000, () => {
    console.log('Server Running on port 8000')
});