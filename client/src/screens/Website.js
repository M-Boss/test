/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Icon, Input, Label, Checkbox, TextArea} from 'semantic-ui-react'
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
        this.state = {};
        this.addStoryClicked = this.addStoryClicked.bind(this);
        this.addStoryClicked = this.addStoryClicked.bind(this);
        this.addEventClicked = this.addEventClicked.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }

    render() {
        console.log(this.props.website);
        return (
            <div style={{backgroundColor: '#F4F7F9'}}>
                <div style={{padding: 24}}>
                    <H2 style={{lineHeight: '22px', float: 'left'}}>Website creation</H2>
                    <div style={{color: '#BFCAD1', lineHeight: '24px', float: 'right'}}><Icon name='eye'/>Preview
                    </div>
                    <div style={{marginBottom: 10, clear: 'both'}}></div>
                    <Accordion items={[
                        this.accordionGeneral(),
                        this.accordionTemplate(),
                        this.accordionDetails(),
                        this.accordionEvents(),
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

    changeStoryField(storyIndex, key) {
        return (e) => {
            const action = buildActionForKey(actions.WEBSITE_RECORD, 'stories');
            const val = e.target.value;
            let stories = [...this.props.website.stories];
            stories[storyIndex][key] = val;
            this.props.dispatch(action(stories))
        }
    }


    accordionGeneral() {
        return {
            title: 'General Information',
            content: <div style={{padding: 12, paddingTop: 0}}>
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
                            <InputCombo optional={true} onChange={this.changeHandler('bride_father')}
                                        value={this.props.website.bride_father}
                                        label="Father's Name"/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <InputCombo optional onChange={this.changeHandler('bride_mother')}
                                        value={this.props.website.bride_mother}
                                        label="Mother's Name"/>
                        </Grid.Column>
                    </Grid>

                    <Subtitle>Groom</Subtitle>
                    <Grid >
                        <Grid.Column width={8}>
                            <InputCombo optional onChange={this.changeHandler('groom_father')}
                                        value={this.props.website.groom_father}
                                        label="Father's Name"/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <InputCombo optional onChange={this.changeHandler('groom_mother')}
                                        value={this.props.website.groom_mother}
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
            content: <div style={{padding: 12, paddingTop: 0, paddingBottom: 10}}>
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
                <File name="Upload Main Photo" icon="camera"/>

                <Subtitle>Bottom Photo </Subtitle>
                <File name="Upload Bottom Photo" icon="camera"/>
            </div>
        }
    }

    accordionDetails() {
        return {
            title: 'Wedding Details',
            content: <div>

                <div style={{padding: 12, paddingTop: 20}}>

                    <InputCombo onChange={this.changeHandler('title')} value={this.props.website.title}
                                label='Title'/>

                    <InputCombo style={{marginTop: 16}} type="date" onChange={this.changeHandler('date')}
                                value={this.props.website.title}
                                label='Date'/>

                    <Grid style={{marginTop: 12}}>
                        <Grid.Column width={8}>
                            <InputCombo onChange={this.changeHandler('country')} value={this.props.website.country}
                                        label='Country'/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <InputCombo onChange={this.changeHandler('city')} value={this.props.website.city}
                                        label='City'/>
                        </Grid.Column>
                    </Grid>

                    <div style={{marginTop: 16}}>
                        <InputLabel >Instagram Hashtag</InputLabel>
                        <Input style={{width: '100%'}} labelPosition='left' type='text' placeholder='AnythingForLove'>
                            <Label basic>#</Label>
                            <input />
                        </Input>
                    </div>
                </div>


                {this.props.website.stories.map((s, index) => {
                        let storyNumber = "First Story";
                        if (index === 1) storyNumber = "Second Story";
                        else if (index > 1) storyNumber = `Story #${index + 1}`

                        return (
                            <div key={index} style={{
                                color: '#21899A',
                                marginTop: 12,
                                padding: 12,
                                paddingTop: 0,
                                borderTop: '1px solid #E0E6E7',
                            }}>
                                <div style={{
                                    paddingTop: 16,
                                    paddingBottom: 16,
                                    display: "flex",
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Subtitle style={{margin: 0, flex: 1}}>{storyNumber}</Subtitle>
                                    <div onClick={() => this.removeStory(index)} style={{width: 80, paddingTop: 3}}>Remove
                                        <Icon name="delete"/></div>
                                </div>

                                <InputCombo onChange={this.changeStoryField(index, 'title')} value={s.title}
                                            label='Title' placeholder="Our first date"/>

                                <InputCombo style={{marginTop: 16}} type="date"
                                            onChange={this.changeStoryField(index, 'date')}
                                            value={s.date}
                                            label='Date' optional/>

                                <div style={{marginTop: 16}}>
                                    <InputLabel >Description <Required/></InputLabel>
                                    <Form>
                                        <TextArea onChange={this.changeStoryField(index, 'description')}
                                                  value={s.description} placeholder='Tell us about it'/>
                                    </Form>
                                </div>
                            </div>
                        )
                    }
                )}


                <div style={{
                    color: '#21899A',
                    marginTop: 12,
                    padding: 8,
                    paddingLeft: 12,
                    border: '1px solid #E0E6E7',
                    borderLeftWidth: 0,
                    borderRightWidth: 0
                }} onClick={this.addStoryClicked}>
                    <Icon name="plus circle"/> Add Story
                </div>

                <div style={{padding: 12}}>
                    <Button style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
                </div>
            </div>
        }
    }

    addStoryClicked() {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'stories');
        const stories = [...this.props.website.stories, {title: "", date: "", description: ""}];
        this.props.dispatch(action(stories));
    }

    removeStory(index) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'stories');
        let stories = [...this.props.website.stories];
        stories.splice(index, 1);
        this.props.dispatch(action(stories));
    }

    accordionEvents() {
        return {
            title: 'Events',
            content: <div>

                <div style={{padding: 12, paddingTop: 20, paddingBottom: 20, borderBottom: '1px solid #E0E6E7'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={(e, {checked}) => this.changeHandler('show_events', true)(checked)}
                                  toggle checked={this.props.website.show_events}/>
                        <p style={{marginLeft: 16}}>Show Page</p>
                    </div>
                </div>

                <div style={{padding: 12, paddingTop: 20, borderBottom: '1px solid #F5f5f5'}}>
                    <InputCombo onChange={this.changeHandler('events_page_title')}
                                value={this.props.website.events_page_title}
                                label='Page Title'/>

                    <div style={{marginTop: 16}}>
                        <InputLabel >Description <Required/></InputLabel>
                        <Form>
                            <TextArea onChange={this.changeHandler('events_description')}
                                      value={this.props.website.events_description}
                                      placeholder="Here's what to expect during our big day"/>
                        </Form>
                    </div>
                </div>


                {this.props.website.events.map((s, index) => {
                        let no = "First Event";
                        if (index === 1) no = "Second Event";
                        else if (index > 1) no = `Event #${index + 1}`

                        return (
                            <div key={index} style={{
                                color: '#21899A',
                                marginTop: 12,
                                padding: 12,
                                paddingTop: 0,
                                borderTop: '1px solid #E0E6E7',
                            }}>
                                <div style={{
                                    paddingTop: 16,
                                    paddingBottom: 16,
                                    display: "flex",
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Subtitle style={{margin: 0, flex: 1}}>{no}</Subtitle>
                                    <div onClick={() => this.removeEvent(index)} style={{width: 80, paddingTop: 3}}>Remove
                                        <Icon name="delete"/></div>
                                </div>

                                <InputCombo onChange={this.changeStoryField(index, 'title')} value={s.title}
                                            label='Event Type' placeholder="Welcome Event"/>

                                {/*<div style={{marginTop: 16}}>*/}
                                    {/*<InputLabel >Event Type</InputLabel>*/}
                                {/*</div>*/}

                                <InputCombo style={{marginTop: 16}} onChange={this.changeStoryField(index, 'title')} value={s.title}
                                            label='Event Name' placeholder=""/>

                                <InputCombo style={{marginTop: 16}} type="date" onChange={this.changeHandler('date')}
                                            value={this.props.website.title}
                                            label='Date'/>

                            </div>
                        )
                    }
                )}


                <div style={{
                    color: '#21899A',
                    marginTop: 12,
                    padding: 8,
                    paddingLeft: 12,
                    border: '1px solid #E0E6E7',
                    borderLeftWidth: 0,
                    borderRightWidth: 0
                }} onClick={this.addEventClicked}>
                    <Icon name="plus circle"/> Add Event
                </div>


                <div style={{padding: 12}}>
                    <Button style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
                </div>
            </div>
        }
    }

    addEventClicked() {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
        const events = [...this.props.website.events, {}];
        this.props.dispatch(action(events));
    }

    removeEvent(index) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
        let events = [...this.props.website.events];
        events.splice(index, 1);
        this.props.dispatch(action(events));
    }
}

function InputLabel({children}) {
    return <p style={{marginBottom: 4}}>{children}</p>
}
function Subtitle({children, style}) {
    return <p style={{fontSize: 17, color: '#AEB9C0', marginBottom: 8, marginTop: 24, ...style}}>{children}</p>
}
function InputCombo({label, optional = false, onChange, value, style, placeholder = "", type = "input"}) {
    return <div style={{...style}}>
        <InputLabel>{label} {!optional && <Required/>} </InputLabel>
        <Input placeholder={placeholder} value={value} onChange={onChange} type={type} fluid/>
    </div>
}
function Required() {
    return <span style={{color: 'red', fontSize: 16}}>*</span>
}

class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 3
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
                <div key={index} style={{marginBottom: 8, userSelect: 'none', ...(current ? selectedStyle : {})}}>
                    <div onClick={() => this.onHeaderClicked(index)} style={{padding: 12, backgroundColor: '#FFF'}}>
                        <p style={{fontSize: 18, margin: 0, lineHeight: '40px', float: 'left'}}>{title}</p>
                        <Icon style={{lineHeight: '40px', float: 'right'}} name={current ? 'angle up' : 'angle down'}/>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    {this.state.index === index &&
                    <div style={{
                        backgroundColor: '#FFF',
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

class File extends Component {

    constructor(props) {
        super(props);
        this.file = React.createRef();
        this.state = {
            filename: ''
        }
    }

    handleChange(files) {
        console.log('change: ', files);
        this.setState({filename: files[0]['name']})
    }

    render() {
        console.log('File: ', this.file);
        return (
            <div style={{
                padding: 15,
                position: 'relative',
                backgroundColor: '#fafafb',
                border: '1px solid',
                borderRadius: 5,
                borderColor: '#f2711c'
            }}>
                <p style={{fontSize: '1 rem', textAlign: 'center', color: '#f2711c', flex: 1, margin: 0}}><Icon
                    name="camera"/> {this.state.filename || this.props.name}</p>
                <input onChange={ (e) => this.handleChange(e.target.files) } ref={this.fileInput}
                       style={{opacity: 0, position: 'absolute', left: 0, top: 0, height: '100%', width: '100%'}}
                       className="custom-file-input" type="file"/>
            </div>
        )
    }
}

export default connect(state => {
    return {
        website: state.website
    }
})(Website)
