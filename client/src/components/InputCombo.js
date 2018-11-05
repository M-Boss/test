/**
 * Created by guy on 8/26/18.
 */
import React from 'react'
import {Button, Icon, Input} from 'semantic-ui-react'

export default function InputCombo({label, optional = false, onChange, value, style, placeholder = "", type = "input"}) {
    return <div style={{...style}}>
        <InputLabel>{label} {!optional && <Required/>} </InputLabel>
        <Input placeholder={placeholder} value={value} onChange={onChange} type={type} fluid/>
    </div>
}

function Required() {
    return <span style={{color: 'red', fontSize: 16}}>*</span>
}

function InputLabel({children}) {
    return <p style={{marginBottom: 4}}>{children}</p>
}
