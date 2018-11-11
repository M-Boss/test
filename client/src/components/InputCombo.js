/**
 * Created by guy on 8/26/18.
 */
import React from 'react'
import {Button, Icon, Input} from 'semantic-ui-react'

export default function InputCombo({label, disabled, optional = false, onChange, value, style, placeholder = "", type = "input"}) {
    return <div style={{...style}}>
        <InputLabel color={!disabled ? "#222" : "#DDD"}>{label} {!optional && <Required/>} </InputLabel>
        <Input disabled={disabled} placeholder={placeholder} value={value} onChange={onChange} type={type} fluid/>
    </div>
}

function Required() {
    return <span style={{color: 'red', fontSize: 16}}>*</span>
}

export function InputLabel({children, color}) {
    return <p style={{marginBottom: 4, color}}>{children}</p>
}
