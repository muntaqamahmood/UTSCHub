const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//const auth = require('../middleware/auth');
const Event = require('../models/Event');
const User = require('../models/User');

// @route   POST api/events
// @desc    Create an event for the user that is logged in
// @access  Private
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], async (req, res) => {
    //check for errors in the request
    const errors = validationResult(req);
    // if there are errors, return a 400 status and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        //create a new event 
        const newEvent = new Event({
            title: req.body.title,
            description: req.body.description
        });
        //save the event to the database
        const event = await newEvent.save();
        //send the event back to the client
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/events
// @desc    Get all events
// @access  Private
router.get('/', async (req, res) => {
    try {
        //find all events without any filters
        const events = await Event.find();
        //send the events back to the client
        res.json(events);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        res.status(500).send('Server Error');
    }
});

//get all events for a specific user by their id
// @route   GET api/events/:id
// @desc    get all events for a specific user by their ID
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        //find all events for a specific user by their id
        const event = await Event.findById(req.params.id);
        //if there is no event, send a 404 status
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
    
        res.json(event);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        //find the event by the id
        const event = await Event.findById(req.params.id);
        //if there is no event, send a 404 status
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        //remove the event
        await event.remove();
        //send a message back to the client
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.status(500).send('Server Error');
    }
});


module.exports = router;
