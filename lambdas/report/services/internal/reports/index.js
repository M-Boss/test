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

    async find(){
        return await this.db.AdminReport.findAll();
    }

    async generateReport() {
        console.log("Generating report...");
        let users = await this.db.User.findAll();
        if(!users) users = [];

        const report = {};
        report.user_count = users.length;
        report.wedding_details_completed = this.wedding_details_completed(users);
        report.users_chosen_templates = this.users_chosen_templates(users);
        report.users_with_event = this.users_with_event(users);
        report.published_users = this.published_users(users);
        report.users_with_checklist = this.users_with_checklist(users);
        report.users_with_guestlist = this.users_with_guestlist(users);

        return this.db.AdminReport.create(report);
    }

    wedding_details_completed(users){
        return users.reduce( (total, user) => {
            const percentage = this.websiteValidator.getPercentage(_.get(user, 'website', {}));
            return total + (percentage == 1 ? 1 : 0);
        }, 0)
    }

    users_chosen_templates(users){
        return users.reduce( (total, user) => {
            const template = _.get(user, 'website.template', 0);
            return total + (template ? 1 : 0);
        }, 0)
    }

    users_with_event(users){
        return users.reduce( (total, user) => {
            const events = _.get(user, 'website.events', []);
            let hasEvent = false;
            for(let event of events){
                if(event && event.title && event.date && event.start_time){
                    hasEvent = true;
                    break
                }
            }

            return total + (hasEvent ? 1 : 0);
        }, 0)
    }

    published_users(users){
        return users.reduce( (total, user) => {
            const published = _.get(user, 'website.public', false);
            return total + (published ? 1 : 0);
        }, 0)
    }

    users_with_checklist(users){
        return users.reduce( (total, user) => {
            const checklist_id = _.get(user, 'checklist_id');
            return total + (checklist_id ? 1 : 0);
        }, 0)
    }

    users_with_guestlist(users){
        return users.reduce( (total, user) => {
            const guestlist_id = _.get(user, 'guestlist_id');
            return total + (guestlist_id ? 1 : 0);
        }, 0)
    }
};
