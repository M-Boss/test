/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {Menu, Segment, Button, Form, Grid, Icon, Input, Label, Checkbox, TextArea, Select, Dimmer, Loader} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {H2} from "../components/Headers";
import Footer from "./Footer";
import {connect} from 'react-redux'
import BorderedButton from "../components/BorderedButton";
import Autocomplete from 'react-google-autocomplete';
import rest  from '../services/external/rest';
const {buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.addStoryClicked = this.addStoryClicked.bind(this);
        this.addStoryClicked = this.addStoryClicked.bind(this);
        this.addEventClicked = this.addEventClicked.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.addPhotoClicked = this.addPhotoClicked.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
        this.addFAQClicked = this.addFAQClicked.bind(this);
        this.removeFAQ = this.removeFAQ.bind(this);
        this.save = this.save.bind(this);

        this.rest = rest;
    }

    save(){
        this.setState({loading: true});
        rest.post('website/save', {
            website: this.props.website
        })
        .finally( () => {
            this.setState({loading: false});
        })
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
                        this.accordionPhotos(),
                        this.accordionFAQ(),
                        this.accordionSettings(),
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
                <Grid>
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

                <Button loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
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
                <File onUpload={r => this.changeHandler('template_main', true)(r.filename)}
                      rest={this.rest} url="website/upload?target=template_main"
                      name={this.props.website.template_main ? "Change Main Image" : "Upload Main Photo"} icon="camera"/>

                <Subtitle>Bottom Photo </Subtitle>
                <File onUpload={r => this.changeHandler('template_bottom', true)(r.filename)}
                      rest={this.rest} url="website/upload?target=template_bottom"
                      name={this.props.website.template_main ? "Change Bottom Image" : "Upload Bottom Photo"} icon="camera"/>

                <Button loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
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
                                value={this.props.website.date}
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
                            <Label  basic>#</Label>
                            <input onChange={this.changeHandler('hashtag')} value={this.props.website.hashtag} />
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
                    <Button loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
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

                <div style={{padding: 12, paddingTop: 20}}>
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


                {this.props.website.events.map((e, index) => {
                        let no = "First Event";
                        if (index === 1) no = "Second Event";
                        else if (index > 1) no = `Event #${index + 1}`

                        return (
                            <div>
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
                                        <div onClick={() => this.removeEvent(index)} style={{width: 80, paddingTop: 3}}>
                                            Remove
                                            <Icon name="delete"/></div>
                                    </div>

                                    <InputLabel>Event Type</InputLabel>
                                    <Select style={{flex: 1, display: 'flex'}}
                                            onChange={(e, {value}) => this.changeEventField(index, 'type', true)(value)}
                                            value={e.type}
                                            options={[{value: "Welcome Event", text: "Welcome Event"}]}/>

                                    <InputCombo style={{marginTop: 16}} onChange={this.changeEventField(index, 'title')}
                                                value={e.title}
                                                label='Event Name'/>

                                    <InputCombo style={{marginTop: 16}} type="date"
                                                onChange={this.changeEventField(index, 'date')}
                                                value={e.date}
                                                label='Date'/>

                                    <Grid style={{marginTop: 12}}>
                                        <Grid.Column width={8}>
                                            <InputLabel>Start Time <Required/></InputLabel>
                                            <TimePicker value={e.start_time}
                                                        onChange={(e, {value}) => this.changeEventField(index, 'start_time', true)(value)}/>
                                        </Grid.Column>

                                        <Grid.Column width={8}>
                                            <InputLabel>End Time</InputLabel>
                                            <TimePicker value={e.end_time}
                                                        onChange={(e, {value}) => this.changeEventField(index, 'end_time', true)(value)}/>
                                        </Grid.Column>
                                    </Grid>

                                    {!e.manual_address &&
                                    <div style={{marginTop: 16}}>
                                        <InputLabel >Venue</InputLabel>
                                        <Autocomplete
                                            style={{width: '100%', padding: 8, borderRadius: 4}}
                                            placeholder=""
                                            onPlaceSelected={(place) => {
                                                console.log(place);
                                                this.changeEventField(index, 'venue', true)(place.formatted_address)
                                            }}
                                            types={['establishment']}
                                            componentRestrictions={{country: "id"}}
                                        />
                                    </div>
                                    }

                                    {e.manual_address &&
                                    <InputCombo style={{marginTop: 16}} onChange={this.changeEventField(index, 'venue')}
                                                value={e.venue}
                                                optional
                                                label='Venue Name'/>}

                                    <div style={{
                                        color: '#21899A',
                                        padding: "8px 0",
                                        fontSize: 11
                                    }}
                                         onClick={() => this.changeEventField(index, 'manual_address', true)(!e.manual_address)}>
                                        <Icon name="arrow right"/>
                                        {!e.manual_address ? "Fill in address manually" : "Search for location"}
                                    </div>

                                    <React.Fragment>
                                        <InputCombo optional style={{marginTop: 16}}
                                                    onChange={this.changeEventField(index, 'street')}
                                                    value={e.street}
                                                    label='Street Address'/>

                                        <InputCombo optional style={{marginTop: 16}}
                                                    onChange={this.changeEventField(index, 'country')}
                                                    value={e.country}
                                                    label='Country'/>
                                        <InputCombo optional style={{marginTop: 16}}
                                                    onChange={this.changeEventField(index, 'city')}
                                                    value={e.city}
                                                    label='City'/>

                                        <Grid>
                                            <Grid.Column width={8}>
                                                <InputCombo optional style={{marginTop: 16}}
                                                            onChange={this.changeEventField(index, 'postal_code')}
                                                            value={e.postal_code}
                                                            label='Postal Code'/>
                                            </Grid.Column>

                                            <Grid.Column width={8}>
                                                <InputCombo optional style={{marginTop: 16}}
                                                            onChange={this.changeEventField(index, 'apartment')}
                                                            value={e.apartment}
                                                            label='Apt / Floor'/>
                                            </Grid.Column>
                                        </Grid>


                                    </React.Fragment>

                                    <InputCombo optional style={{marginTop: 16}}
                                                onChange={this.changeEventField(index, 'attire')}
                                                value={e.attire}
                                                label='Attire'/>

                                    <div style={{marginTop: 16}}>
                                        <InputLabel >Note to guests</InputLabel>
                                        <Form>
                                        <TextArea onChange={this.changeEventField(index, 'description')}
                                                  value={e.description} placeholder=''/>
                                        </Form>
                                    </div>

                                    <div style={{
                                        padding: 12,
                                        paddingTop: 20,
                                        paddingBottom: 20
                                    }}>
                                        <Switch label="Make event public on site"
                                                onChange={(e, {checked}) => this.changeEventField(index, 'public', true)(checked)}
                                                checked={e.public}/>

                                        <Switch label="Allow guests to RSVP on site"
                                                onChange={(e, {checked}) => this.changeEventField(index, 'rsvp', true)(checked)}
                                                checked={e.rsvp}
                                                style={{marginTop: 16}}/>
                                    </div>
                                </div>

                                <div style={{
                                    color: '#21899A',
                                    marginTop: 12,
                                    padding: 8,
                                    paddingTop: 16,
                                    paddingLeft: 12,
                                    borderTop: '1px solid #E0E6E7',
                                }}>
                                    <p style={{marginBottom: 4}}>Ask guests about meal preferences</p>
                                    {e.meals && e.meals.map((meal, mealIndex) =>
                                        <RemovableInput
                                            onChange={(e) => this.updateEventMeal(index, mealIndex, e.target.value)}
                                            placeholder="Vegetarian or chicken"
                                            style={{marginTop: 8}}
                                            onRemove={() => this.removeEventMeal(index, mealIndex)}/>
                                    )}
                                </div>

                                <div style={{
                                    color: '#21899A',
                                    padding: 8,
                                    paddingLeft: 12,
                                    fontSize: 11
                                }} onClick={() => this.addEventMeal(index)}>
                                    <Icon name="plus"/> Add a meal option
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
                }} onClick={this.addEventClicked}>
                    <Icon name="plus circle"/> Add Event
                </div>

                <div style={{padding: 12}}>
                    <Button style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
                </div>
            </div>
        }
    }

    accordionPhotos() {
        return {
            title: 'Photos',
            content: <div>

                <div style={{padding: 12, paddingTop: 20, paddingBottom: 20, borderBottom: '1px solid #E0E6E7'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={(e, {checked}) => this.changeHandler('show_photos', true)(checked)}
                                  toggle checked={this.props.website.show_photos}/>
                        <p style={{marginLeft: 16}}>Show Page</p>
                    </div>
                </div>

                <div style={{padding: 12, paddingTop: 20}}>
                    <InputCombo onChange={this.changeHandler('photos_page_title')}
                                value={this.props.website.photos_page_title}
                                label='Page Title'/>

                    <div style={{marginTop: 16}}>
                        <InputLabel >Description <Required/></InputLabel>
                        <Form>
                            <TextArea onChange={this.changeHandler('photos_description')}
                                      value={this.props.website.photos_description}
                                      placeholder=""/>
                        </Form>
                    </div>
                </div>

                {this.props.website.photos.map((item, index) => {
                        return (
                            <div style={{padding: 12}}>
                                <File name={`Photo #${index + 1}`} icon="camera"/>
                            </div>
                        )
                    }
                )}

                <div style={{
                    marginTop: 12,
                    padding: 8,
                    paddingLeft: 12,
                    border: '1px solid #E0E6E7',
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }} onClick={this.addPhotoClicked}>
                    <p style={{margin: 0, color: '#21899A', flex: 1}}><Icon name="plus circle"/> Add Photos</p>
                    <p style={{margin: 0, fontSize: 12}}>Max file size 5 MB</p>

                </div>

                <div style={{padding: 12}}>
                    <Button style={{marginTop: 24, marginBottom: 12}} primary fluid>Save</Button>
                </div>
            </div>
        }
    }

    accordionFAQ() {
        return {
            title: 'FAQs',
            content: <div>

                <div style={{padding: 12, paddingTop: 20, paddingBottom: 20, borderBottom: '1px solid #E0E6E7'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={(e, {checked}) => this.changeHandler('show_photos', true)(checked)}
                                  toggle checked={this.props.website.show_faqs}/>
                        <p style={{marginLeft: 16}}>Show Page</p>
                    </div>
                </div>

                <div style={{padding: 12, paddingTop: 20}}>
                    <InputCombo onChange={this.changeHandler('faqs_page_title')}
                                value={this.props.website.faqs_page_title}
                                label='Page Title'/>

                    <div style={{marginTop: 16}}>
                        <InputLabel >Description <Required/></InputLabel>
                        <Form>
                            <TextArea onChange={this.changeHandler('faqs_description')}
                                      value={this.props.website.faqs_description}
                                      placeholder=""/>
                        </Form>
                    </div>
                </div>

                {this.props.website.faqs.map((item, index) => {
                    let no = "First FAQ";
                    if (index === 1) no = "Second FAQ";
                    else if (index > 1) no = `FAQ #${index + 1}`

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
                                    <div onClick={() => this.removeFAQ(index)} style={{width: 80, paddingTop: 3}}>
                                        Remove
                                        <Icon name="delete"/></div>
                                </div>

                                <div style={{marginTop: 16}}>
                                    <InputCombo onChange={this.changeFAQField(index, 'question')}
                                                value={item.question}
                                                placeholder="Can I bring a date?"
                                                label='Question'/>

                                    <div style={{marginTop: 12}}>
                                        <InputLabel>Description <Required/></InputLabel>
                                        <Form>
                                        <TextArea onChange={this.changeFAQField(index, 'answer')}
                                                  value={item.answer}
                                                  placeholder="If your invitation says 'with guests' then yes..."/>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}

                <div style={{
                    marginTop: 12,
                    padding: 8,
                    paddingLeft: 12,
                    border: '1px solid #E0E6E7',
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }} onClick={this.addFAQClicked}>
                    <p style={{margin: 0, color: '#21899A', flex: 1}}><Icon name="plus circle"/> Add Question</p>
                </div>

            </div>
        }
    }

    accordionSettings() {
        return {
            title: 'Website Settings',
            content: <div style={{padding: 12, paddingTop: 0}}>

                <Subtitle>Website URL</Subtitle>
                <p>http://nikahku.com/james-and-jessie</p>

                <div style={{display: 'flex', alignItems: 'center', marginTop: 8}}>
                    <Checkbox onChange={(e, {checked}) => this.changeHandler('public', true)(checked)}
                              toggle checked={this.props.website.public}/>
                    <p style={{marginLeft: 16}}>Make publicly available</p>
                </div>
            </div>
        }
    }

    changeEventField(index, key, checkbox = false) {

        return (e) => {
            const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
            const val = checkbox ? e : e.target.value;
            let events = [...this.props.website.events];
            events[index][key] = val;
            this.props.dispatch(action(events))
        }
    }

    addEventClicked() {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
        const events = [...this.props.website.events, {meals: []}];
        this.props.dispatch(action(events));
    }

    removeEvent(index) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
        let events = [...this.props.website.events];
        events.splice(index, 1);
        this.props.dispatch(action(events));
    }

    addEventMeal(eventIndex) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
        let events = [...this.props.website.events];
        console.log()
        let meals = [...events[eventIndex].meals];
        meals.push("");
        events[eventIndex].meals = meals;
        this.props.dispatch(action(events));
    }

    removeEventMeal(eventIndex, mealIndex) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
        let events = [...this.props.website.events];
        console.log();
        let meals = [...events[eventIndex].meals];
        meals.splice(mealIndex, 1);
        events[eventIndex].meals = meals;
        this.props.dispatch(action(events));
    }

    updateEventMeal(eventIndex, mealIndex, text) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'events');
        let events = [...this.props.website.events];
        console.log();
        let meals = [...events[eventIndex].meals];
        meals[mealIndex] = text;
        events[eventIndex].meals = meals;
        this.props.dispatch(action(events));
    }

    addPhotoClicked() {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'photos');
        const items = [...this.props.website.photos, {uploaded: false}];
        this.props.dispatch(action(items));
    }

    removePhoto(index) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'photos');
        let items = [...this.props.website.photos];
        items.splice(index, 1);
        this.props.dispatch(action(items));
    }

    addFAQClicked() {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'faqs');
        const items = [...this.props.website.faqs, {question: "", answer: ""}];
        this.props.dispatch(action(items));
    }

    removeFAQ(index) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'faqs');
        let items = [...this.props.website.faqs];
        items.splice(index, 1);
        this.props.dispatch(action(items));
    }

    changeFAQField(index, key, checkbox = false) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'faqs');

        return (e) => {
            const val = checkbox ? e : e.target.value;
            let items = [...this.props.website.faqs];
            items[index][key] = val;
            this.props.dispatch(action(items))
        }
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

