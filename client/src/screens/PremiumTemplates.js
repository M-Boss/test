/**
 * Created by guy on 8/19/18.
 */
import React, {Component} from 'react'
import {
    Menu,
    Segment,
    Button,
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
    List,
    Message,
    Header as SemanticHeader
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {H1, H2} from "../components/Headers";
import Footer from "./Footer";
import Header from "./Header";
import {connect} from 'react-redux'
import BorderedButton from "../components/BorderedButton";
import Autocomplete from 'react-google-autocomplete';
import rest  from '../services/external/rest';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Required from './Website'
import {t} from '../translations'
import {DateInput} from './Website'
import moment from 'moment'

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            name: "",
            date:  moment().format('YYYY-MM-DD')
        }
    }

    changeHandler(key, direct = false) {
        return (e) => {
            const val = direct ? e : e.target.value;
            this.setState({
                [key]: val
            })
        }
    }

    async send(){
        if(!this.state.name || !this.state.date){
            return alert('Please fill in the necessary fields');
        }

        this.setState({loading : true});
        try {
            const r = await rest.post('payment_ticket', this.state);
            this.setState({success: true})
        }
        catch (e){
            alert("Please try again in a few minutes")
            console.log(e)
        }
        finally{
            this.setState({loading: false})
        }
    }

    render() {
        const {date} = this.state;

        return (
            <React.Fragment>
                <Header />
                <div style={{padding: 16}}>
                    <SemanticHeader dividing style={{marginTop: 12}}>Dapatkan semua template hanya 49rb!</SemanticHeader>
                    <strong><p>Caranya</p></strong>
                    <ol>
                        <li>Transfer kepada:</li>
                        <ul>
                            <li>Nama Bank: Bank BCA</li>
                            <li>Nama Pemilik: Sharon Halim</li>
                            <li>Nomer Rekening: 2370222722</li>
                        </ul>
                        <li>Isi form dibawah ini untuk konfirmasi pembayaranmu. Anda akan mendapatkan semua templat dalam waktu kurang dari 24 Jam.</li>
                    </ol>

                    {!this.state.success && <Form style={{ paddingBottom: 24}}>
                        <Form.Input fluid onChange={this.changeHandler('name')} value={this.state.name}  label={t("Name")} placeholder='' />
                        <DateInput key={Math.random()} style={{marginTop: 16}} label={t("Date")}
                                   selected={date ? moment(date) : moment()}
                                   optional
                                   onChange={date => {
                                       this.changeHandler('date', true)(date ? date.format('YYYY-MM-DD') : "2019-01-01")
                                   }}/>
                        <br/>
                        <br/>
                        <Form.Button primary loading={this.state.loading}
                                     onClick={this.send.bind(this)} fluid>Send</Form.Button>
                    </Form>}

                    {this.state.success &&   <Message positive>
                        <p>Formulir berhasil dikirim, Anda akan mendapat
                            semua templat di dalam waktu 24 jam.
                            Untuk pertanyaan lebih lanjut, silakan <a href="/contact"> hubungi kami.</a></p>
                    </Message>}
                </div>

                <Footer/>
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
