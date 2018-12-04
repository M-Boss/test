const express = require('express');
const router = express.Router();
const container = require('../../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const {templateList} = require('../../client/src/screens/templates/templateList');



router.get('/', async function (req, res, next) {
    try {
        res.redirect('/boss/users');
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

module.exports = router;