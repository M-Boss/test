const express = require('express');
const router = express.Router();
const container = require('../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const Excel = require('exceljs');

router.post('/guestlist/get',  async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');
    const db = container.get('db');
    const guestlists = container.get('guestlists');

    try{
        let gl = await req.user.getGuestlist({include: [
            {
                model: db.Guest,
                as: 'guests'
            }
        ]});

        if(!gl){
            gl = await guestlists.createGuestlist(req.user.id);
            if(!gl){
                throw "Could not create checklist";
            }
        }

        if(!gl.invitation_token){
            guestlists.setGuestlistInvitationToken(gl);
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

router.post('/guestlist/remove_guest',  async function (req, res, next) {
    const guestlists = container.get('guestlists');
    const cleaner = container.get('cleaner');

    try {
        const id = _.get(req, 'body.id');
        await guestlists.removeGuest(id, req.user.guestlist_id);
        res.send({r: 'ok'});
    }
    catch (e){
        console.log('/checklist/remove_guest', e);
        res.sendStatus(728);
    }
});

router.get('/guestlist/download', async function (req, res, next) {

    const guestlists = container.get('guestlists');
    const db = container.get('db');
    const users = container.get('users');

    // const t = _.get(req, 'query.x_token');
    try{
        const user = req.user;
        // const user = await users.findOne({token});
        // if(!user){
        //     throw("User with this token not found");
        // }
        let guests = [];
        const gl = await user.getGuestlist({include: [
            {
                model: db.Guest,
                as: 'guests'
            }
        ]});
        if(!gl){
            guests = [];
        }
        else{
            guests = gl.guests || [];
        }

        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet('Guests');
        sheet.columns = [
            { header: 'Title' },
            { header: 'Name' },
            { header: 'Number' },
            { header: 'Invited' },
            { header: 'Relationship' },
            { header: 'Email' },
            { header: 'Mobile' },
            { header: 'Street' },
            { header: 'Negara' },
            { header: 'Kota' },
            { header: 'Kode Pos' },
        ];
        const rows = guests.map(g => {
            return [
                g.title,
                `${_.get(g, 'info.first_name')} ${_.get(g, 'info.last_name', "")}`,
                1 + ((_.get(g, 'plus.unknown') || _.get(g, 'plus.first_name')) ? 1 : 0) + (_.get(g, 'children', []).length),
                g.definitely_invited ? 'Invited' : 'Maybe',
                g.relationship,
                g.email,
                g.mobile,
                g.street,
                g.country,
                g.city,
                g.postal_code,
            ]
        });
        sheet.addRows(rows);

        const fileName = 'Guests.xlsx';
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        await workbook.xlsx.write(res);
        res.end();
    }
    catch(e){
        console.log('/guestlist/download/:', e);
        res.sendStatus(400);
    }
});

module.exports = router;