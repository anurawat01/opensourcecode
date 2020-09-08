const router = require('express').Router();
const User = require('../models/Users');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {signupValidation } = require('../validation');


dotenv.config();

// USER SIGNUP

 router.post('/auth/signup', async (req,res) => {
        //user detail validation
        const {error} = signupValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);


        //checking if user already exist
        const checkEmail = await User.findOne({email: req.body.email});
        if(checkEmail) return res.status(400).send('Email Already Exist');

        //password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        //SENDING DATA INTO DATABASE
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        });
        try {
        const savedUser = await user.save();
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('login-authentication', token).send(token);
        } catch(err) {
            res.status(400).send(err);
        }  



 });
 


 //USER LOGIN
 router.post('/auth/login' , async (req,res) => {
    // CHECKING EMAIL
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is wrong!');

    // CHEKING PASSWORD
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Password is wrong');
    
    // PASSING TOKEN
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('login-authentication', token).send(token);

 });




module.exports = router;