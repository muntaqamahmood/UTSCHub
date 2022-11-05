const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = mongoose.Schema({

    writer: {
        //type: Schema.Types.ObjectId,
        type: String
        //ref: 'User'
    },

    title: {
        type: String,
        maxlength: 50
    },

    description: {
        type: String
    },

    images: {
        type: Array,
        default: []
    },

    usersJoined: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: [],
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
}, { timestamps: true })


EventSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})
module.exports = mongoose.model('Event', EventSchema);
