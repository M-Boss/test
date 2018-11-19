/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon, Checkbox} from 'semantic-ui-react'
import Slider from "react-slick";
import Footer from "./Footer";
import Header from "./Header";
import {H1, H2, H3} from "../components/Headers";
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import rest  from '../services/external/rest';
import container from '../services'
import {t} from '../translations'
const {buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const {templateList} = require('./templates/index');

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            choosingVariation: false,
            selectedTemplateIndex: 0
        };
    }

    onTemplateSelected(t) {
        const template = templateList[t];
        this.setState({
            selectedTemplateIndex: t,
            choosingVariation: true
        });
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'template');
        this.props.dispatch(action(template.variations[0].id));
    }

    onVariationSelected(v) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'template');
        this.props.dispatch(action(v.id));

        setTimeout(() => {
            this.save()
        }, 1000)
    }

    save() {
        rest.post('website/save', {
            website: this.props.website
        })
    }

    render() {
        return (<React.Fragment>
                <Header />

                <div style={{padding: 16, backgroundColor: '#F4F7F9'}}>
                    {!this.state.choosingVariation &&
                    <Link onClick={() => this.save()} to="/create">
                        <p><Icon name="long arrow alternate left"/> Back</p>
                    </Link>}

                    {this.state.choosingVariation &&
                    <a style={{cursor: 'pointer'}} onClick={() => this.setState({choosingVariation: false})} >
                        <p><Icon name="long arrow alternate left"/> Back</p>
                    </a>}

                    {!this.state.choosingVariation && <React.Fragment>
                        <H3>Templates </H3>
                        {templateList.map((t, index) => {
                            const current = t.id === this.props.website.template;
                            const first = t.variations[0];
                            return (
                                <div onClick={() => this.onTemplateSelected(index)}
                                     style={{backgroundColor: 'white', marginBottom: 20}}>
                                    <div
                                        style={{padding: 20, paddingBottom: 16, alignItems: 'center', display: 'flex'}}>
                                        {current ? <Checkbox style={{marginRight: 8}} checked readOnly/> : null}
                                        <span > {t.name}</span>
                                        <div style={{
                                            textAlign: 'right',
                                            flex: 1,
                                            color: '#444'
                                        }}>{t.variations.length} {t.variations.length > 1 ? 'colors' : 'color'}</div>
                                    </div>
                                    <div style={{paddingLeft: 20, paddingRight: 20}}>
                                        <img style={{width: '100%'}}
                                             src={require('../static/images/templates/template-' + first.id + '.jpg')}
                                             alt={"Template: " + t.name}/>
                                    </div>
                                </div>
                            )
                        })}
                    </React.Fragment>}


                    {this.state.choosingVariation && this.renderVariations()}


                </div>
            </React.Fragment>
        )
    }

    renderVariations() {
        const template = templateList[this.state.selectedTemplateIndex];
        return (
            <React.Fragment>
                <H3>{template.name}</H3>
                <div style={{backgroundColor: 'white', marginBottom: 20}}>
                    <div style={{padding: 20, paddingBottom: 16, alignItems: 'center', display: 'flex'}}>
                        <span >Warna</span>
                    </div>
                    <div style={{padding: 20, display: 'flex', flexWrap: 'wrap'}}>
                        {template.variations.map((v, index) => {
                            return <Color selected={v.id === this.props.website.template}
                                          tooltip={v.id}
                                          onClick={() => this.onVariationSelected(v)}
                                          primary={v.theme.primary} secondary={v.theme.secondary}/>
                        })}
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20}}>
                        <img style={{width: '100%'}}
                             src={require('../static/images/templates/template-' + this.props.website.template + '.jpg')}
                             alt={"Template: " + template.name}/>
                    </div>
                    <div style={{padding: 20}}>
                        <a target="_blank" href={`/wedding/__demo__${this.props.website.template}`} >
                            <Button icon
                                    labelPosition='left'
                                    size='small'>
                                <Icon name='eye'/> {t("Preview")}
                            </Button>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function Color({primary, secondary, onClick, selected, tooltip}) {
    return (
        <div title={tooltip} style={{
            border: '1px solid #888',
            padding: 2,
            borderRadius: '50%',
            marginRight: 10,
            backgroundColor: selected ? '#F99' : '#FFF'
        }} onClick={onClick}>
            <div style={{
                transform: 'rotate(-45deg)',
                border: '1px solid #888',
                overflow: 'hidden',
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{flex: 1, backgroundColor: primary}}></div>
                <div style={{flex: 1, backgroundColor: secondary}}></div>
            </div>
        </div>
    )
}

export default connect(state => {
    return {
        website: state.website
    }
})(Screen)
