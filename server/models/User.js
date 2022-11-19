const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePictureURL: { 
        type: String,
        required: false,
    },
    coverImg: {
        type: String,
        required: false,
    },
    eventsJoined: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
        default: [],
    },
    eventsPosted: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
        default: [],
    },
    itemsBookmarked: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
        default: [],
    },
    followedUsers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: [],
    },
    itemsInCart: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
        default: [],
    },
    itemsBought: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
        default: [],
    },
    itemsSold: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item'}],
        default: [],
    },
});

module.exports = mongoose.model('user', UserSchema);