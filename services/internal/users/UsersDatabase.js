/**
 * Created by guy on 8/15/18.
 */
const _ = require('lodash');
const path = require('path');

module.exports = class UsersDatabase{
    constructor(db, hasher, random, emitter, mailer, config){
        this.db = db;
        this.hasher = hasher;
        this.random = random;
        this.emitter = emitter;
        this.mailer = mailer;
        this.config = config;
    }

    async create(data){
        return this.db.User.create({
            email: data.email,
            password: this.hasher.hash(data.password),
            website: {},
            token: this.random.randomString(4) + String(+ new Date()),
            activation_code: this.random.randomString(8)
        });
    }

    async login({email, password}){
        let user = await this.db.User.findOne({
            where: {email: email},
        });
        if(!user || user.password !== this.hasher.hash(password)){
            throw(new Error);
        }

        user["password"] = null;
        return user;
    }

    async findOne(query){
        return await this.db.User.findOne({
            where: query
        });
    }

    async find(query, order = []){
        return await this.db.User.findAll({
            where: query,
            order: order
        });
    }

    async activate(id, code){
        let user = await this.db.User.findOne({
            where: {id: id}
        });
        if(!user){
            return false;
        }

        if(code && user.activation_code === code){
            user.active = 1;
            user.save();
            return true;
        }
        return false;
    }

    async resetPassword(id, token, password){
        console.log("resetting: ", id, token, password)
        let user = await this.db.User.findOne({
            where: {id: id, recovery_token: token}
        });

        return this.resetPasswordByUser(user, password);
    }
    async resetPasswordByUser(user, password){
        if(!user){
            return false;
        }

        user.password = this.hasher.hash(password);
        user.save();
        return true;
    }

    async recover(email){
        let user = await this.db.User.findOne({
            where: {email: email}
        });
        if(!user){
            return
        }

        user.recovery_token = this.random.randomString(10);
        return user.save().then(() => this.emitter.emit('recovery_token_generated', user));
    }

    async changePassword(email, token, newPassword){
        let user = await this.db.User.findOne({
            where: {email: email}
        });
        if(!user){
            throw new Error();
        }

        user.recovery_token = "";
        user.password = this.hasher.hash(newPassword);
        return user.save();
    }

    async sendVerificationEmail(user){
        if(!user) return false;
        const link = this.config.get('app.domain') + `api/auth/activate/${user.id}/${user.activation_code}`;
        const templatePath = path.join(__dirname, '..', '..', '..', 'views', 'emails', 'verification.html');
        this.mailer.mailEJS(user.email, 'NikahKu - Activation Link', templatePath, {link});
    }

    async buildWebsiteURL(slug){
        return this.config.get("app.domain") + "wedding/" + slug;
    }
};
