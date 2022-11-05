const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    writer: {
        //type: Schema.Types.ObjectId,
        type: String
        //ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    //uses the user model to reference the user
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
});

module.exports = Item = mongoose.model('item',ItemSchema);