const express = require('express');
const router = express.Router();
const container = require('../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');

router.post('/checklist/get',  async function (req, res, next) {
    const users = container.get('users');
    const mailer = container.get('mailer');
    const config = container.get('config');
    const db = container.get('db');

    try {
        const cl = await req.user.getChecklist({include: [
            {
                model: db.Task,
                as: 'tasks'
            }
        ]});
        res.send({r: 'ok', checklist: cl});
    }
    catch (e){
        console.log('sendVerificationEmail error', e);
        res.sendStatus(723); //probably duplicate email
    }
});

router.post('/checklist/add_task',  async function (req, res, next) {
    const checklists = container.get('checklists');
    const cleaner = container.get('cleaner');

    try {
        const title = cleaner.clean(_.get(req, 'body.title'));
        const description = cleaner.clean(_.get(req, 'body.description'));
        const due = _.get(req, 'body.due');
        console.log('due: ', due);
        if(!req.user.checklist_id) return false;
        await checklists.createTask(req.user.checklist_id, title, description, due);
        res.send({r: 'ok'});
    }
    catch (e){
        res.sendStatus(728);
    }
});

router.post('/checklist/update_task',  async function (req, res, next) {
    const checklists = container.get('checklists');
    const cleaner = container.get('cleaner');
    const time = container.get('time');

    try {
        if(!req.user.checklist_id) return false;

        const id = _.get(req, 'body.id');
        const title = cleaner.clean(_.get(req, 'body.title'));
        const description = cleaner.clean(_.get(req, 'body.description'));
        const due = _.get(req, 'body.due');
        const done = _.get(req, 'body.done');

        const task = await checklists.findTask({
            id,
            checklist_id: req.user.checklist_id
        });

        if(!task){
            return res.send(404);
        }

        if(done != 0){
            if(!task.done) task.done = time.ymd();
        }else{
            task.done = null;
        }

        task.title = title;
        task.description = description;
        if(due) task.due = due;
        await task.save();
        res.send({r: 'ok'});
    }
    catch (e){
        res.sendStatus(728);
    }
});


router.post('/checklist/set_completion',  async function (req, res, next) {
    const checklists = container.get('checklists');
    const cleaner = container.get('cleaner');
    const time = container.get('time');

    try {
        if(!req.user.checklist_id) return false;

        const id = _.get(req, 'body.id');
        const done = _.get(req, 'body.done');

        await checklists.setTaskCompletionStatus({
            id,
            checklist_id: req.user.checklist_id
        }, done);
        res.send({r: 'ok'});
    }
    catch (e){
        res.sendStatus(728);
    }
});

router.post('/checklist/remove_task',  async function (req, res, next) {
    const checklists = container.get('checklists');
    const cleaner = container.get('cleaner');

    try {
        const id = _.get(req, 'body.id');
        await checklists.removeTask(id, req.user.checklist_id);
        res.send({r: 'ok'});
    }
    catch (e){
        res.sendStatus(728);
    }
});

module.exports = router;