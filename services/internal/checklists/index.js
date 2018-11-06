/**
 * Created by guy on 8/15/18.
 */
const _ = require('lodash');
const path = require('path');
const moment = require('moment');

module.exports = class ChecklistDatabase {
    constructor(db, hasher, random, emitter, mailer, config, time) {
        this.db = db;
        this.hasher = hasher;
        this.random = random;
        this.emitter = emitter;
        this.mailer = mailer;
        this.config = config;
        this.time = time;
    }

    async createChecklist(userId) {
        const r = await this.db.Checklist.create({});
        if (r && r.id) {
            await this.db.User.update({checklist_id: r.id}, {where: {id: userId}});
        }
        return r;
    }

    async layOutTasksFromCategories(user, categories = [], categoriesToBeDeleted){
        if(!user || !user.checklist_id) return false;

        const templates = await this.db.TaskTemplate.findAll({
            where: {
                category: categories
            }
        });

        const weddingDate = moment(user.wedding_date, 'YYYY-MM-DD');

        let tasks = templates.map(template => {
            return {
                category: template.category,
                title: template.title,
                description: template.description,
                days_before: template.days_before,
                due: moment(weddingDate).add( -1 * parseInt(template.days_before), 'days').format('YYYY-MM-DD'),
                checklist_id: user.checklist_id
            }
        });

        await this.db.Task.bulkCreate(tasks);

        if(categoriesToBeDeleted){
            await this.db.Task.destroy({
                where: {
                    checklist_id: user.checklist_id,
                    category: categoriesToBeDeleted
                }
            })
        }
        return true;
    }

    async updateTaskDates(user){
        if(!user || !user.checklist_id) return false;

        let tasks = await this.db.Task.findAll({
            where: {
                checklist_id: user.checklist_id,
            }
        });

        const weddingDate = moment(user.wedding_date, 'YYYY-MM-DD');
        //TODO Optimize update
        for(let i = 0; i < tasks.length; i++){
            const task = tasks[i];
            if(task.category) {
                tasks[i].due = moment(weddingDate).add(-1 * parseInt(task.days_before), 'days').format('YYYY-MM-DD');
                await tasks[i].save();
            }
        }

        // await this.db.Task.update(tasks);
        return true;
    }

    async createTask(checklist_id, title, description, due, days_before = 100) {
        const r = await this.db.Task.create({
            title, description, due, checklist_id, days_before
        });
        return r;
    }

    async findTask(query){
        let task = await this.db.Task.findOne({
            where: query
        });
        return task;
    }

    async setTaskCompletionStatus(query, done){
        console.log('done2: ', done);
        let task = await this.db.Task.findOne({
            where: query
        });
        if(!task) return false;
        console.log('done: ', done);

        if(done != 0){
            if(!task.done) task.done = this.time.ymd();
        }else{
            task.done = null;
        }
        task.save();
        return task;
    }

    async removeTask(id, checklist_id) {
        const r = await this.db.Task.destroy({
            where: {
                id,
                checklist_id
            }
        });
    }
};
