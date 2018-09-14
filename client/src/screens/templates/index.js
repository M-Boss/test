/**
 * Created by guy on 9/14/18.
 */
import OneHome from './one/Home'
import OneHeader from './one/Header'
import React from 'react'

const templates = {
    1: {
        home:  website => <OneHome website={website}/>,
        header:  website => <OneHeader website={website}/>,
    }
};

export function getTemplate(key){
    return templates[key]
}