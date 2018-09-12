/**
 * Created by guy on 8/18/18.
 */
const bcrypt = require('crypto');

module.exports = class Hasher {
    hash(s){
        return bcrypt.createHash('sha256').update(s).digest('base64');
    }
}

