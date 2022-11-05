const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const User = require('../models/User');

//http://localhost:8000/api/comments
// Note: uid = user id, iid = item id

/*
    ROUTE: POST api/comments
    DESC: POST Comments (UTSC marketplace)
    ACCESS: Private 
*/
router.post("/", auth, [
    check('body', 'Body of Comment is required').not().isEmpty(),
], async (req, res) => {
    //check for errors in the request
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions and returns a 400 status
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');
        const newComment = new Comment({
            body: req.body.body,
            username: req.body.username,
            userId: user,
            parentId: req.body.parentId,
            itemId: req.body.itemId,
        });
        newComment.createdAt = Date.now();
        const comment = await newComment.save();
        res.json(comment);
        
    } catch (error) {
        return res.status(400).json({ success: false, err })
    }
});


//get all comments for a specific item by their item id
// @route   GET api/postitems/:id
// @desc    get all items for a specific item by their item ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
      //find all items for a specific item by their id
      const comment = await Comment.find({"itemId": req.params.id});
      //if there is no item, send a 404 status
      if (!comment) {
          return res.status(404).json({ msg: 'No comment found for this post' });
      }
  
      res.json(comment);
  } catch (err) {
      console.error(err.message);
      //if there is an error, send a 500 status
      if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Comment not found' });
      }
      
      res.status(500).send('Server Error');
  }
});

module.exports = router;