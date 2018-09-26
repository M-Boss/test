/**
 * Created by guy on 9/11/18.
 */
const _ = require('lodash');
const container = require("../services");
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.post('/contact', async function (req, res, next) {
    try {
        let {email, phone, name, title, message} = req.body;

        const cleaner = container.get('cleaner');
        const config = container.get('config');
        const mailer = container.get('mailer');

        email = cleaner.clean(email);
        phone = cleaner.clean(phone);
        name = cleaner.clean(name);
        title = cleaner.clean(title);
        message = cleaner.clean(message);

        let text = `from: ${name}
address: ${email}
phone: ${phone}
title: ${title}
message: ${message}`;

        mailer.mail(config.get('app.email'), 'Message from NikahKu user', text);
        return res.json({r: 'ok'});
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(723).json({});
    }
});


module.exports = router;
