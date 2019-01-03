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

router.post('/templates/:id', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');

    try {
        const template_id = parseInt(_.get(req, 'params.id'));
        const user_id = parseInt(_.get(req, 'body.user_id'));
        let item = await db.PreviewUser.findOne({
            where: {
                template_id
            }
        });
        if(!item){
            item = db.PreviewUser.build({template_id});
        }
        item.user_id = user_id;
        await item.save();
        res.redirect('/boss/templates/' + template_id);
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

router.get('/templates/:id', async function (req, res, next) {
    const db = container.get('db');
    const users = container.get('users');

    try {
        const id = parseInt(_.get(req, 'params.id'));
        const userList = await users.find(null, [['id','DESC']]);
        let previewUser = await db.PreviewUser.findOne({
            where: {
                template_id: id
            }
        });
        res.render('admin/template', {id, users: userList, user_id: previewUser ? previewUser.user_id: 0});
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

module.exports = router;