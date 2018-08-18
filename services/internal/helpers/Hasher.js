/**
 * Created by guy on 8/18/18.
 */
const bcrypt = require('crypto');

export default class Hasher {
    hash(s){
        return crypto.createHash('sha256').update(pwd).digest('base64');
    }
}

