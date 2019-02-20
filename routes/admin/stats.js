const express = require('express');
const router = express.Router();
const container = require('../../services');
const _ = require('lodash');
const validate = require('express-validation');
const Joi = require('joi');
const path = require('path');
const moment = require('moment');
const {templateList} = require('../../client/src/screens/templates/templateList');
const Excel = require('exceljs');

router.get('/stats', async function (req, res, next) {
    const db = container.get('db');
    const reports = container.get('reports');
    try {
        const items = await reports.find();
        res.render('admin/stats', {items, moment});
    }
    catch (e){
        console.log(e);
        res.json(e);
    }
});

router.get('/stats/download', async function (req, res, next) {
    const guestlists = container.get('guestlists');
    const db = container.get('db');
    const reports = container.get('reports');

    try {
        const items = await reports.find();
        const workbook = new Excel.Workbook();
        const sheet = workbook.addWorksheet('Stats');
        sheet.columns = [
            {header: 'Time'},
            {header: 'Users'},
            {header: 'Completed website'},
            {header: 'Chosen template'},
            {header: 'Have event'},
            {header: 'Published'},
            {header: 'Checklist'},
            {header: 'Guestlist'},
            {header: 'Tasks done'},
            {header: 'Guests'},
        ];
        const rows = items.map(i => {
            return [
                moment(i.createdAt).format('YYYY-MM-DD HH:mm'),
                i.user_count,
                i.wedding_details_completed,
                i.users_chosen_templates,
                i.users_with_event,
                i.published_users,
                i.users_with_checklist,
                i.users_with_guestlist,
                i.tasks_done,
                i.guests,
            ]
        });
        sheet.addRows(rows);

        const fileName = 'Guests.xlsx';
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        await workbook.xlsx.write(res);
        res.end();
    }
    catch (e){
        console.log("error in stats download", e);
        res.send("oops - please try again.");
    }
});

module.exports = router;