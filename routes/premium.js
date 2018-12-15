/**
 * Created by guy on 9/11/18.
 */
const _ = require('lodash');
const container = require("../services");
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');


router.post('/payment_ticket', async function (req, res, next) {
    try {
        let {name, date} = req.body;

        const cleaner = container.get('cleaner');
        const config = container.get('config');
        const mailer = container.get('mailer');
        const db = container.get('db');

        name = cleaner.clean(name);
        date = cleaner.clean(date);

        const paymentTicket = await db.PaymentTicket.create({
            name,
            date,
            user_id: req.user.id
        });

        const adminMail = config.get('app.email');
        mailer.mail(adminMail, 'Premium Template', 'A new user submitted a ticket regarding premium templates.');

        return res.json({r: 'ok'});
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(723).json({});
    }
});


module.exports = router;
