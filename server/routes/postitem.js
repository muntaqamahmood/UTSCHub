const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const item = require('../models/item');
const User = require('../models/User');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');
const Item = require('../models/item');
const createOrAddActivity = require('../service/notification');

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


router.post("/uploadItem", auth, async (req, res) => {
    req.body.seller = new mongoose.mongo.ObjectId(req.user.id);
    const item = new Item(req.body);
    const seller = await User.findById(req.body.seller);
    const message = `${seller.name} has created a new item`;
    const endpoint = `/market/${item._id}`;
    item.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        //create or add an activity
        createOrAddActivity(seller, message, endpoint);
        return res.status(200).json({ success: true })
    })
});

router.post("/getItems", auth, (req, res) => {

    Item.find({"hidden": false})
    .exec( (err, items) => {
        if (err) return res.status(400).json({success:false,err})

        res.status(200).json({success:true , items})
    } )

});

router.get("/items_by_id", auth, (req, res) => {
    let type = req.query.type
    let itemIds = req.query.id

    if (!itemIds) {
        const err = `itemIds is isn't object or an array. Aborting. itemIds: ${itemIds}`;
        console.warn(err);
        return res.status(400).send(err);
    }

    if (type === "array") {
        if (typeof itemIds === 'string') {
            itemIds = itemIds.split(',');
        }
        const items = [];
        itemIds.forEach(async (id, index) => {
            Item.findById(id)
                .exec((err, item) => {
                    if (err) {
                        console.warn(`Error in items_by_id array mode while finding item with id:\n ${id}`);
                        return;
                    }
                    items.push(item);
                    if (index == itemIds.length) {
                        return res.status(200).send(items);
                    }
                });
        });
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

// @route   GET api/items/getUserItems
// @desc    Get an array of items that the user has bookmarked or has added to cart
// @access  Private
router.get('/getUserItems', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const itemsBookmarked = user.itemsBookmarked;
        const itemsInCart = user.itemsInCart;
        const itemsBookmarkedObjs = await item.find({ '_id': { $in: itemsBookmarked } });
        const itemsInCartObjs = await item.find({ '_id': { $in: itemsInCart } });
        res.status(200).json({itemsBookmarked: itemsBookmarkedObjs, itemsInCart: itemsInCartObjs});
    } catch (err) {
        console.log(err);  
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/postitem/:id
// @desc    Add/remove item from cart
// @access  Private
router.put('/addToCart/:id', auth, async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const item = await Item.findById(itemId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const newItemId = new mongoose.mongo.ObjectId(itemId);
        const itemsInCart = user.itemsInCart;
        let message = "";
        const index = itemsInCart.findIndex(item => item.toString() == itemId);
        if(index != -1){
            itemsInCart.splice(index, 1);
            message = "Item removed from cart";
            item.hidden = false;
        }else{
            itemsInCart.push(newItemId);
            message = "Item has been added to cart";
            item.hidden = true;
        }
        await user.save();
        await item.save();
        res.status(200).json({message});
    } catch (err) {
        console.error(err.message);
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

router.get('/buyItems', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        //if there is no user, send a 404 status
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        const itemsInCartObjs = await item.find({ '_id': { $in: user.itemsInCart } });
        const itemIds = user.itemsInCart.map(item => item._id);
        user.itemsInCart = [];
        user.itemsBought = user.itemsBought.concat(itemIds);
        await user.save();
        itemsInCartObjs.forEach(async obj => {
            const sellerId = obj.seller;
            const seller = await User.findById(sellerId);
            seller.itemsSold.push(obj._id);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'utschub@gmail.com',
                    pass: 'tuib krtk dvhu svqq'
                }
            });

            const message = `<h1>Hello ${seller.name},</h1> <p>A user named ${user.name} has agreed to purchase your item called ${obj.title}, You should coordinate a meetup
            in order to sell your item, the user's email is ${user.email}</p>`;
            
            var mailOptions = {
                from: 'utschub@gmail.com',
                to: seller.email,
                subject: 'A user has purchased one of your items!',
                html: message
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
        
        res.status(200).json({ message: "Items purchased successfully" });
    } catch (err) {
        console.error(err);
        //if there is an error, send a 500 status
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


//delete an item by its id
// @route   DELETE api/postitem/:id
// @desc    delete an item by its ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        //find the item by its id
        const itemObj = await item.findById(req.params.id);
        //if there is no item, send a 404 status
        if (!itemObj) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        //if the user is not the seller, send a 401 status
        if (itemObj.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        //delete the item
        await itemObj.remove();

        //Create or add activity
        const message = `${itemObj.seller.name} has deleted an item`;
        const endpoint = "";
        createOrAddActivity(itemObj.seller, message, endpoint); 
        //send a success message
        res.json({ msg: 'Item removed' });
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
