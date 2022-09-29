const jsonwebtoken = require('jsonwebtoken');
const constants = require('../config/constants.json');

module.exports = (request, response, next) => {
    const token = request.header('x-auth-token');
    if(!token){
        return response.status(401).json({message: 'No token, authorization denied'});
    }
    try {
        const decoded = jsonwebtoken.verify(token, constants.jsonwebtokenSecret);
        request.user = decoded.user;
        next();
    } catch(error) {
        response.status(401).json({message: 'Invalid token'});
    }
}