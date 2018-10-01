/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {
    Menu,
    Segment,
    Button as SemanticButton,
    Form,
    Grid,
    Icon,
    Input,
    Label,
    Checkbox,
    TextArea,
    Select,
    Dimmer,
    Loader,
    Message
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {H2} from "../components/Headers";
import Footer from "./Footer";
import {connect} from 'react-redux'
import BorderedButton from "../components/BorderedButton";
import Autocomplete from 'react-google-autocomplete';
import rest  from '../services/external/rest';
import Header from "./Header";
import DatePicker from 'react-datepicker';
import {t} from '../translations'

const moment = require('moment');
const NotificationSystem = require('react-notification-system');

const {buildAction, buildActionForKey} = require('../services/internal/store/DefaultReducer');
const actions = require('../services/internal/store/actionConstants');
const _ = require("lodash");
const validator = require('../services/internal/validations');


moment.locale('id', {
        months: 'Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember'.split(' ')
    }
);
moment.locale('id');


function Button(props){
    console.log("Changed: ", props);
    return <SemanticButton {...props} disabled={props.notchanged}>{props.notchanged ? "Saved" : props.children}</SemanticButton>
}

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            changed: false
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
        this.firstAccordionSection = this.getAccordionSectionIndex(props.location.hash);

        this.state.justActivated = _.get(props, "location.hash", "").substring(1) === 'activated';
        if(this.state.justActivated){
            props.dispatch(buildActionForKey(actions.USER_RECORD, 'active')(1))
        }
        setTimeout( ()=> {
            this.setState({justActivated: false})
        }, 2000)
    }

    getAccordionSectionIndex(hash) {
        if (!hash) return 0;
        const index = validator.getKeys().indexOf(hash.substring(1));
        return index >= 0 ? index : 0;
    }

    componentWillReceiveProps(nextProps) {
        // if(JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)) // Check if it's a new user, you can also use some unique property, like the ID
        // {
        //     this.updateUser();
        // }
        console.log("Change detected");
        if(!this.state.changed){
            this.setState({changed: true})
        }
    }

    save() {
        this.setState({
            loading: true});
        rest.post('website/save', {
            website: this.props.website
        }).then(r => {
            const website = _.get(r, "website");
            if (website) {
                const action = buildAction(actions.WEBSITE_RECORD);
                this.props.dispatch(action(website))
            }
        })
            .finally(() => {
                this.setState({
                    loading: false,
                    changed: false
                });
            })
    }

    render() {
        return (
            <React.Fragment>
                <Header />

                {this.state.justActivated &&
                <Message success>
                    <Message.Header>Email validated</Message.Header>
                </Message>}

                {this.accountNotValidated() && <Message negative>
                    <Message.Header>Your email is not validated yet</Message.Header>
                    <p>You need to verify your email to publish your website</p>
                    {/*<a>Resend validation email</a>*/}
                </Message>}


                <div style={{backgroundColor: '#F4F7F9'}}>
                    <div style={{padding: 24}}>

                        <Link to="/dashboard">
                            <p><Icon name="long arrow alternate left"/> Back</p>
                        </Link>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginBottom: 20
                        }}>
                            <H2 style={{flex: 1, margin: 0, lineHeight: '22px', float: 'left'}}>{t("Website Creation")}</H2>
                            {this.props.website.url && !this.accountNotValidated() &&
                            <a target="_blank" href={this.props.website.url}>
                                <div style={{color: '#BFCAD1', lineHeight: '24px'}}>
                                    <Icon name='eye'/>Preview
                                </div>
                            </a>}
                        </div>

                        <Accordion startingIndex={this.firstAccordionSection}
                                   isValid={key => validator.isValid(key, this.props.website)} index={0}
                                   onIndexChanged={index => {
                                   }} items={[
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
            </React.Fragment>
        )
    }

    accountNotValidated(){
        return this.props.user && !this.props.user.active;
    }

    componentDidMount() {
        if (!this.props.user.token) {
            this.props.history.push('/login')
        }
    }

    changeHandler(key, checkbox = false) {
        return (e) => {
            const websiteAttributeAction = buildActionForKey(actions.WEBSITE_RECORD, key);
            const val = checkbox ? e : e.target.value;
            this.props.dispatch(websiteAttributeAction(val))
        }
    }

    changeStoryField(storyIndex, key, direct = false) {
        return (e) => {
            const action = buildActionForKey(actions.WEBSITE_RECORD, 'stories');
            const val = direct ? e : e.target.value;
            let stories = [...this.props.website.stories];
            stories[storyIndex][key] = val;
            this.props.dispatch(action(stories))
        }
    }

    accordionGeneral() {
        return {
            validation: 'general',
            title: 'General Information',
            content: <div style={{padding: 12, paddingTop: 0}}>
                <Subtitle>{t("Bride")}</Subtitle>
                <Grid>
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('bride_first')} value={this.props.website.bride_first}
                                    label={t("First name")}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('bride_last')} value={this.props.website.bride_last}
                                    label={t("Last name")}/>
                    </Grid.Column>
                </Grid>

                <Subtitle>{t("Groom")}</Subtitle>
                <Grid >
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('groom_first')} value={this.props.website.groom_first}
                                    label={t("First name")}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <InputCombo onChange={this.changeHandler('groom_last')} value={this.props.website.groom_last}
                                    label={t("Last name")}/>
                    </Grid.Column>
                </Grid>

                <Checkbox checked={this.props.website.show_parents}
                          onChange={(e, {checked}) => this.changeHandler('show_parents', true)(checked)}
                          style={{marginTop: 20}} label={t("Show parent's name on website")}/>

                {this.props.website.show_parents &&
                <React.Fragment>
                    <Subtitle>{t("Bride")}</Subtitle>
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

                    <Subtitle>{t("Groom")}</Subtitle>
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

                <Button notchanged={!this.state.changed} loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}}
                        primary fluid>{t("Save")}</Button>
            </div>
        }
    }

    accordionTemplate() {

        return {
            validation: 'template',
            title: 'Choose Template',
            content: <div style={{padding: 12, paddingTop: 0, paddingBottom: 10}}>
                <Subtitle>{t("Choose Template")}<Required /> </Subtitle>
                <Link to="/choose_template">

                    {this.props.website.template === 0 ?
                        <BorderedButton text="Choose Template" icon="file text outline"/>
                        :
                        <div style={{}}>
                            <img style={{width: '100%'}} src={require(`../static/images/templates/template-${this.props.website.template}.jpg`)}
                                 alt={"Selected template"}/>
                        </div>
                    }
                </Link>

                <Subtitle>{t("Main Photo")}<Required /> </Subtitle>
                <File onUpload={r => this.changeHandler('template_main', true)(r.filename)}
                      rest={this.rest} url="website/upload?target=template_main"
                      name={this.props.website.template_main ? "Change Main Image" : t("Upload the Main Photo")}
                      icon="camera"/>
                <p style={{marginTop: 6, color: '#666'}}>{t("Photo Dimension: ") + "4:3"}</p>

                <Subtitle>{t("Foto Bawah")}</Subtitle>
                <File onUpload={r => this.changeHandler('template_bottom', true)(r.filename)}
                      rest={this.rest} url="website/upload?target=template_bottom"
                      name={this.props.website.template_main ? "Change Bottom Image" : t("Upload the Bottom Photo")}
                      icon="camera"/>
                <p style={{marginTop: 6, color: '#666'}}>{t("Photo Dimension: ") + "4:3"}</p>

                <Button notchanged={!this.state.changed}  loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}}
                        primary fluid>{t("Save")}</Button>
            </div>
        }
    }

    accordionDetails() {
        return {
            validation: 'details',
            title: t("Wedding Details"),
            content: <div>

                <div style={{padding: 12, paddingTop: 20}}>

                    <InputCombo onChange={this.changeHandler('title')} value={this.props.website.title}
                                label={t("Title")}/>

                    <DateInput style={{marginTop: 12}}
                               label={t("Date")}
                               selected={moment(this.props.website.date)}
                               onChange={date => {
                                   // console.log(date);
                                   this.changeHandler('date', true)(date.format('YYYY-MM-DD'))
                               }}/>

                    <Grid style={{marginTop: 12}}>
                        <Grid.Column width={8}>
                            <InputCombo onChange={this.changeHandler('country')} value={this.props.website.country}
                                        label={t("Country")}/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <InputCombo onChange={this.changeHandler('city')} value={this.props.website.city}
                                        label={t("City")}/>
                        </Grid.Column>
                    </Grid>

                    <div style={{marginTop: 16}}>
                        <InputLabel >{t("Instagram Hashtag")}</InputLabel>
                        <Input style={{width: '100%'}} labelPosition='left' type='text' placeholder='AnythingForLove'>
                            <Label basic>#</Label>
                            <input onChange={this.changeHandler('hashtag')} value={this.props.website.hashtag}/>
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
                                            label='Title' placeholder={t("The Proposal")}/>

                                <DateInput key={Math.random()} style={{marginTop: 16}} label={t("Date")}
                                           selected={moment(s.date)}
                                           onChange={date => {
                                               console.log(date.format('YYYY-MM-DD'));
                                               this.changeStoryField(index, 'date', true)(date.format('YYYY-MM-DD'))
                                           }}/>

                                <div style={{marginTop: 16}}>
                                    <InputLabel >{t("Description")} <Required/></InputLabel>
                                    <Form>
                                        <TextArea onChange={this.changeStoryField(index, 'description')}
                                                  value={s.description} placeholder={t("On the anniversary of when we first met, we went back to our old stomping grounds to do karaoke with friends. When \"I'd Do Anything for Love\" came on, we ran up to the front. When the music suddenly died down, I looked over and he was down on one knee. I screamed, shouted \"YES,\" and we were engaged.")}/>
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
                    <Icon name="plus circle"/> {t("Add Story")}
                </div>

                <div style={{padding: 12}}>
                    <Button notchanged={!this.state.changed}  loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}}
                            primary fluid>{t("Save")}</Button>
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
            validation: 'events',
            title: t("Events"),
            content: <div>

                <div style={{padding: 12, paddingTop: 20, paddingBottom: 20, borderBottom: '1px solid #E0E6E7'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={(e, {checked}) => this.changeHandler('show_events', true)(checked)}
                                  toggle checked={this.props.website.show_events}/>
                        <p style={{marginLeft: 16}}>{t("Show Page")}</p>
                    </div>
                </div>

                <div style={{padding: 12, paddingTop: 20}}>
                    <InputCombo onChange={this.changeHandler('events_page_title')}
                                value={this.props.website.events_page_title}
                                label={t("Page Title")}/>

                    <div style={{marginTop: 16}}>
                        <InputLabel >{t("Description")} <Required/></InputLabel>
                        <Form>
                            <TextArea onChange={this.changeHandler('events_description')}
                                      value={this.props.website.events_description}
                                      placeholder={t("Here's what to expect during our big day, looking forward to seeing you there!")}/>
                        </Form>
                    </div>
                </div>

                {this.props.website.events.map((e, index) => {
                        let no = "First Event";
                        if (index === 1) no = "Second Event";
                        else if (index > 1) no = `Event #${index + 1}`

                        const types = ["Pemberkatan Nikah", "Resepsi", "After Party", "Acara Adat", "Dll"];
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

                                    <InputLabel>{t("Event Type")}</InputLabel>
                                    <Select style={{flex: 1, display: 'flex'}}
                                            onChange={(e, {value}) => this.changeEventField(index, 'type', true)(value)}
                                            value={types.includes(e.type) ? e.type : "Dll"}
                                            options={[
                                                {value: "Pemberkatan Nikah", text: "Pemberkatan Nikah"},
                                                {value: "Resepsi", text: "Resepsi"},
                                                {value: "After Party", text: "After Party"},
                                                {value: "Acara Adat", text: "Acara Adat"},
                                                {value: "Dll", text: "Dll"},
                                            ]}/>

                                    {e.type === "Dll" || !types.includes(e.type) &&
                                    <InputCombo style={{marginTop: 16}} onChange={this.changeEventField(index, 'type')}
                                                value={e.type}
                                                label='Custom event type'/>}

                                    <InputCombo style={{marginTop: 16}} onChange={this.changeEventField(index, 'title')}
                                                value={e.title}
                                                label={t("Event Name")}/>

                                    <DateInput key={Math.random()} style={{marginTop: 16}} label={t("Date")}
                                               selected={moment(e.date)}
                                               onChange={date => {
                                                   console.log(date.format('YYYY-MM-DD'));
                                                   this.changeEventField(index, 'date', true)(date.format('YYYY-MM-DD'))
                                               }}/>

                                    <Grid style={{marginTop: 12}}>
                                        <Grid.Column width={8}>
                                            <InputLabel>{t('Start Time')} <Required/></InputLabel>
                                            <TimePicker value={e.start_time}
                                                        onChange={(e, {value}) => this.changeEventField(index, 'start_time', true)(value)}/>
                                        </Grid.Column>

                                        <Grid.Column width={8}>
                                            <InputLabel>{t('End Time')}</InputLabel>
                                            <TimePicker value={e.end_time}
                                                        onChange={(e, {value}) => this.changeEventField(index, 'end_time', true)(value)}/>
                                        </Grid.Column>
                                    </Grid>

                                    {!e.manual_address &&
                                    <div style={{marginTop: 16}}>
                                        <InputLabel >{t("Venue Name")}</InputLabel>
                                        <Autocomplete
                                            style={{width: '100%', padding: 8, borderRadius: 4}}
                                            placeholder={e.venue}
                                            onPlaceSelected={(place) => {
                                                console.log(place);
                                                this.changeEventField(index, 'venue', true)(place.formatted_address);
                                                this.changeEventField(index, 'location', true)({
                                                    lat: place.geometry.location.lat(),
                                                    lng: place.geometry.location.lng()
                                                })
                                                //this.changeEventField(index, 'venue', true)(place.formatted_address)
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
                                                label={t("Venue Name")}/>}

                                    <div style={{
                                        color: '#21899A',
                                        padding: "8px 0",
                                        fontSize: 11
                                    }}
                                         onClick={() => this.changeEventField(index, 'manual_address', true)(!e.manual_address)}>
                                        <Icon name="arrow right"/>
                                        {!e.manual_address ? "Fill in address manually" : t("Search for location")}
                                    </div>

                                    {e.manual_address &&
                                    <React.Fragment>
                                        <InputCombo optional style={{marginTop: 16}}
                                                    onChange={this.changeEventField(index, 'street')}
                                                    value={e.street}
                                                    label={t("Street Address")}/>

                                        <InputCombo optional style={{marginTop: 16}}
                                                    onChange={this.changeEventField(index, 'country')}
                                                    value={e.country}
                                                    label={t('Country')}/>
                                        <InputCombo optional style={{marginTop: 16}}
                                                    onChange={this.changeEventField(index, 'city')}
                                                    value={e.city}
                                                    label={t('City')}/>

                                        <Grid>
                                            <Grid.Column width={8}>
                                                <InputCombo optional style={{marginTop: 16}}
                                                            onChange={this.changeEventField(index, 'postal_code')}
                                                            value={e.postal_code}
                                                            label={t('Postal Code')}/>
                                            </Grid.Column>

                                            <Grid.Column width={8}>
                                                <InputCombo optional style={{marginTop: 16}}
                                                            onChange={this.changeEventField(index, 'apartment')}
                                                            value={e.apartment}
                                                            label={t("Apt/Floor")}/>
                                            </Grid.Column>
                                        </Grid>
                                    </React.Fragment>}

                                    <InputCombo optional style={{marginTop: 16}}
                                                onChange={this.changeEventField(index, 'attire')}
                                                value={e.attire}
                                                label={t("Attire")}/>

                                    <div style={{marginTop: 16}}>
                                        <InputLabel >{t("Note to Guests")}</InputLabel>
                                        <Form>
                                        <TextArea onChange={this.changeEventField(index, 'description')}
                                                  value={e.description} placeholder={t("Free valet parking at the building next door")}/>
                                        </Form>
                                    </div>


                                    {/*<div style={{
                                     padding: 12,
                                     paddingTop: 20,
                                     paddingBottom: 20
                                     }}>
                                     <Switch label={t("Make Event Public On site")}
                                     onChange={(e, {checked}) => this.changeEventField(index, 'public', true)(checked)}
                                     checked={e.public}/>

                                     <Switch label={t("Allow guests to rsvp on site")}
                                     onChange={(e, {checked}) => this.changeEventField(index, 'rsvp', true)(checked)}
                                     checked={e.rsvp}
                                     style={{marginTop: 16}}/>
                                     </div>*/}
                                </div>

                                {/*<div style={{
                                    color: '#21899A',
                                    marginTop: 12,
                                    padding: 8,
                                    paddingTop: 16,
                                    paddingLeft: 12,
                                    borderTop: '1px solid #E0E6E7',
                                }}>
                                    <p style={{marginBottom: 4}}>{t("Ask guests about meal preferences")}</p>
                                    {e.meals && e.meals.map((meal, mealIndex) =>
                                        <RemovableInput
                                            key={Math.random()}
                                            onChange={(e) => this.updateEventMeal(index, mealIndex, e.target.value)}
                                            value={meal}
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
                                </div> */}
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
                    <Button notchanged={!this.state.changed}  loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}}
                            primary fluid>{t("Save")}</Button>
                </div>
            </div>
        }
    }

    accordionPhotos() {
        return {
            validation: 'photos',
            title: t("Photos"),
            content: <div>

                <div style={{padding: 12, paddingTop: 20, paddingBottom: 20, borderBottom: '1px solid #E0E6E7'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={(e, {checked}) => this.changeHandler('show_photos', true)(checked)}
                                  toggle checked={this.props.website.show_photos}/>
                        <p style={{marginLeft: 16}}>{t("Show Page")}</p>
                    </div>
                </div>

                <div style={{padding: 12, paddingTop: 20}}>
                    <InputCombo onChange={this.changeHandler('photos_page_title')}
                                value={this.props.website.photos_page_title}
                                label={t('Page Title')}/>

                    <div style={{marginTop: 16}}>
                        <InputLabel >{t("Description")} <Required/></InputLabel>
                        <Form>
                            <TextArea onChange={this.changeHandler('photos_description')}
                                      value={this.props.website.photos_description}
                                      placeholder={t("A few snaps taken of us over the years..")}/>
                        </Form>
                    </div>
                </div>

                {this.props.website.photos.map((item, index) => {
                        return (
                            <div style={{padding: 12, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <File style={{flex: 1}} onUpload={r => this.photoUploaded(index, r.filename)}
                                      rest={this.rest} url={`website/upload?target=photos&index=${index}`}
                                      name={item ? "Change Photo" : `Photo #${index + 1}`} icon="camera"
                                />

                                <Icon onClick={() => this.removePhoto(index)} style={{paddingLeft: 10, paddingRight: 12}}
                                      name='remove'/>
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
                    <Button notchanged={!this.state.changed}  loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}}
                            primary fluid>{t("Save")}</Button>
                </div>
            </div>
        }
    }

    accordionFAQ() {
        return {
            validation: 'faqs',
            title: 'FAQs',
            content: <div>

                <div style={{padding: 12, paddingTop: 20, paddingBottom: 20, borderBottom: '1px solid #E0E6E7'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={(e, {checked}) => this.changeHandler('show_faqs', true)(checked)}
                                  toggle checked={this.props.website.show_faqs}/>
                        <p style={{marginLeft: 16}}>{t("Show Page")}</p>
                    </div>
                </div>

                <div style={{padding: 12, paddingTop: 20}}>
                    <InputCombo onChange={this.changeHandler('faqs_page_title')}
                                value={this.props.website.faqs_page_title}
                                label={t('Page Title')}/>

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
                        // let no = "First FAQ";
                        // if (index === 1) no = "Second FAQ";
                        // else if (index > 1) no = `Question #${index + 1}`
                        let no = `${t("Question")} #${index + 1}`;

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
                                                placeholder={t("Can I bring a date?")}
                                                label={t('Question')}/>

                                    <div style={{marginTop: 12}}>
                                        <InputLabel>{t("Answer")} <Required/></InputLabel>
                                        <Form>
                                        <TextArea onChange={this.changeFAQField(index, 'answer')}
                                                  value={item.answer}
                                                  placeholder={t("If your invitation says \"and Guest,\" then yes, if not, we would prefer if it was just you.")}/>
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

                <div style={{padding: 12}}>
                    <Button notchanged={!this.state.changed}  loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}}
                            primary fluid>{t("Save")}</Button>
                </div>

            </div>
        }
    }

    accordionSettings() {
        return {
            title: t("Website Settings"),
            content: <div style={{padding: 12, paddingTop: 0}}>

                <Subtitle>Website URL</Subtitle>
                {!this.accountNotValidated() &&
                <p>{this.props.website.url || "(Will be set upon save)"}</p>}

                <div style={{display: 'flex', alignItems: 'center', marginTop: 8}}>
                    <Checkbox onChange={(e, {checked}) => this.changeHandler('public', true)(checked)}
                              toggle checked={this.props.website.public}/>
                    <p style={{marginLeft: 16}}>{t("Make Publicly Available?")}</p>
                </div>

                <div style={{padding: 12}}>
                    <Button notchanged={!this.state.changed}  loading={this.state.loading} onClick={this.save} style={{marginTop: 24, marginBottom: 12}}
                            primary fluid>{t("Save")}</Button>
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
        const items = [...this.props.website.photos, ""];
        this.props.dispatch(action(items));
    }

    async removePhoto(index) {
        try {
            const r = await this.rest.post('website/remove-photo', {index});
            const action = buildActionForKey(actions.WEBSITE_RECORD, 'photos');
            let items = [...this.props.website.photos];
            items.splice(index, 1);
            this.props.dispatch(action(items));
        }
        catch (e) {

        }
    }

    photoUploaded(index, filename) {
        const action = buildActionForKey(actions.WEBSITE_RECORD, 'photos');
        const items = [...this.props.website.photos];
        items[index] = filename;
        this.props.dispatch(action(items));
        this.save();
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

function DateInput({label, selected, onChange, optional = false, style}) {
    return <div style={{...style}}>
        <InputLabel>{label} {!optional && <Required/>} </InputLabel>
        <DatePicker selected={selected}
                    onChange={onChange}
        />
    </div>
}

function RemovableInput({onChange, onRemove, value, style, placeholder = "", type = "input"}) {
    return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', ...style}}>
        <Input style={{flex: 1}} placeholder={placeholder} value={value} onChange={onChange} type={type} fluid/>
        <Icon onClick={onRemove} style={{paddingLeft: 10, paddingRight: 12}} name='remove'/>
    </div>
}

export function Required() {
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
            index: props.startingIndex
        }

        console.log(props.startingIndex)
    }

    render() {
        const selectedStyle = {
            border: 'solid',
            borderWidth: 1,
            borderColor: '#E0E6E7',
            borderRadius: 4,
            overflow: 'hidden'
        };

        return this.props.items.map(({title, content, validation}, index) => {

            const current = index === this.state.index;
            const valid = this.props.isValid(validation);
            return (
                <div key={index} style={{marginBottom: 8, userSelect: 'none', ...(current ? selectedStyle : {})}}>
                    <div onClick={() => this.onHeaderClicked(index)} style={{padding: 12, backgroundColor: '#FFF'}}>
                        <p style={{fontSize: 18, margin: 0, lineHeight: '40px', float: 'left'}}>
                            {valid && <Icon style={{color: '#63E09C'}} name='check circle'/>}
                            {title}
                        </p>
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
            loading: false,
            show_success: false,
            show_failure: false
        };
        this.rest = props.rest;
    }

    handleChange(files) {
        console.log('file selected: ', files);
        this.setState({
            filename: files[0]['name'],
            loading: true
        });
        this.rest.upload(this.props.url, files[0]).then(r => {
            console.log(r);
            this.props.onUpload(r);
            this.setState({
                loading: false,
                show_failure: false,
                show_success: true
            })

        }).catch(e => {
            console.log("Error uploading: ", e);
            this.setState({
                loading: false,
                show_failure: true,
                show_success: false
            })
        })
    }

    render() {
        console.log('File: ', this.file);
        return (
            <React.Fragment>
                <div style={{
                    padding: 15,
                    position: 'relative',
                    backgroundColor: '#fafafb',
                    border: '1px solid',
                    borderRadius: 5,
                    borderColor: '#f2711c',
                    ...this.props.style
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
                {this.state.show_success && <p style={{ marginTop: 10, color: 'rgb(18, 167, 65)'}}>Photo Upload Sukses</p>}
                {this.state.show_failure && <p style={{ marginTop: 10, color: '#ff7542'}}>Photo Upload Gagal, Coba Lagi</p>}
            </React.Fragment>
        )
    }


}

export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(Website)
