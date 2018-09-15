/**
 * Created by guy on 9/14/18.
 */
import React from 'react'
import OneHome from './one/Home'
import OneHeader from './one/Header'
import OnePhoto from './one/Photos'


const templates = {
    1: {
        home:  website => <OneHome website={website}/>,
        header:  website => <OneHeader website={website}/>,
        photos:  website => <OnePhoto website={website}/>,
    }
};

export function getTemplate(key){
    return templates[key]
}