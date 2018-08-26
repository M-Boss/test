/**
 * Created by guy on 8/26/18.
 */
import React from 'react'
import {Button, Icon} from 'semantic-ui-react'

export default function({text, icon, onClick}){
    return <Button onClick={onClick} fluid className="bordered-button" basic color='orange' style={{padding: 18}}>
        <Icon name={icon} />
        {text}
    </Button>
}