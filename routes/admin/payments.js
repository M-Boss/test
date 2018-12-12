const express = require('express');
const router = express.Router();
const container = require('../../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const {templateList} = require('../../client/src/screens/templates/templateList');

router.get('/payment_tickets', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');
    const userList = await users.find(null, [['id', 'DESC']]);


    try {
        const items = await db.PaymentTicket.findAll({include: [
            {
                model: db.User,
                as: 'user'
            }
        ]});
        res.render('admin/payment_tickets', {items: items});
    }
    catch (e) {
        console.log(e);
        res.json(e);
    }
});


module.exports = router;