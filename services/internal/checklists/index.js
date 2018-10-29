/**
 * Created by guy on 8/15/18.
 */
const _ = require('lodash');
const path = require('path');

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
