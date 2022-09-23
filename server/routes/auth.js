const express = require('express');
const router = express.Router();

//http://localhost:8000/api/auth

/*
    ROUTE: GET api/auth
    DESC: Get logged in user
    ACCESS: Private (getting user thats logged in so it should be private)
*/
router.get('/', (request, response) => { // note: it is just a slash since we defined the route already in server.js
    response.send('Fetch logged in user');
}); 

/*
    ROUTE: POST api/auth
    DESC: Authenticate and get token (so that we can access private routes)
    ACCESS: Public 
*/
router.post('/', (request, response) => { // note: it is just a slash since we defined the route already in server.js
    response.send('User is logged in');
}); 

module.exports = router;
