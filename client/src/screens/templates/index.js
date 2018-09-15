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


const templates = {
    1: {
        home:  (website, id) => <OneHome website={website} websiteId={id} />,
        header:  (website, id) => <OneHeader website={website} websiteId={id}/>,
        photos:  (website, id) => <OnePhoto website={website} websiteId={id}/>,
        faqs:  (website, id) => <OneFAQs website={website} websiteId={id}/>,
        events:  (website, id) => <OneEvents website={website} websiteId={id}/>,
        menu:  (website, id) => <OneMenu website={website} websiteId={id}/>,
    }
};

export function getTemplate(key){
    return templates[key]
}