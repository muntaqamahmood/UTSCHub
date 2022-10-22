const express = require('express');
const router = express.Router();

const Event = require("../models/Event");

const auth = require("../middleware/auth");


//=================================
//             Event API
//=================================
//save data to the db
router.post("/uploadEvent", auth, (req, res) => {

    const event = new Event(req.body)

    event.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


// Event page API
router.post("/getEvents", auth, (req, res) => {

    Event.find()
    .exec( (err, events) => {
        if (err) return res.status(400).json({success:false,err})

        res.status(200).json({success:true , events})
    } )

});


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



module.exports = router;
