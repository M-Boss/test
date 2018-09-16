/**
 * Created by guy on 9/14/18.
 */
import React from 'react'
import OneHome from './one/Home'
import OneHeader from './one/Header'
import OnePhoto from './one/Photos'
import OneFAQs from './one/FAQs'
import OneEvents from './one/Events'
import OneMenu from './one/Menu'


const theme_1_1 = {
    primary: '#72859a',
    secondary: '#f7bbc2',
    background: '#f1f4f8',
};

const templates = {
    1: {
        home:  (website, id) =>     <OneHome    theme={theme_1_1} website={website} websiteId={id}/>,
        header:  (website, id) =>   <OneHeader  theme={theme_1_1} website={website} websiteId={id}/>,
        photos:  (website, id) =>   <OnePhoto   theme={theme_1_1} website={website} websiteId={id}/>,
        faqs:  (website, id) =>     <OneFAQs    theme={theme_1_1} website={website} websiteId={id}/>,
        events:  (website, id) =>   <OneEvents  theme={theme_1_1} website={website} websiteId={id}/>,
        menu:  (website, id) =>     <OneMenu    theme={theme_1_1} website={website} websiteId={id}/>,
    }
};

export function getTemplate(key){
    return templates[key]
}