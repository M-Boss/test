const express = require('express');
const router = express.Router();
const container = require('../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');

router.get('/guestlist/get',  async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');
    const db = container.get('db');
    const guestlists = container.get('guestlists');

    try {
        let gl = await req.user.getGuestlist({include: [
            {
                model: db.Guest,
                as: 'guests'
            }
        ]});

        if(!gl){
            gl = await guestlists.createChecklist(req.user.id);
            if(!gl){
                throw "Could not create checklist";
            }
        }

        res.send({r: 'ok',
            guestlist: gl,
        });
    }

    catch (e){
        console.log('/guestlist/get', e);
        res.sendStatus(723);
    }
});

router.post('/guestlist/store_guest',  async function (req, res, next) {
    const guestlists = container.get('guestlists');
    const cleaner = container.get('cleaner');

    try {
        const guest = _.get(req, 'body.guest');
        await guestlists.storeGuest(req.user, guest);
        res.send({r: 'ok'});
    }
    catch (e){
        console.log('/guestlist/store_guest', e);
        res.sendStatus(728);
    }
});

router.post('/guestlist/set_invitation_mode',  async function (req, res, next) {
    const guestlists = container.get('guestlists');
    const cleaner = container.get('cleaner');
    const time = container.get('time');

    try {
        if(!req.user.guestlist_id) return false;

        const id = _.get(req, 'body.id');
        const definitely_invited = _.get(req, 'body.definitely_invited');

        const guest = await guestlists.setGuestInvitationMode({
            id,
            guestlist_id: req.user.guestlist_id
        }, definitely_invited);
        res.send({guest});
    }
    catch (e){
        res.sendStatus(728);
    }
});

router.post('/checklist/remove_guest',  async function (req, res, next) {
    const checklists = container.get('checklists');
    const cleaner = container.get('cleaner');

    try {
        const id = _.get(req, 'body.id');
        await checklists.removeTask(id, req.user.checklist_id);
        res.send({r: 'ok'});
    }
    catch (e){
        console.log('/checklist/remove_guest', e);
        res.sendStatus(728);
    }
});

module.exports = router;