const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("destination>>>", req)
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        console.log("filename>>>", req)
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        console.log("fileFilter>>>", req)
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/eventImage", auth, (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

module.exports = router;