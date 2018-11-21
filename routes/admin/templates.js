const express = require('express');
const router = express.Router();
const container = require('../../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const {templateList} = require('../../client/src/screens/templates/templateList');

router.post('/template-previews/add', async function (req, res, next) {
    const db = container.get('db');
    const user_id = _.get(req, "body.user_id");
    const template_id = _.get(req, "body.template_id");

    try {
        await db.PreviewUser.create({
            user_id,
            template_id
        });
        res.redirect('/boss/template-previews');
    }
    catch (e){
        console.log(e);
        res.redirect('/boss/template-previews');
    }
});

router.get('/template-previews/del/:id', async function (req, res, next) {
    const db = container.get('db');
    const id = _.get(req, "params.id");

    try {
        console.log("id", id);
        await db.PreviewUser.destroy({
            where: {
                id
            }
        });
        res.redirect('/boss/template-previews');
    }
    catch (e){
        console.log(e);
        res.redirect('/boss/template-previews');
    }
});

router.get('/template-previews', async function (req, res, next) {
    const db = container.get('db');

    try {
        const users = await db.PreviewUser.findAll({include: [
            {
                model: db.User,
                as: 'user'
            }
        ]});
        res.render('admin/template_previews', {users});
    }
    catch (e){
        console.log(e);
        res.sendStatus(724); //probably duplicate email
    }
});

router.get('/templates', async function (req, res, next) {
    const db = container.get('db');

    try {
        res.render('admin/templates', {templates: templateList});
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

module.exports = router;