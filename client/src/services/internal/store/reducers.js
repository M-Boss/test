import {DefaultReducer} from './DefaultReducer';
import * as constants from './actionConstants'
import { combineReducers } from 'redux';


export const makeRootReducer = () => combineReducers({
    // app,
    website: DefaultReducer(constants.WEBSITE_RECORD, {
        bride_first: "",
        bride_last: "",
        groom_first: "",
        groom_last: "",
        bride_father: "",
        bride_mother: "",
        groom_father: "",
        groom_mother: "",
        show_parents: false,
        template: 0,
        title: "",
        date: "",
        country: "",
        city: "",
        hash: "",
        stories: [],

        show_events: [],
        events_page_title: "",
        events_description: "",

    }),
    // flightFilter: DefaultReducer(types.FLIGHT_FILTER_RECORD, {
    //     types: [
    //         "charter",
    //         "system"
    //     ],
    //     type: 'oneway', //set initiated type for flight search type
    // }),
});

export default makeRootReducer;
