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
    const checklists = container.get('checklists');

    try {
        let cl = await req.user.getChecklist({include: [
            {
                model: db.Task,
                as: 'tasks'
            }
        ]});

        if(!cl){
            cl = await checklists.createChecklist(req.user.id);
            if(!cl){
                throw "Could not create checklist";
            }
        }

        res.send({r: 'ok',
            checklist: cl,
            user: {
                wedding_date: req.user.wedding_date
            }
        });
    }

    catch (e){
        console.log('sendVerificationEmail error', e);
        res.sendStatus(723);
    }
});

router.post('/guestlist/add_guest',  async function (req, res, next) {
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
        const notes = _.get(req, 'body.notes');
        // const done = _.get(req, 'body.done');

        console.log( req.body);

        const task = await checklists.findTask({
            id,
            checklist_id: req.user.checklist_id
        });

        if(!task){
            return res.send(404);
        }

        // if(done != 0){
        //     if(!task.done) task.done = time.ymd();
        // }else{
        //     task.done = null;
        // }

        task.title = cleaner.clean(title);
        task.description = cleaner.clean(description);
        task.notes = cleaner.clean(notes);
        if(due) task.due = cleaner.clean(due);
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

        const task = await checklists.setTaskCompletionStatus({
            id,
            checklist_id: req.user.checklist_id
        }, done);
        res.send({task});
    }
    catch (e){
        res.sendStatus(728);
    }
});

router.post('/checklist/settings',  async function (req, res, next) {
    const checklists = container.get('checklists');
    const cleaner = container.get('cleaner');
    const time = container.get('time');

    try {
        if(!req.user.checklist_id) return false;
        const weddingDate = _.get(req, 'body.weddingDate');
        const traditions = _.get(req, 'body.traditions') || [];
        if(!traditions.map) return false;

        let cl = await req.user.getChecklist();
        if(!cl) throw "No checklisist";



        if(req.user.wedding_date != weddingDate){
            req.user.wedding_date = weddingDate;
            await req.user.save();
            if(cl.initialized){
                await checklists.updateTaskDates(req.user)
            }
        }


        let categoriesToBeAdded = [];
        let categoriesToBeDeleted = [];
        if(!cl.traditions) cl.traditions = [];
        if(!traditions.includes('general')) traditions.push('general');
        traditions.map(t => {
            if(!cl.traditions.includes(t)){
                categoriesToBeAdded.push(t)
            }
        });
        cl.traditions.map(t => {
            if(!traditions.includes(t)){
                categoriesToBeDeleted.push(t)
            }
        });
        await checklists.layOutTasksFromCategories(req.user, categoriesToBeAdded, categoriesToBeDeleted);
        cl.traditions = traditions;
        cl.initialized = 1;
        await cl.save();

        res.send({});
    }
    catch (e){
        console.log(e)
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