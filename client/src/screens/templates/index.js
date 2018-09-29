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


import TwoHome from './two/Home'
import TwoEvents from './two/Events'


const theme1 = [
    {
        primary: '#72859a',
        secondary: '#f7bbc2',
        background: '#f1f4f8',
    },
    {
        primary: '#569173',
        secondary: '#f1c591',
        background: '#ffefd1',
    },
    {
        primary: '#a59bc3',
        secondary: '#f1c591',
        background: '#fff5e0',
    }
];
const theme2 = [
    {
        primary: '#b0dcec',
        secondary: '#FFF',
        background: '#b0dcec',
    },
    {
        primary: '#569173',
        secondary: '#f1c591',
        background: '#ffefd1',
    }
];


const templates = {
    2: {
        home: (website, id) => <OneHome theme={theme1[0]} website={website} websiteId={id}/>,
        header: (website, id) => <OneHeader theme={theme1[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <OnePhoto theme={theme1[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <OneFAQs theme={theme1[0]} website={website} websiteId={id}/>,
        events: (website, id) => <OneEvents theme={theme1[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme1[0]} website={website} websiteId={id}/>,
    },
    1: {
        home: (website, id) => <TwoHome theme={theme2[0]} website={website} websiteId={id}/>,
        header: (website, id) => <OneHeader theme={theme1[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <OnePhoto theme={theme1[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <OneFAQs theme={theme1[0]} website={website} websiteId={id}/>,
        events: (website, id) => <TwoEvents theme={theme2[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme1[0]} website={website} websiteId={id}/>,
    },
};

export function getTemplate(key) {
    return templates[key]
}