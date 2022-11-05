const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const item = require('../models/item');
const User = require('../models/User');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const Item = require('../models/item');

//http://localhost:8000/api/postitems
// Note: uid = user id, iid = item id

/*
    ROUTE: POST api/postitem/uploadItem
    DESC: POST items (UTSC marketplace)
    ACCESS: Private 
*/

// router.post("/uploadItem", auth, [
//     check('title', 'Title is required').not().isEmpty(),
//     check('description', 'Description is required').not().isEmpty(),
//     check('price', 'Price is required').not().isEmpty(),
// ], async (req, res) => {
//     //check for errors in the request
//     const errors = validationResult(req);
//     // Finds the validation errors in this request and wraps them in an object with handy functions and returns a 400 status
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         console.log("waefoijewaiohfaowiehf");
//         console.log(req.body);
//         const items = new item({
//             title: req.body.title,
//             description: req.body.description,
//             price: req.body.price,
//             date_added: req.body.date_added,
//             seller: user
//         });

//         items.save();
//         return res.status(200).json({ success: true })
        
//     } catch (error) {
//         return res.status(400).json({ success: false, err })
//     }
// });


router.post("/uploadItem", auth, (req, res) => {

    const item = new Item(req.body)
    item.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});

router.post("/getItems", auth, (req, res) => {

    Item.find()
    .exec( (err, items) => {
        if (err) return res.status(400).json({success:false,err})

        res.status(200).json({success:true , items})
    } )

});

router.get("/items_by_id", auth, (req, res) => {
    let type = req.query.type
    let itemIds = req.query.id

    if (type === "array") {

    }
    //we need to find the product information that belong to product Id 
    Item.find({ '_id': { $in: itemIds } })
        .populate('writer')
        .exec((err, item) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(item)
        })
});


// @route   GET api/postitems
// @desc    Get all Items
// @access  Private
router.get('/', auth, (req, res) => {
    try {
        //find all items without any filters
        const items = item.find();
        //send the items back to the client
        res.json(items);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        res.status(500).send('Server Error');
    }
});

// @route   GET api/items/array
// @desc    Get an array of items that the user has bookmarked
// @access  Private
router.get('/array', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const itemsBookmarked = user.itemsBookmarked;
        const itemsBookmarkedObjs = await item.find({ '_id': { $in: itemsBookmarked } });
        res.status(200).json({itemsBookmarked: itemsBookmarkedObjs});
    } catch (err) {
        console.log(err);  
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/postitem/:id
// @desc    bookmark an item
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newItemId = new mongoose.mongo.ObjectId(itemId);
        const itemsBookmarked = user.itemsBookmarked;
        let message = "";
        const index = itemsBookmarked.findIndex(item => item.toString() == itemId);
        if(index != -1){
            itemsBookmarked.splice(index, 1);
            message = "Bookmark removed";
        }else{
            itemsBookmarked.push(newItemId);
            message = "Item has been bookmarked";
        }
        await user.save();
        res.status(200).json({message});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//get all items for a specific user by their id
// @route   GET api/postitems/:id
// @desc    get all items for a specific user by their ID
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        //find all items for a specific user by their id
        const items = await item.find({"seller": req.params.id});
        //if there is no item, send a 404 status
        if (!items) {
            return res.status(404).json({ msg: 'Item not found' });
        }
    
        res.json(items);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Item not found' });
        }
        
        res.status(500).send('Server Error');
    }
});

//edit an item by its id 
// @route   PUT api/postitem/:id
// @desc    edit an item by its ID
// @access  Private
router.put('/editItem/:id', auth, async (req, res) => {
    try {
        //find the item by its id
        const itemObj = await item.findById(req.params.id);
        // const users = await user.findById(req.params.id);
        // const user
        //if there is no item, send a 404 status
        if (!itemObj) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        //if the user is not the seller, send a 401 status
        if (itemObj.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // if () {
            
        // }
        //update the item
        itemObj.title = req.body.title;
        itemObj.description = req.body.description;
        itemObj.price = req.body.price;
        itemObj.date_added = req.body.date_added;
        //save the item
        await itemObj.save();
        //send the item back to the client
        res.json(itemObj);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.status(500).send('Server Error');
    }
});



module.exports = router;
