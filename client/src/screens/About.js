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

class Website extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div style={{padding: 16}}>
                    <SemanticHeader dividing style={{marginTop: 12}}>Tentang Kami</SemanticHeader>
                    <p>Tujuan NikahKu adalah menjadi pemandu all-in-one untuk perencanaan nikahanmu, dibuat untuk pasangan yang memilih untuk memakai perencana pernikahan profesional dan juga untuk pasangan yang melakukan semuanya sendiri, kami siap membantu.</p>
                    <p>Seiring berjalannya era digital, surat berubah jadi email, yang berubah lagi jadi direct messaging, banyak pasangan yang menganggap website online adalah pengganti yang bagus (dan bahkan suplemen yang lebih baik) untuk kartu undangan tradisional. Website nikahan sudah menjadi hal esensial yang mutlak untuk pasangan yang bertunangan di seluruh dunia. Inilah alasan kami menyediakan layanan tanpa biaya ini untuk pasangan-pasangan Indonesia.</p>
                    <p>Kami memulai dengan layanan websit pernikahan gratis, tapi jangan khawatir, kami tahu hari pernikahan jauh lebih rumit dan kami terus mengembangkan fitur baru bagi para klien. Kami senang banget dengan manajer daftar tamu, daftar periksa pernikahan, dan alat bantu mengatur tempat duduk.</p>
                    <p>Silakan ajukan pertanyaan, masalah, atau umpan balikmu <a href="/contact">di sini</a>.</p>
                </div>

                <Footer/>
            </React.Fragment>
        )
    }
}

function Service({label, icon, link}) {
    return (
        <div style={{flex: 1, textAlign: 'center'}}>
            {link ? <Link to={link}>
                <img style={{height: 80, width: 80}} src={icon}/>
                <p style={{textAlign: 'center'}}>{label}</p>
            </Link> :
                <React.Fragment>
                    <img style={{height: 80, width: 80}} src={icon}/>
                    <p style={{marginBottom: 2, textAlign: 'center'}}>{label}</p>
                    {!link && <p style={{fontSize: 11}}>(Coming soon!)</p>}
                </React.Fragment>}
        </div>
    )
}

function Section({label, done, k}) {
    return (
        <Link to={"/create#" + k}>
            <p style={{fontSize: 18, marginTop: 30, marginLeft: 10}}>
                {done &&
                <Icon style={{fontSize: 20, paddingRight: 10, color: '#63E09C'}} name='check circle'/>}

                {!done &&
                <Icon style={{fontSize: 18, paddingRight: 10, color: '#ddd'}} name='circle'/>}

                {label}
                <Icon style={{fontSize: 12, paddingLeft: 10, color: '#888'}} name='pencil'/>
            </p>
        </Link>
    )
}
export default connect(state => {
    return {
        website: state.website,
        user: state.user
    }
})(Website)
