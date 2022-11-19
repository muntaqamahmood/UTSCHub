const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const InAppNotification = require("../models/InAppNotification");
const User = require("../models/User");

// @route GET api/notification
// @desc Get all activities for a certain user
// @access Private
router.get("/", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const notification = await InAppNotification.findOne({ 'user': { $in: user._id } });
        res.status(200).json(notification);

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// @route PUT api/notification
// @desc Reset the messages inside the notification of a certain user.
// @access Private

router.put("/", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const notification = await InAppNotification.findOne({ 'user': { $in: user._id } });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        notification.messages.splice(0);
        notification.endpoints.splice(0);
        notification.save();
        res.status(200).json(notification);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
})

module.exports = router;