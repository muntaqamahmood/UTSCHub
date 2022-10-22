const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Item = require('../models/item');
const User = require('../models/User');

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
router.post('/', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    // check('date_added', 'Dated Added is required').not().isEmpty()
]], async (req, res) => {
    //check for errors in the request
     const errors = validationResult(req);
     // Finds the validation errors in this request and wraps them in an object with handy functions and returns a 400 status
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     try {
        //create a new item 
        const newItem = new Item({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            seller: req.user.id
        });
        newItem.date_added = Date.now();
        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
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
