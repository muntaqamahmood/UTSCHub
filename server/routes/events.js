const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { events } = require('../models/Event');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
const createOrAddActivity = require('../service/notification');

// @route   POST api/events
// @desc    Create an event for the user that is logged in
// @access  Private
router.post("/uploadEvent", auth, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(!user) res.status(404).json({message: "Cannot get user"});
    const userIdObj = new mongoose.mongo.ObjectId(userId);
    req.body.creator = userIdObj;
    const event = new Event(req.body);
    event.save();
    user.eventsPosted.push(event._id);
    user.save();

    //Create the activity to send the notifications
    const message = `${user.name} has created a new post`;
    const endpoint = `/events/${event._id}`;
    createOrAddActivity(user, message, endpoint);

    res.status(200).json({ success: true, message: "Event uploaded" })
});

// @route   GET api/events
// @desc    Get all events
// @access  Private
router.post("/getEvents", auth, (req, res) => {

    Event.find()
    .exec( (err, events) => {
        if (err) return res.status(400).json({success:false,err})

        res.status(200).json({success:true , events})
    } )

});

// @route   GET api/events/getUserEvents
// @desc    Get an array of events that a user has posted or joined
// @access  Private
router.get('/getUserEvents', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const eventsJoinedIds = user.eventsJoined;
        const eventsPostedIds = user.eventsPosted;
        const eventJoinedObjects = await Event.find({ '_id': { $in: eventsJoinedIds } });
        const eventPostedObjects = await Event.find({ '_id': { $in: eventsPostedIds } });
        res.status(200).json({eventsJoined: eventJoinedObjects, eventPosted : eventPostedObjects});
    } catch (err) {
        console.log(err);  
        res.status(500).send('Server Error');
    }
});

// @route   GET api/events/:id
// @desc    get an event by its id
// @access  Private
router.get("/events_by_id", auth, (req, res) => {
    let type = req.query.type
    let eventIds = req.query.id

    if (type === "array") {

    }


    //we need to find the product information that belong to product Id 
    Event.find({ '_id': { $in: eventIds } })
        .populate('writer')
        .exec((err, event) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(event)
        })
});

// @route   PUT api/events/:id
// @desc    Add user to an event
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newUserId = new mongoose.mongo.ObjectId(userId);
        console.log(newUserId)
        const newEventId = new mongoose.mongo.ObjectId(req.params.id);
        const usersJoined = event.usersJoined;
        console.log(usersJoined);
        if(usersJoined.some((user) => {
            return user.toString() == userId;
        })){
            return res.status(400).json({ message: 'User is already in event' });
        }

        usersJoined.push(newUserId); //add user to an event
        user.eventsJoined.push(newEventId); //add an event to a user
        await event.save();
        await user.save();
        res.status(200).json({message: "User has been added to event"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/follow/:id', auth, async(req, res) => {
    try {
        const path = req.params.id.replace("follow", "");
        const event = await Event.findById(path);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const userId = req.user.id;
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const creator = await User.findById(event.creator);
        if (!Array.isArray(creator.followedUsers)) {
            creator.followedUsers = [];
        }
        const followedUsers = creator.followedUsers;
        followedUsers.push(currentUser);
        await creator.save();
        res.status(200).json({message: "User has been added to the creator"});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Private

router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(userId);
        console.log(event.creator.toString());
        //check if user is the creator of the event
        if(event.creator.toString() !== userId){
            return res.status(401).json({ message: 'User is not authorized to delete this event' });
        }
        await event.remove();
        const message = `${user.name} has deleted an event`;
        const endpoint = "";
        createOrAddActivity(user, message, endpoint);
        res.status(200).json({message: "Event has been deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
