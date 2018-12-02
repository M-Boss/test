/**
 * Created by guy on 9/11/18.
 */
const _ = require('lodash');
const container = require("../services");
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/get/:id', async function (req, res, next) {
    try {
        const db = container.get('db');
        const users = container.get('users');
        const config = container.get('config');
        const id = _.get(req, "params.id");
        if(!id){
            return res.status(500).json({});
        }

        const user = await users.findOne({slug: id});
        if(!user){
            return res.status(404).json({});
        }

        //If preview link
        if(user.is_template_user){
            const website = await buildPreviewWebsite(user, container);
            return res.json({website: website});

        }
        else{
            const user = await users.findOne({slug: id});
            if(user){
                return res.json({website: user.website});
            }
        }
    }
    catch(e){
        console.log("Error: ", e);
        return res.status(404).json({});
    }
});

async function buildPreviewWebsite(user, container){
    const db = container.get('db');
    const users = container.get('users');
    const config = container.get('config');
    const settings = container.get('settings');

    try {
        let baseWebsite = {};
        let previewUserId = await settings.getInt('preview_user');
        if(previewUserId){
            const mainPreviewUser = await users.findOne({id: previewUserId});
            baseWebsite = _.get(mainPreviewUser, 'website', {});
        }
        const overridingWebsite = _.get(user, 'website', {});
        return Object.assign({}, baseWebsite, overridingWebsite);
    }
    catch(e){
        console.log("Error buildPreviewWebsite()", e);
        return {}
    }

}

module.exports = router;
