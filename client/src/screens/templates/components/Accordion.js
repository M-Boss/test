/**
 * Created by guy on 10/8/18.
 */

import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'

export default class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.startingIndex || 0,
            section_open: {
                0: true
            }
        }
    }

    render() {
        console.log(this.state)
        const selectedStyle = {
            border: 'solid',
            borderWidth: 1,
            borderColor: this.props.borderColor || '#E0E6E7',
            borderRadius: this.props.radius || 4,
            overflow: 'hidden'
        };

        return this.props.items.map(({title, content, questionColor = "#f3f5f8", textColor = this.props.textColor || '#222'}, index) => {

            // const current = index === this.state.index;
            const current = this.state.section_open[index];
            return (
                <div key={index} style={{marginBottom: 8, userSelect: 'none', ...(current ? selectedStyle : {})}}>
                    <div onClick={() => this.onHeaderClicked(index)}
                         style={{padding: 12, backgroundColor: this.props.answerBackgroundColor || questionColor}}>
                        <p style={{color: textColor, fontSize: 16, margin: 0, lineHeight: '40px', float: 'left'}}>
                            {title}
                        </p>
                        <Icon style={{lineHeight: '40px', float: 'right'}} name={current ? 'angle up' : 'angle down'}/>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    {current &&
                    <div style={{
                        backgroundColor: this.props.answerBackgroundColor || '#FFF',
                        paddingTop: 0,
                        border: 'solid',
                        borderWidth: 0,
                        borderTopWidth: 1,
                        borderColor: '#E0E6E7',
                        color: this.props.answerColor || 'inherit'
                    }}>{content}</div>
                    }
                </div>
            )
        })
    }

    onHeaderClicked(index) {
        this.setState({
            index: this.state.index === index ? -1 : index,
            section_open: {
                ...this.state.section_open,
                [index]: !this.state.section_open[index]
            }
        })
    }
}
