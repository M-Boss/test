/**
 * Created by guy on 2/3/19.
 */
const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '.env') });
const container = require('./services');

exports.handler = async function(event, context) {
    const report = container.get('reports');
    await report.generateReport();
    return "Report generated";
};

// exports.handler();
