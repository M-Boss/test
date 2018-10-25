/**
 * Created by guy on 8/19/18.
 */
import React, {Component, Fragment} from 'react'
import {Segment, Button, Form, Grid, Input, Image, Icon} from 'semantic-ui-react'
import Slider from "react-slick";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static contextTypes = {
        router: () => true,
    };

    render() {
        const website = this.props.website;
        const {theme} = this.props;
        return (<div className={theme.menuClassName || ""} style={{
            marginTop: -32,
            paddingTop: 32,
            textAlign: 'center',
            backgroundColor: this.props.theme.menuBackground || '#FFF',
            height: 2000
        }}>
            <div style={{position: 'fixed', width: '100%'}}>
                <div style={{textAlign: 'right', marginTop: 10}}>
                    <Icon onClick={this.context.router.history.goBack}
                          style={{width: 32, height: 32, fontSize: 22}}
                          name='close'/>
                </div>
                <MenuItem to={"/wedding/" + this.props.websiteId}>Home</MenuItem>
                {website.show_events && <MenuItem to={"/wedding/" + this.props.websiteId + "/events"}>{website.events_page_title || 'Events'}</MenuItem>}
                {website.show_photos && <MenuItem to={"/wedding/" + this.props.websiteId + "/photos"}>{website.photos_page_title || 'Photos'}</MenuItem>}
                {website.show_faqs && <MenuItem to={"/wedding/" + this.props.websiteId + "/faqs"}>{website.faqs_page_title || 'FAQs'}</MenuItem>}
            </div>
        </div>);


        function MenuItem({children, to}) {
            return (<Link to={to}><p style={{color: theme.menuItem || '#6c86a1', marginTop: 28, fontSize: theme.menuFontSize || 18, fontWeight: 'bold'}}>{children}</p>
            </Link>)
        }
    }
}



export default connect(state => {
    return {
        user: state.user
    }
})(Menu);