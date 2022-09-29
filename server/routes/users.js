const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require('bcryptjs');


//http://localhost:8000/api/users

/*
    ROUTE: POST api/users
    DESC: Register a user
    ACCESS: Public
*/
router.post('/', [
    check('name', 'Please enter your name').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('email', 'Please use a UofT email').custom(value => {
        return value.includes("@mail.utoronto.ca");
    }),
    check('password', 'Please enter a password with 5 or more characters').isLength({min: 5})
], async (request, response) => { 
    const errors = validationResult(request);
    if(!errors.isEmpty()) return response.status(400).json({errors: errors.array()});
    const {name, email, password} = request.body;
    try{
        let user = await User.findOne({email: email});
        if(user) return response.status(400).json({message: 'Email is already registered'});
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt() //encrypt the password
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        response.send("User is registered");
    }catch(error){
        console.log(error.message);
        response.send(500); //server error
    }
}); 

module.exports = router;
