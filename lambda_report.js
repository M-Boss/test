/**
 * Created by guy on 2/3/19.
 */
// require('dotenv').config();
const container = require('../services');
const report = container.get('reports');

exports.handler = async function(event, context) {
    const db = container.get('db');
    const users = await db.User.findAll();
    console.log("user count: ", users.length);
    return "done";
};