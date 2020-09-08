const Joi = require('@hapi/joi');


//singup validation


const signupValidation = (data) => {

    const schema = Joi.object({ 
        username : Joi.string().required(), 
        email: Joi.string().required().min(6), 
        password: Joi.string().min(8).required()
     });


    return schema.validate(data);

};

module.exports.signupValidation = signupValidation;