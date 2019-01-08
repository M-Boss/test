const express = require('express');
const router = express.Router();
const container = require('../../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const moment = require('moment');
const {templateList} = require('../../client/src/screens/templates/templateList');

router.get('/stats', async function (req, res, next) {
    const db = container.get('db');
    const reports = container.get('reports');

    try {
        const items = await reports.find();
        res.render('admin/stats', {items, moment});
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

router.get('/stats/download', async function (req, res, next) {
    const db = container.get('db');
    const reports = container.get('reports');

    try {
        const items = await reports.find();
        res.render('admin/stats', {items, moment});
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

module.exports = router;