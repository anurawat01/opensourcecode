const jwt = require('jsonwebtoken');



module.exports = function(res,req,next){
    const token = req.header('login-authentication');

    if(!token) return res.status(401).send("Access Denied");
    
    try {
        const verified= jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}