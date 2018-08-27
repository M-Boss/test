/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Icon, Input, Label, Checkbox} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {H2} from "../components/Headers";
import Footer from "./Footer";
import {connect} from 'react-redux'
import BorderedButton from "../components/BorderedButton";
const {buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        console.log(this.props.website);
        return (

            <div style={{backgroundColor: '#F4F7F9'}}>
                <p>Here: {this.props.website.bride_first}</p>

                <div style={{padding: 24}}>
                    <H2 style={{lineHeight: '22px', float: 'left'}}>Website creation</H2>
                    <div style={{color: '#BFCAD1', lineHeight: '24px', float: 'right'}}><Icon name='eye'/>Preview
                    </div>
                    <div style={{marginBottom: 10, clear: 'both'}}></div>

                    <Accordion items={[
                        this.accordionGeneral(),
                        this.accordionTemplate(),
                    ]}>
                    </Accordion>
                </div>

                <Footer/>
            </div>

        )
    }


    changeHandler(key, checkbox = false) {
        return (e) => {
            const websiteAttributeAction = buildActionForKey(actions.WEBSITE_RECORD, key);
            const val = checkbox ? e : e.target.value;
            this.props.dispatch(websiteAttributeAction(val))
        }
    }

    accordionGeneral() {
        return {
            title: 'General Information',
            content: <div>
                <Subtitle>Bride</Subtitle>
                <Grid >
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('bride_first')} value={this.props.website.bride_first}
                                    label='First Name'/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('bride_last')} value={this.props.website.bride_last}
                                    label='Last Name'/>
                    </Grid.Column>
                </Grid>

                <Subtitle>Groom</Subtitle>
                <Grid >
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('groom_first')} value={this.props.website.groom_first}
                                    label='First Name'/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('groom_last')} value={this.props.website.groom_last}
                                    label='Last Name'/>
                    </Grid.Column>
                </Grid>

                <Checkbox checked={this.props.website.show_parents}
                          onChange={(e, {checked}) => this.changeHandler('show_parents', true)(checked)}
                          style={{marginTop: 20}} label="Show parents' names on website"/>

                {this.props.website.show_parents &&
                <React.Fragment>
                    <Subtitle>Bride</Subtitle>
                    <Grid >
                        <Grid.Column width={8}>
                            <InputCombo optional={true} onChange={this.changeHandler('bride_father')} value={this.props.website.bride_father}
                                        label="Father's Name"/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <InputCombo optional onChange={this.changeHandler('bride_mother')} value={this.props.website.bride_mother}
                                        label="Mother's Name"/>
                        </Grid.Column>
                    </Grid>

                    <Subtitle>Groom</Subtitle>
                    <Grid >
                        <Grid.Column width={8}>
                            <InputCombo optional onChange={this.changeHandler('groom_father')} value={this.props.website.groom_father}
                                        label="Father's Name"/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <InputCombo optional onChange={this.changeHandler('groom_mother')} value={this.props.website.groom_mother}
                                        label="Mother's Name"/>
                        </Grid.Column>
                    </Grid>
                </React.Fragment>
                }

                <Button style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
            </div>
        }
    }

    accordionTemplate() {


        return {
            title: 'Choose Template',
            content: <div style={{paddingBottom: 10}}>
                <Subtitle>Template <Required /> </Subtitle>
                <Link to="/choose_template">
                    {this.props.website.template === 0 ?
                        <BorderedButton text="Choose Template" icon="file text outline"/>
                        :
                        <div style={{}}>
                            <img style={{width: '100%'}} src={require('../static/images/template-01.jpg')}
                                 alt={"Selected template"}/>
                        </div>
                    }
                </Link>

                <Subtitle>Main Photo <Required /> </Subtitle>
                <BorderedButton text="Upload Main Photo" icon="camera" />


                <Subtitle>Bottom Photo </Subtitle>
                <File name="Upload Bottom Photo" icon="camera" />

            </div>
        }
    }
}

function InputLabel({children}) {
    return <p style={{marginBottom: 4}}>{children}</p>
}
function Subtitle({children}) {
    return <p style={{fontSize: 17, color: '#AEB9C0', marginBottom: 8, marginTop: 24}}>{children}</p>
}
function InputCombo({label, optional = false, onChange, value}) {
    return <React.Fragment>
        <InputLabel>{label} {!optional && <Required/>} </InputLabel>
        <Input value={value} onChange={onChange} fluid/>
    </React.Fragment>
}
function Required() {
    return <span style={{color: 'red', fontSize: 16}}>*</span>
}

class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }


    render() {
        const selectedStyle = {
            border: 'solid',
            borderWidth: 1,
            borderColor: '#E0E6E7',
            borderRadius: 4,
            overflow: 'hidden'
        };

        return this.props.items.map(({title, content}, index) => {

            const current = index === this.state.index;

            return (
                <div style={{marginBottom: 8, userSelect: 'none', ...(current ? selectedStyle : {})}}>
                    <div onClick={() => this.onHeaderClicked(index)} style={{padding: 12, backgroundColor: '#FFF'}}>
                        <p style={{fontSize: 18, margin: 0, lineHeight: '40px', float: 'left'}}>{title}</p>
                        <Icon style={{lineHeight: '40px', float: 'right'}} name={current ? 'angle up' : 'angle down'}/>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    {this.state.index === index &&
                    <div style={{
                        backgroundColor: '#FFF',
                        padding: 12,
                        paddingTop: 0,
                        border: 'solid',
                        borderWidth: 0,
                        borderTopWidth: 1,
                        borderColor: '#E0E6E7'
                    }}>{content}</div>
                    }
                </div>
            )
        })
    }

    onHeaderClicked(index) {
        this.setState({
            index: this.state.index === index ? -1 : index
        })
    }
}

class File extends Component{

    constructor(props){
        super(props);
        this.file = React.createRef();
        this.state = {
            filename: ''
        }
    }


    handleChange(files){
        console.log('change: ', files);
        this.setState({filename: files[0]['name']})
    }

    render(){
        console.log('File: ', this.file);
        return (
            <div style={{padding: 15, position: 'relative', backgroundColor: '#fafafb', border: '1px solid', borderRadius: 5,  borderColor: '#f2711c'}}>
                <p style={{fontSize: '1 rem', textAlign: 'center', color: '#f2711c', flex: 1, margin: 0}}><Icon name="camera"/>  {this.state.filename || this.props.name}</p>
                <input onChange={ (e) => this.handleChange(e.target.files) }  ref={this.fileInput} style={{opacity: 0, position: 'absolute', left: 0, top: 0, height: '100%', width: '100%'}} className="custom-file-input" type="file" />
            </div>
        )
    }
}

export default connect(state => {
    return {
        website: state.website
    }
})(Website)
