const Users = require('../models/Users');

const router = require('express').Router();



router.patch('/user/update', async (req, res) => {

    try{    
    const updateProfile = await Users.updateOne({_id: user._id},{$set: {username: req.body.username}});
    res.save(updateProfile);
    }
    catch(err)
    {
        res.status(401).send(err);
    }


});


module.exports = router;
