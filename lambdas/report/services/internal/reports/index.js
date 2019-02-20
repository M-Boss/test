/**
 * Created by guy on 8/15/18.
 */
const _ = require('lodash');
const path = require('path');
const moment = require('moment');

module.exports = class Reports {
    constructor(db, websiteValidator) {
        this.db = db;
        this.websiteValidator = websiteValidator;
    }

    async find() {
        return await this.db.AdminReport.findAll();
    }

    async generateReport() {
        console.log("Generating report...");
        let users = await this.db.User.findAll();
        if (!users) users = [];

        const report = {};
        report.user_count = users.length;
        report.wedding_details_completed = this.wedding_details_completed(users);
        report.users_chosen_templates = this.users_chosen_templates(users);
        report.users_with_event = this.users_with_event(users);
        report.published_users = this.published_users(users);
        report.users_with_checklist = this.users_with_checklist(users);
        report.users_with_guestlist = this.users_with_guestlist(users);
        report.tasks_done = await this.tasks_done();
        report.guests = await this.guests();

        return this.db.AdminReport.create(report);
    }

    wedding_details_completed(users) {
        return users.reduce((total, user) => {
            const website = _.get(user, 'website', {});
            const filled = this.websiteValidator.isFilled(website);
            return total + (filled ? 1 : 0);
        }, 0)
    }

    users_chosen_templates(users) {
        return users.reduce((total, user) => {
            const template = _.get(user, 'website.template', 0);
            return total + (template ? 1 : 0);
        }, 0)
    }

    users_with_event(users) {
        return users.reduce((total, user) => {
            const events = _.get(user, 'website.events', []);
            let hasEvent = false;
            for (let event of events) {
                if (event && event.title && event.date && event.start_time) {
                    hasEvent = true;
                    break
                }
            }

            return total + (hasEvent ? 1 : 0);
        }, 0)
    }

    published_users(users) {
        return users.reduce((total, user) => {
            const published = _.get(user, 'website.public', false);
            return total + (published ? 1 : 0);
        }, 0)
    }

    users_with_checklist(users) {
        return users.reduce((total, user) => {
            const checklist_id = _.get(user, 'checklist_id');
            return total + (checklist_id ? 1 : 0);
        }, 0)
    }

    users_with_guestlist(users) {
        return users.reduce((total, user) => {
            const guestlist_id = _.get(user, 'guestlist_id');
            return total + (guestlist_id ? 1 : 0);
        }, 0)
    }

    async guests() {
        const r = await this.db.Guest.findOne({
            attributes: [[this.db.sequelize.fn('COUNT', this.db.sequelize.col('id')), 'no_guests']],
        });
        return r.get ? r.get('no_guests') : 0;
    }

    async tasks_done() {
        const r = await this.db.Task.findOne({
            attributes: [[this.db.sequelize.fn('COUNT', this.db.sequelize.col('id')), 'no_tasks']],
            where: {
                done: {
                    [this.db.Sequelize.Op.ne]: null
                }
            }
        });

        return r.get ? r.get('no_tasks') : 0;
    }
};
