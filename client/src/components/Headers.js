/**
 * Created by guy on 8/21/18.
 */
import React, {Component} from 'react';

export function H1({children}){
    return <h1 style={{fontSize: 32}}>{children}</h1>
}

export function H2({children, style}){
    return <h2 style={{fontSize: 22, fontWeight: 400, ...style}}>{children}</h2>
}

export function H3({children, style}){
    return <h2 style={{fontSize: 18, fontWeight: 400, ...style}}>{children}</h2>
}