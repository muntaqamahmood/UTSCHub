const express = require('express');
const router = express.Router();

//http://localhost:8000/api/users

/*
    ROUTE: POST api/users
    DESC: Register a user
    ACCESS: Public
*/
router.post('/', (request, response) => { // note: it is just a slash since we defined the route already in server.js
    response.send('Register a user');
}); 

module.exports = router;
