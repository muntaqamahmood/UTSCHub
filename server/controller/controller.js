const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User');

//http://localhost:8000/api/delete

/*
    ROUTE: DELETE api/delete
    DESC: Delete a user
    ACCESS: Private
*/
//controller to delete a user from the "database"
exports.deleteUser = async (request, response) => {
    try {
        await User.findByIdAndDelete(request.user._id);
        response.json({message: "User deleted"});
    } catch(error) {
        console.log(error.message);
        response.json({message: error.message});
    }
}