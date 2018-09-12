/**
 * Created by guy on 8/15/18.
 */

module.exports = class UsersDatabase{

    constructor(db, hasher, random){
        this.db = db;
        this.hasher = hasher;
        this.random = random;
    }

    async create(data){
        return this.db.User.create({
            email: data.email,
            password: this.hasher.hash(data.password),
            website: {},
            token: this.random.randomString(4) + String(+ new Date())
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

    async recover(email){
        let user = await this.db.User.findOne({
            where: {email: email}
        });
        if(!user){
            return
        }

        user.recovery_token = this.helpers.randomString(16);
        return user.save().then(() => emitter.emit('recovery_token_generated', user));
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
}