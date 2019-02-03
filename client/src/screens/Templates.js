/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Menu, Segment, Button, Form, Grid, Input, Image, Icon, Checkbox, Dimmer, Loader} from 'semantic-ui-react'
import Slider from "react-slick";
import Footer from "./Footer";
import Header from "./Header";
import {H1, H2, H3} from "../components/Headers";
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import rest  from '../services/external/rest';
import container from '../services'
import {t} from '../translations'
import _ from 'lodash'
const {buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const {templateList} = require('./templates/templateList');

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            choosingVariation: false,
            selectedTemplateIndex: 0,
            loading: true
        };
    }

    async componentDidMount(){
        try {
            this.setState({loading: true});
            const user = await rest.post('user/authenticate');

            if(!user) return;
            const userAction = buildActionForKey(actions.USER_RECORD, 'has_access_to_premium_template');
            this.props.dispatch(userAction(_.get(user, 'user.has_access_to_premium_template')));
        }
        catch (e) {
            console.log(e);
            return false;
        }
        finally {
            this.setState({loading: false});
        }
    }

    onTemplateSelected(t) {
        const template = templateList[t];
        this.setState({
            selectedTemplateIndex: t,
            selectedVariation: 0,
            choosingVariation: true
        });

        // const action = buildActionForKey(actions.WEBSITE_RECORD, 'template');
        // this.props.dispatch(action(template.variations[0].id));

        setTimeout(() => {
            this.onVariationSelected(template.variations[0]);
        }, 300);
    }

    onVariationSelected(v) {
        const isPremiumUser = _.get(this.props, 'user.has_access_to_premium_template');
        const template = templateList[this.state.selectedTemplateIndex];
        const isPremiumTemplate = _.get(template, 'premium');

        console.log("onVariationSelected() TemplateIndex: ", this.state.selectedTemplateIndex);
        // if(isPremiumTemplate && !isPremiumUser){
        //     alert("This is a premium template.");
        //     return;
        // }

        this.setState({
            selectedVariation: v.id
        });

        this.getPreviewURL(v.id);
    }

    save() {
        const variationId = _.get(this.state, 'selectedVariation');
        if(!variationId) return;

        const action = buildActionForKey(actions.WEBSITE_RECORD, 'template');
        this.props.dispatch(action(variationId));
        rest.post('website/save', {
            website: this.props.website
        })
    }

    render() {
        const isPremiumUser = _.get(this.props, 'user.has_access_to_premium_template');

        return (<React.Fragment>
                <Header />

            {this.state.loading && <div>
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>
            </div>}

            {<div style={{padding: 16, backgroundColor: '#F4F7F9'}}>
                    {!this.state.choosingVariation &&
                    <Link onClick={() => this.save()} to="/create">
                        <p><Icon name="long arrow alternate left"/> {t("Back")}</p>
                    </Link>}

                    {this.state.choosingVariation &&
                    <a style={{cursor: 'pointer'}} onClick={() => this.setState({choosingVariation: false})} >
                        <p><Icon name="long arrow alternate left"/> {t("Back")}</p>
                    </a>}

                    {!this.state.choosingVariation && <React.Fragment>
                        <H3>Templates </H3>
                        {templateList.map((t, index) => {
                            const selectedVariationId = _.get(this.props, 'website.template');
                            let current = _.get(t, 'variations', []).reduce((accum, variation) => accum || variation.id === selectedVariationId, false);
                            if(!selectedVariationId && index === 0 ) current =  true;
                            const first = t.variations[0];
                            return (
                                <div onClick={() => this.onTemplateSelected(index)}
                                     style={{backgroundColor: 'white', marginBottom: 20}}>
                                    <div
                                        style={{padding: 20, paddingBottom: 16, alignItems: 'center', display: 'flex'}}>
                                        {current ? <Checkbox style={{marginRight: 8}} checked readOnly/> : null}
                                        <span > {t.name}</span>
                                        {!!t.premium && <div style={{paddingLeft: 4}}>
                                            {isPremiumUser ? <Icon style={{color: '#4ecab0'}} name='unlock' /> : <Icon name='lock' />}
                                        </div>}
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
                }
            </React.Fragment>
        )
    }

    async getPreviewURL(templateID){
        this.setState({loading: true});
        try{
            const r = await rest.get('template-preview/' + templateID);
            const url = _.get(r, 'url');

            this.setState({
                url,
                loading: false
            });
        }
        catch (e){
            this.setState({loading: false});
        }
    }

    renderVariations() {
        const template = templateList[this.state.selectedTemplateIndex];
        const isPremiumUser = _.get(this.props, 'user.has_access_to_premium_template');
        const selectedVariation = this.state.selectedVariation;
        const newVariationSelected = selectedVariation && selectedVariation !== _.get(this, 'props.website.template')

        return (
            <React.Fragment>
                <H3>{template.name}</H3>
                <div style={{backgroundColor: 'white', marginBottom: 20}}>
                    <div style={{padding: 20, paddingBottom: 16, alignItems: 'center', display: 'flex'}}>
                        <span style={{flex: 1, fontSize: 11}}>{_.get(template, 'name')}</span>
                        {/*<div >
                            {!isPremiumUser && <Link to='/premium-templates'><Button primary><Icon name='unlock'/> Unlock all templates</Button></Link>}
                        </div>*/}
                        <div style={{height: 32}}>
                            {newVariationSelected && <Button primary onClick={() => this.save()}>Pilih Templat Ini</Button>}
                        </div>
                    </div>
                    <div style={{padding: 20, display: 'flex', flexWrap: 'wrap'}}>
                        {template.variations.map((v, index) => {
                            return <Color selected={v.id === selectedVariation}
                                          tooltip={v.id}
                                          onClick={() => this.onVariationSelected(v)}
                                          primary={v.theme.primary} secondary={v.theme.secondary}/>
                        })}
                    </div>
                    <div style={{paddingLeft: 20, paddingRight: 20}}>
                        {selectedVariation ?
                        <img style={{width: '100%'}}
                             src={require('../static/images/templates/template-' + selectedVariation + '.jpg')}
                             alt={"Template: " + template.name}/>
                            : null}
                    </div>

                    {!this.state.loading && <div style={{padding: 20}}>
                        <a target="_blank" href={this.state.url} >
                            <Button disabled={!this.state.url} icon
                                    labelPosition='left'
                                    size='small'>
                                <Icon name='eye'/> {this.state.url ? t("Preview") : t("No Preview Available")}
                            </Button>
                        </a>
                    </div>}
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
        website: state.website,
        user: state.user
    }
})(Screen)
