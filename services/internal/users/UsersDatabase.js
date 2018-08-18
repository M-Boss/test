/**
 * Created by guy on 8/15/18.
 */

class UsersDatabase{

    constructor(db, hasher, helpers, emitter){
        this.db = db;
        this.hasher = hasher;
    }


    async create(data){
        return this.db.User.create(data);
    }


    async login({email, password}){
        let user = await this.db.User.findOne({
            where: {email: email}
        });
        if(!user || user.password !== this.hasher.hash(password)){
            throw(new Error);
        }

        return {
            token: "",
            user
        };
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

