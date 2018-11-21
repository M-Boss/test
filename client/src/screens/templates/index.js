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

import FourHome from './four/Home'
import FourEvents from './four/Events'
import FourFAQs from './four/FAQs'
import FourPhoto from './four/Photos'

import FiveHome from './five/Home'
import FiveEvents from './five/Events'
import FiveFAQs from './five/FAQs'
import FivePhoto from './five/Photos'

import SixHome from './six/Home'
import SixEvents from './six/Events'
import SixFAQs from './six/FAQs'
import SixPhoto from './six/Photos'

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
const theme4 = [
    {
        primary: '#FFF',
        secondary: '#FFF',
        background: '#FFF',
        foreground: '#2A4470',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#FFF',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
        headerBackground: '#FFF',
        headerForeground: '#2A4470',
        headerFontSize: 20
    }
];

const theme5 = [
    {
        primary: '#FFF',
        secondary: '#FFF',
        background: '#FFF',
        foreground: '#363639',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#FFF',
        menuClassName: 'template-3-menu',
        menuItem: '#333',
        headerBackground: '#FFF',
        headerForeground: '#363639',
        headerFontSize: 20
    }
];

const theme6 = [
    {
        primary: '#FFF',
        secondary: '#FFF',
        background: '#FFF',
        foreground: '#363639',
        copyright_background: '#999',
        copyright_foreground: '#fff',
        index: 0,
        withLoveStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 400
        },
        menuBackground: '#FFF',
        menuClassName: 'template-6-menu',
        menuItem: '#333',
        menuFontSize: 20,
        headerBackground: '#FFF',
        headerForeground: '#363639',
        headerFontSize: 20,
        headerHideNames: true,
        headerBurgerSize: 48,
        headerContainerStyles:{
            position: 'fixed',
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            top: 0,
            zIndex: 100
        },
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

    //four
    8: {
        home: (website, id) => <FourHome theme={theme4[0]} website={website} websiteId={id}/>,
        events: (website, id) => <FourEvents theme={theme4[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <FourFAQs theme={theme4[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <FourPhoto theme={theme4[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme4[0]} website={website} websiteId={id}/>,
    },

    //five
    9: {
        home: (website, id) => <FiveHome theme={theme5[0]} website={website} websiteId={id}/>,
        events: (website, id) => <FiveEvents theme={theme5[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <FiveFAQs theme={theme5[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <FivePhoto theme={theme5[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme5[0]} website={website} websiteId={id}/>,
    },

    //five
    10: {
        home: (website, id) => <SixHome theme={theme6[0]} website={website} websiteId={id}/>,
        events: (website, id) => <SixEvents theme={theme6[0]} website={website} websiteId={id}/>,
        faqs: (website, id) => <SixFAQs theme={theme6[0]} website={website} websiteId={id}/>,
        photos: (website, id) => <SixPhoto theme={theme6[0]} website={website} websiteId={id}/>,
        menu: (website, id) => <OneMenu theme={theme6[0]} website={website} websiteId={id}/>,
    },
};

export const templateList =  require('templateList');

export function getTemplates(){
    return templates;
}

export function getTemplate(key) {
    return templates[key]
}
