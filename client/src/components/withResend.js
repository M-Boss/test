/**
 * Created by guy on 10/14/18.
 */
import React, {Component} from 'react';
import ReactGA from 'react-ga';
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
import rest  from '../services/external/rest';

export default function withResend(WrappedComponent, options = {}) {
    const trackPage = (page) => {
        ReactGA.set({
            page,
            ...options
        });
        ReactGA.pageview(page);
    };

    const HOC = class extends Component {
        componentDidMount() {

        }

        accountNotValidated() {
            return this.props.user && !this.props.user.active;
        }

        async resend(){
            try {
                const r = await rest.post('user/resend');
                alert("Verification email resent!")
            }
            catch (e){
                alert("Please try again after a while")
            }

        }

        render() {
            if (this.accountNotValidated()) {
                return (
                    <div style={{paddingTop: 80}}>
                        <div style={{position: 'fixed', top: 4, zIndex: 200, left: 4, right: 4}}>
                            <Message negative>
                                <Message.Header style={{fontSize: 12}}>Tolong verifikasi alamat email Anda untuk melihat situs nikahan
                                    Anda. <a onClick={() => this.resend()} className="pointer">Klik di sini</a> untuk mengirim ulang verifikasi email.</Message.Header>
                                {/*<a>Resend validation email</a>*/}
                            </Message>
                        </div>
                        <WrappedComponent {...this.props} />
                    </div>
                )
            }

            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
}
