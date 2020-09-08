const router = require('express').Router();
const verify = require('./verifytoken');
const Users = require('../models/Users');
const bodyParser = require('body-parser');


router.get('/user/profile', verify , async (req, res) => {
    try{
    const userProfile = Users.findOne({_id: user._id});
    res.send(userProfile);
    }catch(err)
    {
        res.status(401).send(err);
    }

});


module.exports = router;