function RemovableInput({onChange, onRemove, value, style, placeholder = "", type = "input"}) {
    return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', ...style}}>
        <Input style={{flex: 1}} placeholder={placeholder} value={value} onChange={onChange} type={type} fluid/>
        <Icon onClick={onRemove} style={{paddingLeft: 10, paddingRight: 12}} name='remove'/>
    </div>
}

function Required() {
    return <span style={{color: 'red', fontSize: 16}}>*</span>
}

function TimePicker({onChange, value}) {
    const options = [
        {key: "pick", value: "", text: "pick"},
        {key: "24:00", value: "24:00", text: "24:00"},
        {key: "00:15", value: "00:15", text: "00:15"},
        {key: "00:30", value: "00:30", text: "00:30"},
        {key: "00:45", value: "00:45", text: "00:45"},
    ];

    for (let i = 1; i < 24; i++) {
        for (let j = 0; j <= 45; j += 15) {
            const s = ("" + i).padStart(2, "0") + ":" + ("" + j).padStart(2, "0");
            options.push({key: s, value: s, text: s});
        }
    }

    return (
        <Select onChange={onChange} value={value} options={options}/>
    )
}

function Switch({label, onChange, checked, style}) {
    return (<div style={{display: 'flex', alignItems: 'center', ...style}}>
        <Checkbox onChange={onChange}
                  toggle checked={checked}/>
        <p style={{marginLeft: 16}}>{label}</p>
    </div>)
}

class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 6
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
            filename: '',
            loading: false
        }
        this.rest = props.rest;
    }

    handleChange(files) {
        console.log('file selected: ', files);
        this.setState({
            filename: files[0]['name'],
            loading: true
        });
        this.rest.upload(this.props.url, files[0]).then(r => {
            console.log(r)
            this.props.onUpload(r);
        }).catch(e => {
            console.log("Error uploading: ", e)
        }).finally(() => {
            this.setState({loading: false})
        })
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
                {this.state.loading &&
                <Dimmer active>
                    <Loader />
                </Dimmer>}

                {!this.state.loading &&
                <input name="file" onChange={ (e) => this.handleChange(e.target.files) } ref={this.fileInput}
                       style={{opacity: 0, position: 'absolute', left: 0, top: 0, height: '100%', width: '100%'}}
                       className="custom-file-input" type="file"/>}
            </div>
        )
    }
}

export default connect(state => {
    return {
        website: state.website
    }
})(Website)
