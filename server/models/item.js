const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
    date_added: {
        type: Date,
        default: Date.now
    },
    //uses the user model to refernce the user
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
});

module.exports = Item = mongoose.model('item',ItemSchema);