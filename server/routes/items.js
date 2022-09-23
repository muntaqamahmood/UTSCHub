const express = require('express');
const router = express.Router();

//http://localhost:8000/api/items
// Note: uid = user id, iid = item id

/*
    ROUTE: GET api/items
    DESC: Get all items (UTSC marketplace)
    ACCESS: Private 
*/
router.get('/', (request, response) => { // note: it is just a slash since we defined the route already in server.js
    response.send('Get all items in UTSC marketplace');
}); 

/*
    ROUTE: GET api/items/:uid
    DESC: Get all items of a user
    ACCESS: Private 
*/
router.get('/:uid', (request, response) => {
    response.send('Get all items of a user');
}); 

/*
    ROUTE: POST api/items
    DESC: Add new item to user
    ACCESS: Private 
*/
router.post('/:uid', (request, response) => { 
    response.send('Add item to user');
}); 

/*
    ROUTE: PUT api/items/:iid
    DESC: Update item with item id (iid)
    ACCESS: Private 
*/
router.put('/:iid', (request, response) => { 
    response.send('Add item');
}); 

/*
    ROUTE: DELETE api/items/:iid
    DESC: Update item
    ACCESS: Private 
*/
router.delete('/:iid', (request, response) => { 
    response.send('delete item');
}); 

module.exports = router;
