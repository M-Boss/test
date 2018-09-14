/**
 * Created by guy on 9/11/18.
 */
const _ = require('lodash');
const container = require("../services");
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/get/:id', async function (req, res, next) {
    try {
        const db = container.get('db');
        const id = _.get(req, "params.id");
        if(!id){
            return res.status(500).json({});
        }
        const user = await db.User.findById(id);
        res.json({website: user.website});
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(404).json({});
    }
});


module.exports = router;
