/**
 * Created by guy on 9/11/18.
 */
const _ = require('lodash');
const container = require("../services");
const express = require('express');
const path = require('path');
const router = express.Router();

router.post('/upload', function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    try {
        const target = _.get(req, 'query.target', null);
        const random = container.get('random');
        const config = container.get('config');

        // console.log("File: ", req.files);
        const file = _.get(req, "files.file");
        if (!file) {
            return res.status(400).json({message: "File not uploaded ", code: 701});
        }

        const allowedExtensions = [".jpg", ".jpeg", ".gif", ".png"];

        const extension = path.extname(file.name).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            return res.status(400).json({message: "Format not supported: " + extension, code: 700});
        }

        const uploads = path.join(__dirname, "../public/uploads");
        const filename = String(+new Date()) + random.randomString(8) + extension;
        file.mv(path.join(uploads, filename), function (err) {
            if (err)
                return res.status(500).send(err);

            res.json({
                url: config.get("app.uploads") + filename,
                filename: filename
            });
        });
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(500).send("oops");
    }
});

router.post('/save', async function (req, res, next) {
    try {
        const db = container.get('db');
        const user = await db.User.findById(1);

        user.website = JSON.parse(_.get(req, "body.website"));
        user.save().catch(e => {
            console.log("Error: ", e)
        }).then(r => {
            console.log("DONE: ", r)
        });
        res.json({});
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(500).send("oops");
    }
});

router.get('/get', async function (req, res, next) {
    try {
        const db = container.get('db');
        const user = await db.User.findById(1);
        res.json({user});
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(500).send("oops");
    }
});


module.exports = router;
