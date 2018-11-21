/**
 * Created by guy on 8/18/18.
 */
const _ = require('lodash');

module.exports = class Settings{
    constructor(db){
        this.db = db;
    }

    async get(key){
        const setting = await this.db.Setting.findOne({key});
        return _.get(setting, 'value');
    }

    async set(key, value){
        let setting = await this.db.Setting.findOne({key});
        if(!setting){
            setting = this.db.Setting.build({key})
        }
        setting.value = value;
        return await setting.save();
    }
};
