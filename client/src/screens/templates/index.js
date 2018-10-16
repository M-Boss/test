/**
 * Created by guy on 9/14/18.
 */
import React from 'react'
import OneHome from './one/Home'
import OneHeader from './one/Header'
import OnePhoto from './one/Photos'
import OneFAQs from './one/FAQs'
import OneEvents from './one/Events'
import OneMenu from './Menu_'

import TwoHome from './two/Home'
import TwoEvents from './two/Events'
import TwoFAQs from './two/FAQs'
import TwoPhoto from './two/Photos'

import ThreeHome from './three/Home'
import ThreeEvents from './three/Events'
import ThreeFAQs from './three/FAQs'
import ThreePhoto from './three/Photos'


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
        index: 0
    },
    {
        primary: '#f3ebde',
        secondary: '#f1c591',
        background: '#f3ebde',
        index: 1
    }
];
const theme3 = [
    {
        primary: '#f3ebde',
        secondary: '#FFF',
        background: '#f3ebde',
        foreground: '#222',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#f3ebde',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
    },
    {
        primary: '#f8f8f8',
        secondary: '#f1c591',
        background: '#f8f8f8',
        foreground: '#222',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 1,
        footerWithLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        footerAboutStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400,
            fontSize:15,
            color: '#333'
        },
        menuBackground: '#f8f8f8',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
    }
];

const templates = {
    1: {
        home: (website, id) => <OneHome theme={theme1[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <OnePhoto theme={theme1[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <OneFAQs theme={theme1[0]} website={website} websiteId={id}/>,
        events: (website, id) => <OneEvents theme={theme1[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme1[0]} website={website} websiteId={id}/>,
    },
    2: {
        home: (website, id) => <OneHome theme={theme1[1]} website={website} websiteId={id}/>,
        photos: (website, id) => <OnePhoto theme={theme1[1]} website={website} websiteId={id}/>,
        faqs: (website, id) => <OneFAQs theme={theme1[1]} website={website} websiteId={id}/>,
        events: (website, id) => <OneEvents theme={theme1[1]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme1[1]} website={website} websiteId={id}/>,
    },
    3: {
        home: (website, id) => <OneHome theme={theme1[2]} website={website} websiteId={id}/>,
        photos: (website, id) => <OnePhoto theme={theme1[2]} website={website} websiteId={id}/>,
        faqs: (website, id) => <OneFAQs theme={theme1[2]} website={website} websiteId={id}/>,
        events: (website, id) => <OneEvents theme={theme1[2]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme1[2]} website={website} websiteId={id}/>,
    },

    //two
    4: {
        home: (website, id) => <TwoHome theme={theme2[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <TwoPhoto theme={theme2[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <TwoFAQs theme={theme2[0]} website={website} websiteId={id}/>,
        events: (website, id) => <TwoEvents theme={theme2[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme1[0]} website={website} websiteId={id}/>,
    },
    5: {
        home: (website, id) => <TwoHome theme={theme2[1]} website={website} websiteId={id}/>,
        photos: (website, id) => <TwoPhoto theme={theme2[1]} website={website} websiteId={id}/>,
        faqs: (website, id) => <TwoFAQs theme={theme2[1]} website={website} websiteId={id}/>,
        events: (website, id) => <TwoEvents theme={theme2[1]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme1[1]} website={website} websiteId={id}/>,
    },

    //three
    6: {
        home: (website, id) => <ThreeHome theme={theme3[0]} website={website} websiteId={id}/>,
        events: (website, id) => <ThreeEvents theme={theme3[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <ThreeFAQs theme={theme3[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <ThreePhoto theme={theme3[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme3[0]} website={website} websiteId={id}/>,
    },
    7: {
        home: (website, id) => <ThreeHome theme={theme3[1]} website={website} websiteId={id}/>,
        events: (website, id) => <ThreeEvents theme={theme3[1]} website={website} websiteId={id}/>,
        faqs: (website, id) => <ThreeFAQs theme={theme3[1]} website={website} websiteId={id}/>,
        photos: (website, id) => <ThreePhoto theme={theme3[1]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme3[1]} website={website} websiteId={id}/>,
    },
};

export function getTemplate(key) {
    return templates[key]
}

