/**
 * Created by guy on 9/11/18.
 */
const _ = require('lodash');
const container = require("../services");
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const uploads = path.join(__dirname, "../public/uploads");

router.post('/remove-photo', async function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    try {
        const index = parseInt(_.get(req, 'body.index', null));
        if(isNaN(index)){
            return res.status(500).json("oops");
        }

        const photos = _.get(req.user, "website.photos", []);
        if(photos.length <= index){
            return res.json({});
        }

        console.log("Removing file: ", photos[index])
        fs.unlinkSync(path.join(uploads, photos[index]));
        return res.json({})
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(500).send("oops");
    }
});

router.post('/upload', async function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    try {
        const target = _.get(req, 'query.target', null);
        // let targetIndex = 0;
        // if(target === "photos"){
        //     targetIndex = parseInt(_.get(req, 'query.index', ""));
        //     if(isNaN(targetIndex) || targetIndex < 0 || targetIndex > 32){
        //         return res.status(400).json({message: "Invalid target index ", code: 707});
        //     }
        // }

        const random = container.get('random');
        const config = container.get('config');

        const allowedTargets = ["template_main", "template_bottom", "photos"];
        const allowedExtensions = [".jpg", ".jpeg", ".gif", ".png"];

        if(!allowedTargets.includes(target)){
            return res.status(400).json({message: "Invalid target ", code: 702});
        }

        const file = _.get(req, "files.file");
        if (!file) {
            return res.status(400).json({message: "File not uploaded ", code: 701});
        }

        const extension = path.extname(file.name).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            return res.status(400).json({message: "Format not supported: " + extension, code: 700});
        }


        let filename = req.user.id + "_" + target;//String(+new Date()) + random.randomString(8) + extension;
        if(target==="photos") filename += String(+new Date()) + random.randomString(3); //filename+= "-" + targetIndex;
        filename +=  extension;
        file.mv(path.join(uploads, filename), async function (err) {
            if (err)
                return res.status(500).send(err);

            const user = req.user;

            if(target === "photos"){
                if(!user.website.photos){
                    // user.website.photos = [filename];
                }
                else{
                    // user.website.photos.push(filename);
                }
            }
            else{
                // user.website[target] = filename;
            }

            user.update({website: user.website}).catch(e => {
                console.log("Error saving: ", e)
            });

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
        const config = container.get('config');
        const user = req.user;
        // console.log(_.get(req, "body.website"));
        user.website = _.get(req, "body.website");
        let slug = "";
        w = user.website;
        if(w.bride_first && w.groom_first){
            slug = `-${slugify(w.bride_first)}-${slugify(w.groom_first)}`;
        }

        user.website.url = config.get("app.domain") + "w/" +  req.user.id + slug;
        user.save().catch(e => {
            console.log("Error: ", e)
        }).then(r => {
            //console.log("DONE: ", r)
        });
        res.json({website: user.website});
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(500).send("oops");
    }

    function slugify(text)
    {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
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
