
const moment = require('moment')

module.exports = class Time {
    ymd(){
        return moment().format("YYYY-MM-DD");
    }
}

