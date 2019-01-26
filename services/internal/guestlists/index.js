/**
 * Created by guy on 8/15/18.
 */
const _ = require('lodash');
const path = require('path');
const moment = require('moment');

module.exports = class ChecklistDatabase {
    constructor(db, hasher, random, emitter, mailer, config, cleaner) {
        this.db = db;
        this.hasher = hasher;
        this.random = random;
        this.emitter = emitter;
        this.mailer = mailer;
        this.config = config;
        this.cleaner = cleaner;
    }

    async createGuestlist(userId) {
        const r = await this.db.Guestlist.create({});
        if (r && r.id) {
            await this.db.User.update({guestlist_id: r.id}, {where: {id: userId}});
            this.setGuestlistInvitationToken(r)
        }
        return r;
    }

    setGuestlistInvitationToken(guestlist){
        guestlist.invitation_token = this.random.randomString(6) + guestlist.id;
        guestlist.save();
    }

    cleanPersonInfo(info){
        return {
            first_name: this.cleaner.clean(_.get(info, 'first_name')),
            last_name: this.cleaner.clean(_.get(info, 'last_name')),
            title: this.cleaner.clean(_.get(info, 'title')),
            unknown: this.cleaner.clean(_.get(info, 'unknown')),
        }
    }

    async storeGuest(user, {
        id,
        info,
        plus,
        children = [],
        street, city, country, postal_code,
        relationship,
        email, mobile,
        definitely_invited,
        rsvp,
    }) {

        if(!children.map) children = [];

        if(!user.guestlist_id){
            const gl = await this.createGuestlist(user.id);
            user.guestlist_id = gl.id;
            await user.save();
        }

        const data = {
            info: this.cleanPersonInfo(info),
            plus: this.cleanPersonInfo(plus),
            children: children.map(c => this.cleanPersonInfo(c)),
            guestlist_id: user.guestlist_id,
            total: 1,
            street: this.cleaner.clean(street),
            city: this.cleaner.clean(city),
            country: this.cleaner.clean(country),
            postal_code: this.cleaner.clean(postal_code),
            relationship: this.cleaner.clean(relationship),
            email: this.cleaner.clean(email),
            mobile: this.cleaner.clean(mobile),
            definitely_invited: !definitely_invited ? 0 : 1,
            rsvp: !rsvp ? 'unknown' : rsvp,
        };

        if(id){
            await this.db.Guest.update(data, {where: {id}})
        }
        else{
            await this.db.Guest.create(data);
        }
    }

    async findOne(query){
        return await this.db.Guestlist.findOne({
            where: query
        });
    }

    async setGuestInvitationMode(query, definitely_invited){
        let guest = await this.db.Guest.findOne({
            where: query
        });
        if(!guest) return false;

        task.definitely_invited = definitely_invited;
        return task;
    }

    async removeGuest(id, guestlist_id) {
        const r = await this.db.Guest.destroy({
            where: {
                id,
                guestlist_id
            }
        });
    }
};
